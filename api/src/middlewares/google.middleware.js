const server = require('express').Router();
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require("../db");

const {GOOGLE_ID,GOOGLE_SECRET} = process.env;

//------------------------GOOGLE-------------------------------

passport.use(new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) { 
    var newUser = {
      id: profile.id,
      name: profile.displayName || "anonymus",
      email: profile.name.familyName +"@gmail.com" || "anonymus@gmail.com",
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