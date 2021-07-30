const { deleteCoupon } =require('../../controllers/coupons/coupons.controller');
const server = require("express").Router();
//const {protectorAdmin} = require("../../middlewares/protector.middleware");

server.delete("/:couponId", (req, res, next) => {
  let {couponId} = req.params;
  return deleteCoupon(couponId).then((coupon) => {
      return res.status(201).json(coupon);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;
