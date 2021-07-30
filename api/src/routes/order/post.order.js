const server = require("express").Router();
const {createOrder} = require("../../controllers/order/order.controller");

server.post("/", (req, res, next) => {
  const order = req.body;
  return createOrder(order)
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;