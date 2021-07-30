const server = require("express").Router();
const {deleteUser} = require("../../controllers/users/delete.users");
//const {protectorAdmin} = require("../../middlewares/protector.middleware");

server.delete('/:id', (req, res, next) => {
    let { id } = req.params;
    return deleteUser(id).then((user) => {
            return res.status(200).json(user);
        }).catch((error) => {
          return res.status(400).json(error);
        });
});

module.exports = server;