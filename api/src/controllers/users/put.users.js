const { User } = require("../../db");
const bcrypt = require('bcrypt');

module.exports = {
    editUser: async (user, id) => {
        try {
            const existingUser = await User.findOne({
                where:{
                id: id
                } 
            });
            existingUser.name = user.name
            existingUser.email = user.email
            await existingUser.save()

            return user;
        }
        catch (err) {
            res.status(400).json(err);
          };
    },
    editUserProfile: async (user) => {
        try {
            return await User.update(user,{
                where:{
                id: user.id
                } 
            }).then((user)=>{
                return user;
            })
        }
        catch (err) {
            res.status(400).json(err);
          };
    },
    resetPass: async (code, pass) => {
        try {
            const existingUser = await User.findOne({
                where:{
                resetCode: code
                } 
            });
            console.log(existingUser)
            existingUser.password_virtual = pass;
            if (existingUser.password_virtual) {
                const encryptPassword = await bcrypt.hash(existingUser.password_virtual, 10);
                existingUser.password = encryptPassword;
              }
            existingUser.save()
            let result = await bcrypt.compare(pass, existingUser.password, (res, err)=>{
                console.log(res)
                console.log(err)
            });
            console.log(result)
            console.log('Password Reset Succesfull')
        } catch (err) {
                console.log(err);
              };
    }
}