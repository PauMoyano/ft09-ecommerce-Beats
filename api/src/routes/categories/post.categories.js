const server = require("express").Router();
const {addCatategory} = require("../../controllers/categories/post.categories");
const {protectorAdmin} = require("../../middlewares/protector.middleware");

server.post("/", (req, res, next) => {
  const attributes = req.body;
     return addCatategory(attributes).then((category) => {
      return res.status(201).json(category);
    }).catch((err =>{
      return res.status(400).json(err);
    }))

});
module.exports = server;