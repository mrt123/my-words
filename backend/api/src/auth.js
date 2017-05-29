let config = require('./config').get();
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let jwt = require('jsonwebtoken');
let cookieParser = require('cookie-parser');
let responseObj = require('./responseObject');

exports.configure = configure;
exports.authorise = authorise;

function configure(app) {
  app.use(cookieParser());
  defineAuthStrategy(app);
  configureRoutes(app);
}

function defineAuthStrategy(app) {
  app.use(passport.initialize());

  passport.use(new FacebookStrategy({
      clientID: 128559457697935,
      clientSecret: config.auth.facebook.secret,
      callbackURL: "/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  ));
}

function configureRoutes(app) {
  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/logout', function(req, res) {
    let appUrl = config.app.protocol + config.app.host + ':' + config.app.port;
    res.cookie('words-token', 'undefined', { expires: new Date() });
    req.logout();
    res.redirect(appUrl + '/login');
  });

  /**
   * TODO:
   * - implement token expiration
   */

  app.get('/auth/facebook/callback', function (req, res, next) {

    let appUrl = config.app.protocol + config.app.host + ':' + config.app.port;

    return passport.authenticate('facebook', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect(appUrl + '/login');
      }
      else {
        let wordsToken = jwt.sign({
          user: {
            publicInfo: {
              id: user.id,
              name: user.displayName
            }
          }
        }, config.auth.words.secret);
        res.cookie('words-token', wordsToken, { httpOnly: false });
        return res.redirect(appUrl);
      }
    })(req, res, next);
  });
}

function authorise(req, res, next) {
  if (req.cookies['words-token']) {
    let decodedToken;
    try {
      decodedToken = jwt.verify(req.cookies['words-token'], config.auth.words.secret)
      req.user = decodedToken.user.publicInfo;
    }
    catch (e) {
      req.user = undefined;
    }
  }
  next();
}

