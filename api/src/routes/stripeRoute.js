
const Stripe = require("stripe");
require("dotenv").config();
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

const server = require("express").Router();

module.exports = server;

server.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Beat Content",
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

