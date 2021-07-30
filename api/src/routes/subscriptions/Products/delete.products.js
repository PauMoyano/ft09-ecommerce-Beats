const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//Delete a product
server.delete("/:idProduct", async (req, res, next) => {
    const {idProduct} = req.params
    await stripe.products.del(idProduct).then((product)=>{
        return res.status(200).json(product);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

module.exports = server;