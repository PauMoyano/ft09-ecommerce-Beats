const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

/*
Cancel a payout
A previously created payout can be canceled if it has not yet been paid out. 
Funds will be refunded to your available balance. You may not cancel automatic 
Stripe payouts.
*/
server.delete("/cancel/:idPayout", async (req, res, next) => {
  const { idPayout } = req.params;
  return await stripe.payouts.cancel(idPayout).then((payout)=>{
          return res.status(200).json(payout);
      }).catch((error)=>{
        return res.status(400).json(error);
      })
  });

module.exports = server;