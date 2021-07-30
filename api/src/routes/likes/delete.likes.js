const server = require("express").Router();
const {deleteLike,deleteAllLike} = require("../../controllers/likes/likes.controller")

server.delete("/:likeId", (req, res, next) => {
    let {likeId} = req.params;
    return deleteLike(likeId).then((likeId) => {
        return res.status(201).json(likeId);
      }).catch((error) => {
        return res.status(400).json(error);
      });
  });

module.exports = server;