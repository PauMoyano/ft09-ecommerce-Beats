const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

/*
A SetupIntent object can be canceled when it is in one of these statuses: 
requires_payment_method, requires_confirmation, or requires_action.
*/
server.delete("/cancel/:idSetupIntent", async (req, res, next) => {
  const { idSetupIntent } = req.params;
  return  await stripe.setupIntents.cancel(idSetupIntent).then((setupIntent)=>{
          return res.status(200).json(setupIntent);
      }).catch((error)=>{
        return res.status(400).json(error);
      })
  });

module.exports = server;

