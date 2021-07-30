const server = require("express").Router();
const { createInfoUser } = require("../../controllers/informationUser/info.controller");

server.post("/", (req, res, next) => {
  const dataUser = req.body;
  return createInfoUser(dataUser)
    .then((dataUser) => {
      res.status(200).json(dataUser);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;