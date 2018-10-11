"use strict";
const stripeSecretKey = require("../config.js").stripeSecretKey;
const stripe = require("stripe")(stripeSecretKey);

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  // Payment information (from Stripe Checkout)
  const token = requestBody.token.id;
  const email = requestBody.token.email;

  // Order information
  const currency = requestBody.order.currency;
  const items = requestBody.order.items;
  const shipping = requestBody.order.shipping;

  // Create order
  return stripe.orders
    .create({
      currency: currency,
      items: items,
      shipping: shipping,
      email: email
    })
    .then((order) => {
      // Pay order with received token (from Stripe Checkout)
      return stripe.orders
        .pay(order.id, {
          source: token // obtained with Stripe.js
        })
        .then((order) => {
          const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
              message: `Order processed succesfully!`,
              order
            })
          };
          return response;
        });
    })
    .catch((err) => {
      // Error response
      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          error: err.message
        })
      };
      return response;
    });
};
