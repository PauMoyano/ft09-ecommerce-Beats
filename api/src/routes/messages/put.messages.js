const server = require("express").Router();
//const {protectorUser} = require("../../middlewares/protector.middleware");
const {editMessage } = require("../../controllers/messages/messages.controller");

server.put("/:messageId", (req, res, next) => {
  let { messageId } = req.params;
  let message = req.body;
  return editComment(messageId, message).then((message) => {
      return res.status(200).json(message);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;
