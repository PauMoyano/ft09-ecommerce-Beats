const server = require("express").Router();
const { deleteOrder } = require("../../controllers/order/order.controller");

server.delete("/:orderId", (req, res) => {
  const { orderId } = req.params;
  return deleteOrder(orderId)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;
