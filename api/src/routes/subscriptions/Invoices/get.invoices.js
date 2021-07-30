const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//GET INVOICE BY ID
server.get("/:idInvoice", async (req, res, next) => {
    const {idInvoice} = req.params

    await stripe.invoices.retrieve(idInvoice).then((invoice)=>{
        return res.status(200).json(invoice);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

//Retrieve an invoice's line items
server.get("/lines/:idInvoice", async (req, res, next) => {
    const {idInvoice} = req.params

    await stripe.invoices.listLineItems(idInvoice,
        { limit: 5 },
        function(err, lines) {
          // asynchronously called
        }).then((invoice)=>{
        return res.status(200).json(invoice);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

//Retrieve an invoice's line items
server.get("/upcoming/:idCustomer", async (req, res, next) => {
    const {idCustomer} = req.params

    await stripe.invoices.retrieveUpcoming({
        customer: idCustomer,
      }).then((invoice)=>{
        return res.status(200).json(invoice);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

//Retrieve an upcoming invoice's line items
server.get("/upcoming/lines/:idCustomer", async (req, res, next) => {
    const {idCustomer} = req.params

    await stripe.invoices.listUpcomingLineItems({
        customer: idCustomer,
        limit: 5,
      }).then((invoice)=>{
        return res.status(200).json(invoice);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

//GET ALL INVOICES
server.get("/", async (req, res, next) => {

    await stripe.invoices.list().then((invoice)=>{
        return res.status(200).json(invoice);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});


module.exports = server;