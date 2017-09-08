const { config } = require('./config');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let jwt = require('jsonwebtoken');
let cookieParser = require('cookie-parser');
let responseObj = require('./responseObject');

exports.configure = configure;
exports.authorise = authorise;

const API_TOKEN_NAME = 'words-api-token';

function configure(app) {
  app.use(cookieParser());
  defineAuthStrategy(app);
  configureRoutes(app);
}

function defineAuthStrategy(app) {
  app.use(passport.initialize());

  passport.use(new FacebookStrategy({
      clientID: config.auth.facebook.appId,
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
    res.cookie(API_TOKEN_NAME, 'undefined', { expires: new Date() });
    req.logout();
    res.redirect(config.ui.host + '/login');
  });

  /**
   * TODO:
   * - implement token expiration
   */

  app.get('/auth/facebook/callback', function (req, res, next) {

    return passport.authenticate('facebook', function (err, user, info) {
      if (err) {
        console.log('passport facebook auth failed!');
        throw(err);
        return next(err);
      }
      if (!user) {
        console.log('no user received from facebook!');
        return res.redirect(config.ui.host + '/login');
      }
      else {
        console.log(`passport facebook auth success. user.displayName: ${user.displayName}`);
        let wordsToken = jwt.sign({
          user: {
            publicInfo: {
              id: user.id,
              name: user.displayName
            }
          }
        }, config.auth.words.secret);
        res.cookie(API_TOKEN_NAME, wordsToken, { httpOnly: false });
        return res.redirect(config.ui.host + '/setLogged');
      }
    })(req, res, next);
  });
}

function authorise(req, res, next) {
  const apiAuthCookie = req.cookies[API_TOKEN_NAME];
  if (apiAuthCookie) {
    let decodedToken;
    try {
      decodedToken = jwt.verify(apiAuthCookie, config.auth.words.secret);
      req.user = decodedToken.user.publicInfo;
    }
    catch (e) {
      req.user = undefined;
    }
  }
  next();
}

