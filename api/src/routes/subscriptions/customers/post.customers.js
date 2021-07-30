const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//CREATE CUSTOMER = CLIENT
server.post("/create", async (req, res, next) => {
const {  email,  phone, description, address, subscription_mode, suscription_time} = req.body;
  return await stripe.customers.create({
    metadata: {
      email,
      description,
      phone,
      address,
      subscription_mode,
      suscription_time
    }
    }).then((customers)=>{
        return res.status(200).json(customers);
    })  
});

module.exports = server;

