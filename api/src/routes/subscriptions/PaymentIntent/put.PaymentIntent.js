const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//UPDATE PaymentIntents
server.put("/update/:idPayment", async (req, res, next) => {
const {  idOrder } = req.body;
const {idPayment} = req.params

return  await stripe.paymentIntents.update(idPayment,
  {
    metadata: {
      order_id: idOrder
    }
  }
).then((paymentIntents)=>{
        return res.status(200).json(paymentIntents);
    }).catch((error)=>{
      return res.status(400).json(error);
    })  
});

module.exports = server;