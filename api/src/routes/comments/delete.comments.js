const server = require("express").Router();
const {deleteComment} = require("../../controllers/comments/comments.controller");
const {protectorAdmin} = require("../../middlewares/protector.middleware");

server.delete("/:commentId",protectorAdmin, (req, res, next) => {
  let {commentId} = req.params;
  return deleteComment(commentId).then((comment) => {
      return res.status(201).json(comment);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;
