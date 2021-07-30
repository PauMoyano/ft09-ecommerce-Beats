const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


/*
Retrieve a payout
Retrieves the details of an existing payout. Supply the unique payout ID from either 
a payout creation request or the payout list, and Stripe will return the corresponding 
payout information.
*/
server.get("/:idPayout", async (req, res, next) => {
  const {idPayout} = req.params;
  const payout = await stripe.payouts.retrieve(idPayout);
  return res.status(200).json(setupIntent);
});


//List all Payouts
server.get("/", async (req, res, next) => {

  return await stripe.payouts.list({
    limit: 10,
  }).then((payouts)=>{
      return res.status(200).json(payouts);
  }).catch((error)=>{
    return res.status(400).json(error);
  })
  
});

module.exports = server;
