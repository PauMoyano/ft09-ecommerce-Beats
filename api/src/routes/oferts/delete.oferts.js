const server = require("express").Router();
const {deleteOfert} = require("../../controllers/oferts/oferts.controller");
//const {protectorAdmin} = require("../../middlewares/protector.middleware");

server.delete("/:ofertId", (req, res, next) => {
  let {ofertId} = req.params;
  return deleteOfert(ofertId).then((ofert) => {
      return res.status(201).json(ofert);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;
