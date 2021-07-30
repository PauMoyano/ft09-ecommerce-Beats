const { Likes, Product } = require("../../db");

module.exports = {
// NEW POST LIKE 
newCreateLike: async (idProduct,like, author, idUser) => { 
    let newLike = {
        like:like,
        author:author,
        idUser:idUser
    }
    return await Likes.create(newLike).then(async(like) => {
      return await Product.findByPk(idProduct).then(async(oneLike) => {
        return await Likes.findByPk(like.id).then((newid) => {
          oneLike.addLike(newid);
          return newid;
        });
      });
    });  
 },

 //ALL LIKES
getLikes: async () => {
  return await Likes.findAll().then((likes) => likes);
},
getLikesByUserId: async (userID) => {
    return await Likes.findAll({
      where: {
        idUser: userID
      },
      include: [
        {
          model: Product,
          as:"products"
        },
        
      ],
  
    
  }).then((likes) => likes);
},
//LIKES BY ID
getLikeById: async (idLikes) => {
  return await Likes.findByPk(idLikes).then((likes) => likes);
},

// EDIT LIKE
editLike: async (likeId,like) => {
  return await Likes.update({like:like}, {
      where: { id: parseInt(likeId) },
  }).then(() => {
      return Likes.findByPk(likeId).then((like)=>{
          return like.dataValues;
      });
  });
},

//DELETE LIKE
deleteLike: async (likeId) => {
  return await Likes.destroy({
    where: {
      id: likeId,
    },
    }).then((like) => {
      console.log(like)
      return like === 1 ? "Like delete succefull" : "Like dont´s exist"
    });
},

};
