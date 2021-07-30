const server = require("express").Router();
const Stripe = require("stripe");
const { STRIPE_KEY } = process.env;
const stripe = new Stripe(STRIPE_KEY);

//  PaymentIntent By ID
/*
{
  "id": "pi_1DnXg72eZvKYlo2CSIFdQHpM",
  "object": "payment_intent",
  "amount": 1099,
  "amount_capturable": 0,
  "amount_received": 0,
  "application": null,
  "application_fee_amount": null,
  "canceled_at": null,
  "cancellation_reason": null,
  "capture_method": "automatic",
  "charges": {
    "object": "list",
    "data": [],
    "has_more": false,
    "url": "/v1/charges?payment_intent=pi_1DnXg72eZvKYlo2CSIFdQHpM"
  },
  "client_secret": "pi_1DnXg72eZvKYlo2CSIFdQHpM_secret_eEpw2Szwar9mB0M78ShjFMGpV",
  "confirmation_method": "automatic",
  "created": 1546289283,
  "currency": "gbp",
  "customer": null,
  "description": null,
  "invoice": null,
  "last_payment_error": null,
  "livemode": false,
  "metadata": {
    "order_id": "6735"
  },
  "next_action": null,
  "on_behalf_of": null,
  "payment_method": null,
  "payment_method_options": {},
  "payment_method_types": [
    "card"
  ],
  "receipt_email": null,
  "review": null,
  "setup_future_usage": null,
  "shipping": null,
  "statement_descriptor": null,
  "statement_descriptor_suffix": null,
  "status": "requires_payment_method",
  "transfer_data": null,
  "transfer_group": null
}
*/
//LIST ALL PAYMNETS
server.get("/", async (req, res, next) => {

  const paymentIntents = await stripe.paymentIntents.list({
    limit: 10,
  });
  
  return res.status(200).json(paymentIntents);
    
});

module.exports = server;