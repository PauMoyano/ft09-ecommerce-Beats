const server = require("express").Router();
const { deleteEmail } = require("../../controllers/newsletter/newsletter.controllers.js");

server.delete('/', (req, res, next) => {
    let email = req.body.email;
    return deleteEmail(email).then((email) => {
            return res.status(200).json('Succesfully deleted email from the Newsletter List');
        }).catch((error) => {
          return res.status(400).json(error);
        });
});

module.exports = server;