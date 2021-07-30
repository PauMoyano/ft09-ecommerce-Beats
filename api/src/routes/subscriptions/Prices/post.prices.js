const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//CREATE PRICE
server.post("/create/:idProduct", async (req, res, next) => {
    const {idProduct} = req.params
    const {unit_amount, currency,recurring} = req.body
    await stripe.prices.create({
        unit_amount: unit_amount, //"1234"
        currency: currency, //"usd"
        recurring: recurring, // "{interval: 'month'}"
        product: idProduct,
      }).then((price)=>{
        return res.status(200).json(price);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});


module.exports = server;