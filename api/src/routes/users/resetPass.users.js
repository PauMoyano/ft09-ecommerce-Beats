const server = require("express").Router();
const { addCode } = require("../../controllers/users/resetPass.users");

server.post('/resetcode',(req, res, next) => {
    const { code, email } = req.body;
    addCode(code, email)
        .then((cat) => {
          return res.status(200).json(cat);
        }).catch((error) => {
          return res.status(400).json(error.message);
        });
})

module.exports = server;


