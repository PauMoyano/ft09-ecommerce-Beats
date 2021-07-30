const server = require("express").Router();

var passport = require('passport')
require("../middlewares/github.middleware")
require("../middlewares/google.middleware")

const {CLIENT_URL} = process.env

module.exports = server;


//--------------------------------ROUTE-GITHUB--------------------------------------
server.get('/auth/github',
  passport.authenticate('github',{ session: false, scope: ['profile'] }));

server.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: `${CLIENT_URL}/login` }),
  function (req, res) {   
          console.log(req.user)
          res.redirect(`${CLIENT_URL}/login/github/${req.user.username}@gmail.com/12345678`);
  });


//--------------------------------ROUTE-GOOGLE---------------------------------------
server.get('/auth/google',
  passport.authenticate('google',{ session: false, scope: ['profile'] }));

server.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/login` }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect(`${CLIENT_URL}/login/github/${req.user.name.familyName}@gmail.com/12345678`);
  });



//---------------------------------ROUTE-GLOBAL--------------------------------------
server.get('/', (req, res) => {
    res.send("HOME BACKEND");
});  

server.get('/getuser', (req, res) => {
    res.send(req.user);
    res.status(200).json("CONSOLOGUEADO")
});  

server.get('/logout', (req, res) => {
    req.logOut();
    res.status(200).clearCookie('connect.sid', {
      path: '/'
    });
    req.session.destroy(function (err) {
      res.redirect(CLIENT_URL);
    });
});