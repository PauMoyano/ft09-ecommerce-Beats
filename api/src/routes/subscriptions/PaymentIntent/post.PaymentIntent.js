const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//CREATE CUSTOMER = CLIENT
server.post("/create", async (req, res, next) => {
const { amount } = req.body;
  return await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  }).then((paymentIntent)=>{
          return res.status(200).json(paymentIntent);
      })  
});


server.post("/confirm/:clientKey", async (req, res, next) => {
  const {  amount } = req.body;
  const { clientKey } = req.params;
  
// To create a PaymentIntent for confirmation, see our guide at: https://stripe.com/docs/payments/payment-intents/creating-payment-intents#creating-for-automatic
return await stripe.paymentIntents.confirm(clientKey,
  {payment_method: 'pm_card_visa'}
).then((paymentIntent)=>{
          return res.status(200).json(paymentIntent);
      }).catch((error)=>{
        return res.status(400).json(error);
      })  
  });


// To create a requires_capture PaymentIntent, see our guide at: https://stripe.com/docs/payments/capture-later
server.post("/capture/:clientKey", async (req, res, next) => {
    const { clientKey } = req.params;
    return await stripe.paymentIntents.capture(clientKey).then((paymentIntent)=>{
            return res.status(200).json(paymentIntent);
        }).catch((error)=>{
          return res.status(400).json(error);
        })  
    });







module.exports = server;

