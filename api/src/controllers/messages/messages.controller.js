const { User, Messages } = require("../../db");

module.exports = {

createMessages: async (idTo, idFrom, message,userFrom) => { 
    let newMessageDos = {
        from:idFrom,
        to:idTo,
        data:message,
        userFrom:userFrom
    }
    return await Messages.create(newMessageDos).then(async(message) => {
      return await User.findByPk(idTo).then(async(oneMessage) => {
        return await Messages.findByPk(message.id).then((newMessageId) => {
            oneMessage.addMessage(newMessageId);
          return newMessageId;
        });
      });
    });  
 },
  getMessages: async () => {
    return await Messages.findAll().then((messages) => messages);
  },
  getMessagesConversation: async (idFrom, idTo) => {
    return await Messages.findAll({
      where: {
        from: idFrom,
        to: idTo
      }
    }).then((messages) => messages);
  },
  getMessagesConversationreturn: async (idFrom, idTo) => {
    return await Messages.findAll({
      where: {
        from: idTo,
        to: idFrom
      }
    }).then((messages) => messages);
  },
  getMessageById: async (idComment) => {
    return await Messages.findByPk(idMessage).then((message) => message);
  },
  editMessage: async (messageId, message) => {
    return await Messages.update(message, {
      where: {
        id: messageId,
      },
    }).then((message) => message);
  },
  deleteMessage: async (messageId) => {
    return await Messages.destroy({
      where: {
        id: messageId,
      },
    }).then((message) => {
      return message === 1 ? "Message delete succefull" : "Message dont´s exist"
    });
  },
};
