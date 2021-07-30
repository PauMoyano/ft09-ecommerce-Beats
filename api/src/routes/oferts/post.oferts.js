const server = require("express").Router();
const {createOfert, addOfertToProduct} = require("../../controllers/oferts/oferts.controller");
//const {protectorUser} = require("../../middlewares/protector.middleware");


server.post("/:idProduct", (req, res, next) => {

  const {name, ofertStatus, discount} = req.body;
  let ofert = {
    name,
    ofertStatus,
    discount
  }
  const {idProduct} = req.params
  console.log("Id Product",idProduct )
  console.log("ofert",ofert)
  return addOfertToProduct(idProduct, ofert).then((ofert) => {
      return res.status(201).json(ofert);
    }).catch((error) => {
      return res.status(400).json(error.message);
    });
});

module.exports = server;
