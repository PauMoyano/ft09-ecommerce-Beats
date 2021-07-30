const { User } = require("../../db");

module.exports = {
    addCode: async (code, email) => {
        try {
            const existingUser = await User.findOne({
                where:{
                email: email 
                } 
            });
            existingUser.resetCode = code
            existingUser.save()
        } catch (err) {
                console.log(err)
              };
    },
    getUserByEmail: async (email) => {
        try {
            return await User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                console.log('USEEEERRRRR', user)
                return user;
            })
        } catch (err) {
            console.log(err)
          };
    }
}