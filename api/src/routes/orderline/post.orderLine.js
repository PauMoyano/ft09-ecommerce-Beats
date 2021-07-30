const server = require("express").Router();
const { createOrderLine } = require("../../controllers/orderline/orderLine.controller");

server.post("/", (req, res, next) => {
  const order = req.body;
  return createOrderLine(order)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;