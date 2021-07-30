const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
// To create a PaymentIntent, see our guide at: https://stripe.com/docs/payments/payment-intents/creating-payment-intents#creating-for-automatic    
server.delete("/cancel/:idPaymentIntent", async (req, res, next) => {
  const { idPaymentIntent } = req.params;
  return await stripe.paymentIntents.cancel(idPaymentIntent).then((paymentIntent)=>{
          return res.status(200).json(paymentIntent);
      }).catch((error)=>{
        return res.status(400).json(error);
      })
  });

module.exports = server;