const { Oferts, Product } = require("../../db");

module.exports = {

 addOfertToProduct: async (idProduct, ofert) => { 

  return await Oferts.create(ofert).then(async(ofert) => {
    return await Product.findByPk(idProduct).then(async(oneProduct) => {
      return await Oferts.findByPk(ofert.id).then((newOfert) => {
        oneProduct.addOfert(newOfert);
        return newOfert;
      });
    });
  });  
},
  createOfert: async (ofert) => {
    return await Oferts.create(ofert).then((ofert)=> ofert);
  },
  getOferts: async () => {
    return await Oferts.findAll({
      include: [
        {
          model: Product,
          as:"products"
        },
        
      ],
    }).then((oferts) => oferts);
  },
  getOfertById: async (ofertId) => {
    return await Oferts.findByPk(ofertId).then((ofert) => ofert);
  },
  editOfert: async (ofertId, ofert) => {
    return await Oferts.update(ofert, {
      where: {
        id: ofertId,
      },
    }).then((ofert) => ofert);
  },
  deleteOfert: async (ofertId) => {
    return await Oferts.destroy({
      where: {
        id: ofertId,
      },
    }).then((ofert) => {
      return ofert === 1 ? "Ofert delete succefull" : "ofert dont´s exist"
    });
  },
};
