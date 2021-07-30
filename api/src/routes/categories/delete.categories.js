const server = require("express").Router();
const {deleteCategory} = require("../../controllers/categories/delete.categories");
const {protectorAdmin} = require("../../middlewares/protector.middleware");


server.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    return deleteCategory(id).then((category) => {
      return res.status(202).json(category);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;