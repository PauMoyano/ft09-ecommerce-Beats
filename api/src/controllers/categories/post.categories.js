const { Categories } = require("../../db");
module.exports = {
  addCatategory: async (category) => {
      let { name, description } = category;
      return await Categories.create({
        name,
        description,
      }).then(category =>{
        return category;
      }).catch(error =>{
        return error
      })      
    },
}; 