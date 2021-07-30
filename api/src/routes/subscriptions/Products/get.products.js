const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


//Retrieves the details of a Product
server.get("/:idProduct", async (req, res, next) => {
    const {idProduct} = req.params
    await stripe.products.retrieve(idProduct).then((product)=>{
        return res.status(200).json(product);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

//List all disputes
server.get("/", async (req, res, next) => {

    await stripe.products.list({
        limit: 10,
      }).then((products)=>{
        return res.status(200).json(products);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

module.exports = server;