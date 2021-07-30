const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//GET PRICE BY ID
server.get("/:idPrice", async (req, res, next) => {
    const {idPrice} = req.params

    await stripe.prices.retrieve(idPrice).then((price)=>{
        return res.status(200).json(price);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

//GET lIST ALL PRICES 
server.get("/", async (req, res, next) => {

    await stripe.prices.list({limit: 10}).then((price)=>{
        return res.status(200).json(price);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});


module.exports = server;

