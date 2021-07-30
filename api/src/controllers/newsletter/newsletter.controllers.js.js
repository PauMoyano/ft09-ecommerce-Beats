const { Newsletter }  = require("../../db");

module.exports = {
    addEmail: async (email) => {  
      const existingEmail = await Newsletter.findOne({
          where: {
            email: email
          }
        })
        if(!existingEmail){
          let newEmail = {
            email: email
        }
        return await Newsletter.create(newEmail).then((email) => email)
      }
      return 'You are already suscribed'
    },
    getAllEmails: async () => {
        return await Newsletter.findAll().then((emails) => emails);
      },
    deleteEmail: async (email) => {
        return await Newsletter.destroy({
          where: {
            email: email,
          },
          }).then((email) => email);
      }
}