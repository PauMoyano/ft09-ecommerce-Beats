const { User } = require("../../db");

module.exports = {

    editUserRole: async (id, rol) => {
        return await User.update({rol:rol}, {
            where: { id: id },
        }).then((user) => {
            console.log(user)
           return user
        }).catch(error =>{
            console.log(error.message)
            return error.message
        });
    },
    
}   