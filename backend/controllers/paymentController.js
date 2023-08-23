const catchasyncError = require("../middleware/catchasyncerror");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchasyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Cartzone",
    },
  });

  res
    .status(200)
    .json({ success:true ,clientSecret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchasyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});