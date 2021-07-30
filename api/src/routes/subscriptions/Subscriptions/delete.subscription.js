const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//EDIT SUBSCRIPTION
server.put("/:idSubscription", async (req, res, next) => {
    const {idSubscription} = req.params
    await stripe.subscriptions.del(idSubscription).then((subscription)=>{
          return res.status(200).json(subscription);
      }).catch((error)=>{
        return res.status(400).json(error);
      })  
});

module.exports = server;