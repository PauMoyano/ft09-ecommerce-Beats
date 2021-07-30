const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//RETRIEVE SUBSCRIPTION WITH ID
server.get("/:idSubscription", async (req, res, next) => {
    const {idSubscription} = req.params
    await stripe.subscriptions.retrieve(idSubscription).then((subscription)=>{
          return res.status(200).json(subscription);
      }).catch((error)=>{
        return res.status(400).json(error);
      })  
});

//GET ALL SUBSCRIPTIONS 
server.get("/", async (req, res, next) => {
    await stripe.subscriptions.list({
        limit: 10,
      }).then((subscription)=>{
          return res.status(200).json(subscription);
      }).catch((error)=>{
        return res.status(400).json(error);
      })  
});

module.exports = server;
