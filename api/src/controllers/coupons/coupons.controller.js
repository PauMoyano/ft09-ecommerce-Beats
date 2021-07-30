const { Coupons } = require("../../db");

module.exports = {

    createCoupon: async (coupon) => {
        return await Coupons.create(coupon).then((coupon) => coupon);
    },
    getCoupons: async () => {
        return await Coupons.findAll().then((coupons) => coupons);
    },
    getCouponById: async (couponId) => {
        return await Coupon.findByPk(couponId).then((coupon) => coupon);
    },
    editCoupon: async (couponId, coupon) => {
        return await Coupons.update(coupon, {
            where: {
                id: couponId,
            },
        }).then((coupon) => coupon);
    },
    deleteCoupon: async (couponId) => {
        return await Coupons.destroy({
            where: {
                id: couponId,
            },
        }).then((coupon) => {
            return coupon === 1 ? "coupon delete succefull" : "coupon dont´s exist"
        });
    },
};
