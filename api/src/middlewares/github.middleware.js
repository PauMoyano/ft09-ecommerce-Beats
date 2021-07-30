const server = require('express').Router();
const passport = require("passport");
var GitHubStrategy = require('passport-github').Strategy;
const { User } = require("../db");

require('../middlewares/cors.middleware')

const {GITHUB_ID,GITHUB_SECRET,SERVER_URL} = process.env;

//------------------------GITHUB-------------------------------

passport.use(new GitHubStrategy({
    clientID: GITHUB_ID,
    clientSecret: GITHUB_SECRET,
    callbackURL: `${SERVER_URL}/auth/github/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    var newUser = {
      id : profile.id,
      githubId: profile.id,
      name: profile.displayName || "anon",
      email: profile.username +"@gmail.com",
      password_virtual: "12345678"
    }
    User.findOrCreate({where: {id: newUser.id}, defaults: newUser})
    .spread(function(user, created) {
    console.log(user.get({
      plain: true
    }))
    return cb(null,profile)
  })
}
));

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
module.exports = { passport, server };