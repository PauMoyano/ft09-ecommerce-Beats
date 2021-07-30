const server = require("express").Router();
const {getComments, getCommentById, getCommentsByEmail } = require("../../controllers/comments/comments.controller");

server.get("/", (req, res, next) => {
  return getComments().then((comments) => {
      return res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
});
server.get("/:commentId", (req, res, next) => {
  let { commentId } = req.params;
  return getCommentById(commentId).then((comment) => {
      return res.status(201).json(comment);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});
server.get("/email/:emailId", (req, res, next) => {
  let {emailId} = req.params;
  return getCommentsByEmail(emailId).then((comments) => {
    return res.status(201).json(comments);
  }).catch((error) => {
    return res.status(400).json(error);
  })
})

module.exports = server;
