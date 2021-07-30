const server = require("express").Router();
const { getAllEmails } = require("../../controllers/newsletter/newsletter.controllers.js");

server.get("/", (req, res, next) => {
    return getAllEmails().then((emails) => {
        res.status(200).json(emails);
      }).catch((error) => {
        res.status(400).json(error);
      });
  });

module.exports = server;