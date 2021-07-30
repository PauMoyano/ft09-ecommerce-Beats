const { Comment, Product , User} = require("../../db");

module.exports = {
  createComment: async (idProduct,comment) => {
    return await Comment.create({
      comment: comment.comment,
      author: comment.author,
      productId: idProduct,
      userId: comment.userId,
    }).then((comment) => {
      return  comment;
    })          
    .catch((error) => {
            return res.json(error);
          })      
  },
  getComments: async () => {
    return await Comment.findAll().then((comments) => comments);
  },
  getCommentsByEmail: async (email) => {
    return await Comment.findAll({
      where:{author:email},
      include:[{model: Product,attributes:["name", "artist", "id"]}]
    }).then((comments) => comments)
  },
  getCommentById: async (idComment) => {
    return await Comment.findByPk(idComment).then((comment) => comment);
  },
  editComment: async (commentId, comment) => {
    return await Comment.update(comment, {
      where: {
        id: commentId,
      },
    }).then((comment) => comment);
  },
  deleteComment: async (commentId) => {
    return await Comment.destroy({
      where: {
        id: commentId,
      },
    }).then((comment) => {
      return comment === 1 ? "Comment delete succefull" : "Comment dont´s exist"
    });
  },
};
