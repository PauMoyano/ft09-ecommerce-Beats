const {ACCESS_TOKEN_SECRET} = process.env
const nJwt = require('njwt');

var protectorAdmin = function (req, res, next) {
    const token = req.headers.token;
    if(token){
        nJwt.verify(token,ACCESS_TOKEN_SECRET,function(err,verifiedJwt){
            if(err){
                return res.status(400).json("TOKEN EXPIRED");
            }else{  
              if(verifiedJwt.body.rol !== "admin"){
                  return res.status(400).json("NO AUTORIZATION ONLY ADMINS");
              }else{
                   next();
              }       
            }
          });
    }else{
        return res.status(400).json("NO TOKEN");
    };
  };

  var protectorUser = function (req, res, next) {
    console.log('LOGGED', req.headers.token);
    const token = req.headers.token;

    if(token){
        nJwt.verify(token,ACCESS_TOKEN_SECRET,function(err,verifiedJwt){

            if(err){
                console.log("error",err); 
                return res.status(400).json("TOKEN EXPIRED");
                
            }else{  
              
              if(verifiedJwt.body.rol === "client" || verifiedJwt.body.rol === "admin"  ){
                return  next();
            }else{
              return res.status(400).json("NO AUTORIZATION ONLY ADMINS");
              }       
            }
          });
    }else{
        return res.status(400).json("NO TOKEN");
    }
  };

module.exports = {protectorAdmin, protectorUser };