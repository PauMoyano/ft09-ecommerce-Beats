const server = require("express").Router();
const {getOferts, getOfertById } = require("../../controllers/oferts/oferts.controller");

server.get("/", (req, res, next) => {
  return getOferts().then((oferts) => {
      return res.status(200).json(oferts);
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
});
server.get("/:ofertId", (req, res, next) => {
  let { ofertId } = req.params;
  return getOfertById(ofertId).then((ofert) => {
      return res.status(201).json(ofert);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});


module.exports = server;
