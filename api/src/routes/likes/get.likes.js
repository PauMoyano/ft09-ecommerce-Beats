const server = require("express").Router();
const {getLikes, getLikeById,getLikesByUserId} = require("../../controllers/likes/likes.controller");

server.get("/", (req, res, next) => {
    return getLikes().then((likes) => {
        return res.status(200).json(likes);
      })
      .catch((error) => {
        res.status(400).json(error.message);
      });
  });
  server.get("/:likeId", (req, res, next) => {
    let { likeId } = req.params;
    return getLikeById(likeId).then((like) => {
        return res.status(201).json(like);
      }).catch((error) => {
        return res.status(400).json(error);
      });
  });
  server.get("/user/:userId", (req, res, next) => {
    let { userId } = req.params;
    return getLikesByUserId(userId).then((like) => {
        return res.status(201).json(like);
      }).catch((error) => {
        return res.status(400).json(error);
      });
  });

  module.exports = server;