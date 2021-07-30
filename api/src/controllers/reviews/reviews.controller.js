const { Review, Product } = require("../../db");

module.exports = {
  createReview: async (idProduct,review) => {
    return await Review.create(review).then((review) => {
      return Product.findByPk(idProduct).then((Product) => {
        Review.findByPk(review.id).then((newReview) => {
          var newReviewAdded = newReview;
            return Product.addComment(newReview).then(()=>{
              return newReviewAdded.dataValues;
            });            
          }).catch((error) => {
            return res.json(error);
          });
       })
    });
  },
  getReviews: async () => {
    return await Review.findAll().then((reviews) => reviews);
  },
  getReviewById: async (idReview) => {
    return await Review.findByPk(idReview).then((review) => review);
  },
  editReview: async (idReview, review) => {
    return await Review.update(review, {
      where: {
        id: idReview,
      },
    }).then((review) => review);
  },
  deleteReview: async (idReview) => {
    return await Review.destroy({
      where: {
        id: idReview,
      },
    }).then((review) => {
      return review === 1 ? "review delete succefull" : "review dont´s exist"
    });
  },
};
