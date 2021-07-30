const { createCoupon } =require('../../controllers/coupons/coupons.controller');
const server = require("express").Router();
//const {protectorUser} = require("../../middlewares/protector.middleware");

server.post("/", (req, res, next) => {
  const {coupon,discount} = req.body;
  let newCoupon = {
    coupon,
    discount
  }
  return createCoupon(newCoupon).then((coupon) => {
      return res.status(201).json(coupon);
    }).catch((error) => {
      return res.status(400).json(error.message);
    });
});

module.exports = server;
