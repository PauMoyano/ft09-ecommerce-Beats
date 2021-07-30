const server = require("express").Router();
const {
  editInfoUser,
} = require("../../controllers/informationUser/info.controller");

server.put("/:userId", (req, res) => {
  const { userId } = req.params;
  const datauser = req.body;
  return editInfoUser(userId, datauser)
    .then((datauser) => {
      res.status(200).json(datauser);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;
