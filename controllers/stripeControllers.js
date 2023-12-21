const { v4: uuidv4 } = require('uuid');


const payment = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: req.body.items.map(item => {
            const storeItem = storeItems.get(item.id);
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: storeItem.name,
                },
                unit_amount: storeItem.priceInCents,
              },
              quantity: item.quantity,
            };
          }),
          success_url: `http://127.0.0.1:5500/client/success.html`,
          cancel_url: `http://127.0.0.1:5500/client/cancel.html`,  // Removed extra $ character
        });
        res.json({ url: session.url });
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
}

module.exports = payment