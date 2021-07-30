const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//CREATE INVOICE BY ID CUSTOMER
server.post("/create/:idCustomer", async (req, res, next) => {
    const {idCustomer} = req.params

    await stripe.invoices.create(
      {customer:idCustomer}
      ).then((invoice)=>{
        return res.status(200).json(invoice);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

//FINLALIZE INVOICE
server.post("/finalize/:idInvoice", async (req, res, next) => {
  const {idInvoice} = req.params

  await stripe.invoices.finalizeInvoice(idInvoice).then((invoice)=>{
      return res.status(200).json(invoice);
      }).catch((error)=>{
      return res.status(400).json(error);
      });  
});

//PAY INVOICE(Stripe automatically creates and then attempts to collect payment 
//on invoices for customers on subscriptions according)
server.post("/pay/:idInvoice", async (req, res, next) => {
  const {idInvoice} = req.params

  await stripe.invoices.pay(idInvoice).then((invoice)=>{
      return res.status(200).json(invoice);
      }).catch((error)=>{
      return res.status(400).json(error);
      });  
});

//SEND INVOICE CLIENT(Stripe will automatically send invoices to customers)
server.post("/send/:idInvoice", async (req, res, next) => {
  const {idInvoice} = req.params

  await stripe.invoices.sendInvoice(idInvoice).then((invoice)=>{
      return res.status(200).json(invoice);
      }).catch((error)=>{
      return res.status(400).json(error);
      });  
});

//VOID INVOICE(Mark a finalized invoice as void)
server.post("/void/:idInvoice", async (req, res, next) => {
  const {idInvoice} = req.params

  await stripe.invoices.voidInvoice(idInvoice).then((invoice)=>{
      return res.status(200).json(invoice);
      }).catch((error)=>{
      return res.status(400).json(error);
      });  
});

//MARK AN INVOICE AS UNCOLLECTIBLE
server.post("/mark_uncollectible/:idInvoice", async (req, res, next) => {
  const {idInvoice} = req.params

  await stripe.invoices.markUncollectible(idInvoice).then((invoice)=>{
      return res.status(200).json(invoice);
      }).catch((error)=>{
      return res.status(400).json(error);
      });  
});

module.exports = server;