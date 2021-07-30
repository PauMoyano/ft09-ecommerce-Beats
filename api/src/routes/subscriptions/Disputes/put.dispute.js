const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


//When you get a dispute, contacting your customer is always the best first step.
//If that doesn’t work, you can submit evidence to help us resolve the dispute in your favor. 
server.put("/:idDispute", async (req, res, next) => {
    const {idDispute} = req.params
    const {idOrder} = req.body
    await stripe.disputes.update(idDispute,
        {metadata: {order_id: idOrder}}
      ).then((dispute)=>{
        return res.status(200).json(dispute);
        }).catch((error)=>{
        return res.status(400).json(error);
      }); 
});

module.exports = server;