const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//CREATE Payout
server.post("/create", async (req, res, next) => {
const {amount, currency} = req.body
  await stripe.payouts.create({
    amount: amount,
    currency: currency, // 'usd'
  }).then((payouts)=>{
          return res.status(200).json(payouts);
      }).catch((error)=>{
        return res.status(400).json(error);
      })  
});



module.exports = server;

