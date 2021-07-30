const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//PUT PRICE 
server.get("/:idPrice", async (req, res, next) => {
    const {idPrice} = req.params
    const {idOrder} = req.body
    await stripe.prices.update(idPrice,
        {metadata: {order_id: idOrder}}
      ).then((price)=>{
        return res.status(200).json(price);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

module.exports = server;