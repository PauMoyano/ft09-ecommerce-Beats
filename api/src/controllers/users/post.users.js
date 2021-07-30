const { User } = require("../../db");
const bcrypt = require('bcrypt');

module.exports = {

  addUser: async (user) => {

    const Exist = await User.findOne({
        where:{
          email:user.email
        }
    });

    if(Exist){
      return new Promise((res,rej)=>{
            res('user exist')
      })
    }

    return await User.create(user).then(user => user); 
     
  },

  signIn: (email,password) =>{
    return User.findOne({ where: { email: email } }).then(async (user) => {
      if (user) {
        let result = await bcrypt.compare(password, user.password);
        if (result) {
          console.log('esto me trae el result',result)
          return { success: result, user };
        }
      }
    });
  }


}