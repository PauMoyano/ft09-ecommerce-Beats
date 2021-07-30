const server = require("express").Router();
const { editOrder } = require("../../controllers/order/order.controller");
const {Order} = require("../../db");

server.put("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = req.body;
  return editOrder(orderId, order)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});
server.put("/discount/:IdOrder", async (req, res, next) => {
  const {IdOrder} = req.params
  const {orderDiscount} = req.body
  return await Order.findByPk(IdOrder).then(async (order)=>{
    return await Order.update({discount: orderDiscount}, {
      where:{
        id:IdOrder,
      }
    }).then((order)=>{
      return res.status(200).json(order)
    })
  }).catch((error) => {
      return error
    });
});

module.exports = server;
