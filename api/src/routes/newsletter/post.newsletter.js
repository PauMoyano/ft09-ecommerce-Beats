const server = require("express").Router();
const { addEmail } = require("../../controllers/newsletter/newsletter.controllers.js");


server.post("/", (req, res, next) => {
    const email = req.body.email;
    return addEmail(email).then((emails) => {
        res.status(200).json(emails);
        }).catch((error) => {
        res.status(400).json(error);
        });
});

module.exports = server;