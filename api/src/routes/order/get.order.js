const server = require("express").Router();
const {
  getOrders,
  getOrderById,
  getOrdersByUserID,
} = require("../../controllers/order/order.controller");

server.get("/", (req, res, next) => {
  return getOrders()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

server.get("/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  return getOrderById(orderId)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

server.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  return getOrdersByUserID(userId, "cart")
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

server.get("/user/all/:userId", (req, res, next) => {
  const { userId } = req.params;

  return getOrdersByUserID(userId, "all")
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;
