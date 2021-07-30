const server = require("express").Router();
const {editComment} = require("../../controllers/comments/comments.controller");
const {protectorUser} = require("../../middlewares/protector.middleware");

server.put("/:commentId", protectorUser, (req, res, next) => {
  let { commentId } = req.params;
  let comment = req.body;
  return editComment(commentId, comment).then((comment) => {
      return res.status(200).json(comment);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;
