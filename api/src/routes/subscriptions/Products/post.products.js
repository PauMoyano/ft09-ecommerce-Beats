const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


//Create a product
server.post("/create", async (req, res, next) => {
    const {name} = req.body
    await stripe.products.create({
        name: name,
      }).then((product)=>{
        return res.status(200).json(product);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

module.exports = server;