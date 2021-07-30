const server = require("express").Router();
const {editLike} = require("../../controllers/likes/likes.controller")

server.put("/:likeId", (req, res, next) => {
    let { likeId } = req.params;
    let { like, idUser } = req.body;
    // console.log("ESTE ES EL LIKE", like);
    // console.log("ESTE ES EL ID USER", idUser);
    // console.log("ESTE ES EL ID LIKE ", likeId)
    return editLike(likeId, like, idUser).then((like) => {
        return res.status(200).json(like);
      }).catch((error) => {
        return res.status(400).json(error);
      });
  });

module.exports = server;