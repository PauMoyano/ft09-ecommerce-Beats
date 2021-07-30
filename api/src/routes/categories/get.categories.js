const server = require("express").Router();
const {getCategories} = require("../../controllers/categories/get.categories");

server.get("/", (req, res, next) => {
  return getCategories().then((categories) => {
      return res.status(201).json(categories);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;