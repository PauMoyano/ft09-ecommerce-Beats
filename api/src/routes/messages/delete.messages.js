const server = require("express").Router();
const {deleteMessage} = require("../../controllers/messages/messages.controller");
//const {protectorAdmin} = require("../../middlewares/protector.middleware");

server.delete("/:messageId", (req, res, next) => {
  let {messageId} = req.params;
  return deleteMessage(messageId).then((message) => {
      return res.status(201).json(message);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;
