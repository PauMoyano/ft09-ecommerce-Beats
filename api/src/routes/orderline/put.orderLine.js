const server = require("express").Router();
const {
  editOrderLine,
} = require("../../controllers/orderline/orderLine.controller");

server.put("/:orderLineId", (req, res) => {
  const { orderLineId } = req.params;
  const orderLine = req.body;
  return editOrderLine(orderLineId, orderLine)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;
