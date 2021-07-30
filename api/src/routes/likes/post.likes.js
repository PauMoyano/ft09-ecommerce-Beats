const server = require("express").Router();
const {newCreateLike} = require("../../controllers/likes/likes.controller")

server.post("/:idProduct", (req, res, next) => {
    const {like, author, idUser} = req.body;
    const {idProduct} = req.params;
    return newCreateLike(idProduct, like, author, idUser).then((likeAdded) => {
        return res.status(201).json(likeAdded);
      }).catch((error) => {
        return res.status(400).json(error);
      });
  });

module.exports = server;