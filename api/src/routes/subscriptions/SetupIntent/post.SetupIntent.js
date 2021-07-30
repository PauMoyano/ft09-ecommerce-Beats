const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);
  
//CREATE setupIntents
server.post("/create", async (req, res, next) => {

return await stripe.setupIntents.create({
  payment_method_types: ['card'],
}).then((setupIntents)=>{
          return res.status(200).json(setupIntents);
      }).catch((error)=>{
        return res.status(400).json(error);
      })  
});


//Sonfirm setupIntents
server.post("/confirm/:idCustomer", async (req, res, next) => {
  const {idCustomer} = req.params;

  return await stripe.setupIntents.confirm(idCustomer,
    {
      payment_method: 'pm_card_visa'
    }
  ).then((setupIntents)=>{
            return res.status(200).json(setupIntents);
        }).catch((error)=>{
          return res.status(400).json(error);
        })  
  });


module.exports = server;

