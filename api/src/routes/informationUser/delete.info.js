const server = require("express").Router();
const {
  deleteInfoUser,
} = require("../../controllers/informationUser/info.controller");

server.delete("/:userId", (req, res) => {
  const { userId } = req.params;
  return deleteInfoUser(userId)
    .then((datauser) => {
      res.status(200).json(datauser);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;