const { editCoupon } =require('../../controllers/coupons/coupons.controller');
const server = require("express").Router();

//const {protectorUser} = require("../../middlewares/protector.middleware");

server.put("/:couponId", (req, res, next) => {
  let { couponId } = req.params;
  let coupon = req.body;
  return editCoupon(couponId, coupon).then((coupon) => {
      return res.status(200).json(coupon);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = server;
