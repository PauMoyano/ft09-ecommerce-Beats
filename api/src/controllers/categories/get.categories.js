const { Categories } = require("../../db");

module.exports = {
  getCategories: async ()=>{
    return await Categories.findAll();
  },
};
