const server = require('express').Router();
const  { deleteProductById } = require("../../controllers/products/delete.products")
const {protectorAdmin} = require("../../middlewares/protector.middleware");

 server.delete('/:id', (req, res) => {
    let { id } = req.params;
    return deleteProductById(id).then(productDelete =>{
      return res.status(200).json(productDelete);
    }).catch((error) => {
      res.status(400).json(error);
    });   
  });

  module.exports = server;
