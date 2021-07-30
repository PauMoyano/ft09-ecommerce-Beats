const server = require("express").Router();
const {createComment} = require("../../controllers/comments/comments.controller");
const {protectorUser} = require("../../middlewares/protector.middleware");

server.post("/",protectorUser, (req, res, next) => {
  console.log(req.body)
  const {idProduct, comment} = req.body;
  return createComment(idProduct, comment).then((commentAdded) => {
      return res.status(201).json(commentAdded);
    }).catch((error) => {
      return res.status(400).json(error.message);
    });
});

module.exports = server;
