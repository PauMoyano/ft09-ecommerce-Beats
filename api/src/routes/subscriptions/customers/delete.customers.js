const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//CREATE CUSTOMER = CLIENT
server.delete("/delete/:idCustomer", async (req, res, next) => {
const {idCustomer} = req.params
  return await stripe.customers.del(idCustomer).then((customers)=>{
        return res.status(200).json(customers);
    })  
});

module.exports = server;