const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//EDIT INVOICE
server.put("/:idInvoice", async (req, res, next) => {
    const {idInvoice} = req.params
    const {idOrder} = req.body
    await stripe.invoices.update(idInvoice,
        {metadata: {order_id: idOrder}}
      ).then((invoice)=>{
        return res.status(200).json(invoice);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});


module.exports = server;