"use strict";
const stripeSecretKey = require("../config.js").stripeSecretKey;
const stripe = require("stripe")(stripeSecretKey);

// retrieve a list of 10 product skus
module.exports.handler = async (event, context) => {
  let response;

  try {
    // quick and dirty solution. Might be worth redoing with observables
    let products = await stripe.products.list({ limit: 1000 });
    let skus = await stripe.skus.list({ limit: 10000 });

    // create the response
    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        products: products.data,
        skus: skus.data
      })
    };
  } catch (error) {
    // create error response
    response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        error: error.message
      })
    };
  }

  // send response
  return response;
};
