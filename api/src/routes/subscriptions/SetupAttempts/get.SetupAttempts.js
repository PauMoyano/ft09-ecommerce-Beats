const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//Retrieves the details of a SetupIntent that has previously been created.
server.get("/", async (req, res, next) => {
  await stripe.setupAttempts.list({
    limit: 10,
  }).then((setupAttempts)=>{
       return res.status(200).json(setupAttempts);
  }).catch((error)=>{
    return res.status(400).json(error);
  });

});


module.exports = server;