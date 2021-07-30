const server = require("express").Router();
const {
  getOrderLineById,
  getOrderLines,
} = require("../../controllers/orderline/orderLine.controller");

server.get("/", (req, res, next) => {
  return getOrderLines()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

server.get("/:orderLineId", (req, res, next) => {
  const { orderLineId } = req.params;
  return getOrderLineById(orderLineId)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});
module.exports = server;
