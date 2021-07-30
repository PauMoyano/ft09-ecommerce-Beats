const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


//Close a dispute
server.delete("/:idDispute", async (req, res, next) => {
    const {idDispute} = req.params
    await stripe.disputes.close(idDispute).then((dispute)=>{
    return res.status(200).json(dispute);
    }).catch((error)=>{
    return res.status(400).json(error);
    }); 
})

module.exports = server;