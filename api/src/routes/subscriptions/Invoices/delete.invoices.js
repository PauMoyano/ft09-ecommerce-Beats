const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//DELETE INVOICE
server.delete("/:idInvoice", async (req, res, next) => {
    const {idInvoice} = req.params
    await stripe.invoices.del(idInvoice).then((invoice)=>{
        return res.status(200).json(invoice);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});


module.exports = server;