const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_KEY);

// STRIPE CONNECTION
const payment = async (req, res,next) => {
    const { price } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(price),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    });
}

module.exports = payment
