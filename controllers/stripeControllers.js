const { v4: uuidv4 } = require('uuid');


const payment = (req, res, next) => {
    console.log(req.body.token);
    const { token, amount } = req.body;
    const idempotencytoken = uuidv4();

    return Stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: "Comfy Sloth Store",
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempotencytoken })
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(400)
        console.log(err);
    })
}

module.exports = payment