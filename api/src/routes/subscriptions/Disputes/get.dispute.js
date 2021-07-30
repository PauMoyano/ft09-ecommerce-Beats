const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);


//Retrieves the details of a Dispute
server.get("/:idDispute", async (req, res, next) => {
    const {idDispute} = req.params
    await stripe.disputes.retrieve(idDispute).then((dispute)=>{
        return res.status(200).json(dispute);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

//List all disputes
server.get("/", async (req, res, next) => {

    await stripe.disputes.list({limit: 10,}).then((dispute)=>{
        return res.status(200).json(dispute);
        }).catch((error)=>{
        return res.status(400).json(error);
        });  
});

module.exports = server;