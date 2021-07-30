const { Categories } = require("../../db");

module.exports = {
    deleteCategory: async (id) => {
        return await Categories.destroy({
            where: {
              id: id,
            },
          }).then(category =>{
            return category === 1 ? "category delete succesfully" : "category dons´t exist";
        }).catch((err)=>{
            return err
        });
    },
};