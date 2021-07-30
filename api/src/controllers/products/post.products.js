const { Product, Categories } = require("../../db");

module.exports = {

  createProduct: async (product) => {
    return await Product.create(product).then(product =>  product );  
  },

  addCategoryToProduct: async (idProducto, idCategoria) => {
    console.log("p---->",idProducto)
    return await Product.findByPk(idProducto).then( async (oneProduct) => {
      console.log("p---->",oneProduct)
      return await Categories.findByPk(idCategoria)
        .then((newcategory) => {
          console.log("c---->",newcategory)
          oneProduct.addCategory(newcategory);
          return newcategory;
        });
     });
 },
 
};
