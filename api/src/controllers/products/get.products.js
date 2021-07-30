const { Product, Categories, Comment, Likes, Oferts } = require("../../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  getAllProducts: async () => {
    return await Product.findAll({
      include: [
        {
          model: Categories,
          as: "categories",
        },
        {
          model: Comment,
          as: "comments",
        },
        {
          model: Likes,
          as: "likes",
        },
        {
          model: Oferts,
          as: "oferts",
        },
      ],
    });
  },
  findProductsByCategoryName: async (category) => {
    return await Product.findAll({
      include: [
        {
          model: Categories,
          where: {
            name: category,
          },
        },
      ],
    });
  },
  findProductById: async (id) => {
    return await Product.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: Categories,
          as: "categories",
        },
        {
          model: Comment,
          as: "comments",
        },
        {
          model: Likes,
          as: "likes",
        },
        {
          model: Oferts,
          as: "oferts",
        },
      ],
    });
  },
  getProductsByLetterIncludeInTheName: async (inputValue) => {
    return await Product.findAll({
      where: {
        name: {
          [Op.iLike]: '%' + inputValue + '%'
        }
      },
      include: [{ model: Categories, as: "categories" }],
    });
  },
  searchProductsByCategoryName(categoryName) {
    return Categories.findAll({
      where: {
        name: {
          [Op.iLike]: categoryName
        }
      },
      include: [{ model: Product, as: 'products' }]
    })
  },
};
