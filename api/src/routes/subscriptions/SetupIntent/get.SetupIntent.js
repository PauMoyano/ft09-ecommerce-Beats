const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


//Retrieves the details of a SetupIntent that has previously been created.
server.get("/:idSetupIntent", async (req, res, next) => {
  const {idSetupIntent} = req.params
  const setupIntent = await stripe.setupIntents.retrieve(idSetupIntent);
  
  return res.status(200).json(setupIntent);
    
});

//Returns a list of SetupIntents.
server.get("/", async (req, res, next) => {

  return  await stripe.setupIntents.list({
    limit: 10,
  }).then((setupIntent)=>{
    return res.status(200).json(setupIntent);
  }).catch((error)=>{
    return res.status(400).json(error);
  })
    
});

module.exports = server;