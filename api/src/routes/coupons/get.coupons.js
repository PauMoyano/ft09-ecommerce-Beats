const { getCoupons,getCouponById }=require('../../controllers/coupons/coupons.controller');
const server = require("express").Router();

server.get("/", (req, res, next) => {
  return getCoupons().then((coupons) => {
      return res.status(200).json(coupons);
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
});
server.get("/:couponId", (req, res, next) => {
  let { couponId } = req.params;
  return getCouponById(couponId).then((coupon) => {
      return res.status(201).json(coupon);
    }).catch((error) => {
      return res.status(400).json(error);
    });
});


module.exports = server;
