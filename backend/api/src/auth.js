var expressSession = require('express-session');
let config = require('./config').get();
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
//let jwt = require('jsonwebtoken');

exports.configure = configure;

function configure(app) {
  defineAuthStrategy(app);
  defineSessionHandlers();
  configureRoutes(app);
}

function defineAuthStrategy(app) {
  app.use(expressSession({secret: config.auth.words.secret}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new FacebookStrategy({
      clientID: 128559457697935,
      clientSecret: config.auth.facebook.secret,
      callbackURL: "/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {

      console.log(profile);
      done(null, profile);
    }
  ));
}

function defineSessionHandlers() {

  passport.serializeUser(function (user, done) {
    done(null, {
      userName: user.displayName,
      userId: user.id
    });
  });

  passport.deserializeUser(function (userDataIdentifiedBySession, done) {
    done(null, userDataIdentifiedBySession);  // will pass to middleware attached to req.user
  });
}

function configureRoutes(app) {
  app.get('/auth/facebook', passport.authenticate('facebook'));

  /**
   * TODO:
   * - switch off passport session and store our own token in the client (preferably with "jsonwebtoken"):
   * -- avoids user drop of during backend restart:
   * --- since passports only stores session reference in cookie and user data in memory
   */
  app.get('/auth/facebook/callback',
    function (req, res, next) {

      let appUrl = config.app.protocol + config.app.host + ':' + config.app.port;

      return passport.authenticate('facebook',
        {
          successRedirect: appUrl,
          failureRedirect: appUrl + '/login'
        }
      )(req, res, next)
    });
}

