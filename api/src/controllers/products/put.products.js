const { Product } = require("../../db");

module.exports = {
  editProduct: async (product, id) => {
    return await Product.update(product, {
      where: { id: parseInt(id) },
    }).then((product) => product);
  },
  
};
