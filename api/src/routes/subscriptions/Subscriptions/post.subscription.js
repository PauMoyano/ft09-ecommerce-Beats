//customer(REQUIRED) The identifier of the customer to subscribe.
//items(REQUIRED)A list of up to 20 subscription items, each with an attached price.
const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//CREATE SUBSCRIPTION
server.post("/create/:idCustomer", async (req, res, next) => {
    const {idCustomer} = req.params
    const {idPrice} = req.body
    
    await stripe.subscriptions.create({
        customer: idCustomer,
        items: [
          {price: idPrice},
        ],
      }).then((subscription)=>{
          return res.status(200).json(subscription);
      }).catch((error)=>{
        return res.status(400).json(error);
      })  
});

module.exports = server;



