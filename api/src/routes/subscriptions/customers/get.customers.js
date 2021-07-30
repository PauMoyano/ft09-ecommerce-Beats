const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


//CUSTOMERS LIST 
server.get("/", async (req, res, next) => {
  await stripe.customers.list().then((customer)=>{
    console.log(customer)
    return res.status(200).json(customer);
    }).catch((error)=>{
    console.log(error)
    return res.status(400).json(error);
    });  
    
});

//CUSTOMERS By ID
server.get("/:idCustomer", async (req, res, next) => {
  const {idCustomer} = req.params
  const customers = await stripe.customers.retrieve(idCustomer);
  
  return res.status(200).json(customers);
    
});

module.exports = server;