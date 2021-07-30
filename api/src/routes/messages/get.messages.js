const server = require("express").Router();
const {getMessages, getMessageById, getMessagesConversation, getMessagesConversationreturn } = require("../../controllers/messages/messages.controller");

server.get("/", (req, res, next) => {
  return getMessages().then((messages) => {
      return res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
});

server.get("/:messageId", (req, res, next) => {
  let { messageId } = req.params;
  return getMessageById(messageId).then((message) => {
      return res.status(201).json(message);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});
server.get("/:idFrom/conversation/:idTo", (req, res, next) => {
  let { idFrom, idTo } = req.params;
  let conversacion =[];
  
  getMessagesConversation(idFrom, idTo).then((messages) => {
    messages.forEach(element => {
      conversacion.push(element.dataValues)
    });
  })
  getMessagesConversationreturn(idFrom, idTo).then((messagesReturn) => {
    messagesReturn.forEach(element => {
      conversacion.push(element.dataValues)
    });
    return res.status(200).json(conversacion);
  })
    .catch((error) => {
      return res.status(400).json(error);
    });
});


module.exports = server;
