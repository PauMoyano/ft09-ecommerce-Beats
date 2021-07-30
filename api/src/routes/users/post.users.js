const server = require("express").Router();
const postControler = require("../../controllers/users/post.users");
const jwt = require('jsonwebtoken')
const { User } = require("../../db");
var uniqid = require('uniqid');
var passport = require('passport')
require("../../middlewares/passport.middleware").passport
const {getOrdersByUserID} = require("../../controllers/order/order.controller")

module.exports = server;
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

server.post("/",
  async (req, res, next) => {
    const { name, password, email } = req.body;
    var user;
    if(name && password && email){
        user = {
            id: uniqid.time(),
            name:name.toString(),
            password_virtual:password.toString(),
            email:email.toString()
        };
    }
    postControler
      .addUser(user)
      .then((user) => {
        if(user === 'user exist'){
          res.status(200).json({
            msg: 'user already exist'
          });
        }
      })
      .catch((error) => {
        if(error.message === 'Validation error: invalid password'){
          res.status(200).json({
            msg: 'invalid password'
          })
        }else if(error.message === 'Validation error: invalid email'){
            res.status(200).json({
              msg: 'email aready exist'
            })
        }else{
          console.log(error)
          res.status(400).json(error.message);
        }
      }); 

  });
function generateToken(user){
    return jwt.sign({id: user.id, rol: user.rol}, ACCESS_TOKEN_SECRET,{expiresIn: "40m"});
}

server.post('/token', function(req, res, next){
  const {useremail, refreshToken} = req.body;
  console.log(useremail, refreshToken)
  User.findOne({
    where:{
      email:useremail
    }
  }).then(user =>{
    const newRefreshToken = jwt.sign({id: user.id,rol: "refreshToken"}, REFRESH_TOKEN_SECRET);

    User.update({
      refresToken:newRefreshToken
    },{
      where:{
        id: user.dataValues.id
      }
    }).catch((err)=>{
      console.log(error)
    })
 
    const newToken = generateToken({id: user.id,rol: user.rol})
  
    res.status(201).json({newToken, newRefreshToken})
  }).catch((err)=>{
    res.status(400).json("NO USER")
  })


})
server.post(
  "/login",
  function (req, res, next) {
    passport.authenticate(
        "local",
        { session: false },
        function (err, user, info) {
        if (err) return next(err);
        if (!user) return next(info);
          req.logIn(user, { session: false }, async function (err) {
            if (err) return next(err);
            const token = generateToken(user)
            const refreshToken = jwt.sign({id: user.id,rol: "refreshToken"}, REFRESH_TOKEN_SECRET);
            User.update({
              refresToken:refreshToken
            },{
              where:{
                id: user.dataValues.id
              }
            }).catch((err)=>{
              console.log(error)
            })
            const dbCart = await getOrdersByUserID(user.id,"cart")
            const dataUser = {
              id: user.id,
              orderId: dbCart[0].dataValues.id,
              email: user.email,
              name: user.name,
              rol: user.rol,
            };
            const data = { msg: "Login successful", user: dataUser, token, refreshToken };
            return res.status(200).json(data);
          });
        }
      )(req, res, next);
    },
    function (err, req, res, next) {
      if (err) {
        res.status(200).json(err);
      }
    }
  );

  server.post(
    "/login/github",
    function (req, res, next) {
      passport.authenticate(
          "local",
          { session: false },
          function (err, user, info) {
          if (err) return next(err);
          if (!user) return next(info);
            req.logIn(user, { session: false }, function (err) {
              if (err) return next(err);
              const token = generateToken({id: user.id, rol: user.rol})
              const refreshToken = jwt.sign({id: user.id,rol: "refreshToken"}, REFRESH_TOKEN_SECRET);
              const dataUser = {
                id: user.id,
                email: user.email,
                name: user.name,
                rol: user.rol,
              };
              const data = { msg: "Login successful", user: dataUser, token, refreshToken };
              User.update({
                refresToken:refreshToken
              },{
                where:{
                  id: user.dataValues.id
                }
              }).catch((err)=>{
                console.log(error)
              })
              return res.status(200).json(data);
            });
          }
        )(req, res, next);
      },
      function (err, req, res, next) {
        if (err) {
          res.status(200).json(err);
        }
      }
    );



