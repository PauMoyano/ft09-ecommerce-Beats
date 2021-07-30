const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


//Edit a product
server.put("/update/:idProduct", async (req, res, next) => {
    const {idProduct} = req.params
    const {idOrder} = req.body
    await stripe.products.update(idProduct,
        {metadata: {order_id: idOrder}}
      ).then((product)=>{
        return res.status(200).json(product);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

module.exports = server;