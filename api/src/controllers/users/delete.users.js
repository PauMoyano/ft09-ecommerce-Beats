const { User } = require("../../db");

module.exports = {
    deleteUser: async (id) => {
        
        return  await User.destroy({
            where:{
                id: id
            } 
        }).then(user =>{
            return 'Succesfully deleted User';
        });
    },
};