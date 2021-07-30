const server = require("express").Router();
const {
  getInfoUser,
  getInfoByUserId,
} = require("../../controllers/informationUser/info.controller");

server.get("/", (req, res, next) => {
  return getInfoUser()
    .then((datausers) => {
      res.status(200).json(datausers);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

server.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  return getInfoByUserId(userId)
    .then((datausers) => {
      res.status(200).json(datausers);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});
module.exports = server;