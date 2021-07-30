const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//Updates a SetupIntent object.
server.put("/update/:idSetupIntent", async (req, res, next) => {
const {  idUser } = req.body;
const {idSetupIntent} = req.params

return await stripe.setupIntents.update(idSetupIntent,
  {metadata: {user_id: idUser }}
).then((setupIntents)=>{
        return res.status(200).json(setupIntents);
    }).catch((error)=>{
      return res.status(400).json(error);
    })  
});

module.exports = server;