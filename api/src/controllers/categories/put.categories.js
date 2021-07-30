const { Categories } = require("../../db");

module.exports = {
    editCategory: async (category, id) => {
        return await Categories.update(category, {
            where: { id: parseInt(id) },
        }).then(() => {
           return Categories.findByPk(id).then((category)=>{
                return category.dataValues;
            });
        });
    },
}