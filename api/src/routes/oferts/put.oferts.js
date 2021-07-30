const server = require("express").Router();
const {editOfert} = require("../../controllers/comments/comments.controller");
//const {protectorUser} = require("../../middlewares/protector.middleware");

server.put("/:ofertId", (req, res, next) => {
  let { ofertId } = req.params;
  let ofert = req.body;
  return editOfert(ofertId, ofert).then((ofert) => {
      return res.status(200).json(ofert);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;
