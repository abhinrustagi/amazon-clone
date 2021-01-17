const app = require("express")();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request received.", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    description: "Software Development Project",
  });

  var customer = await stripe.customers.create({
    name: "Jenny Rosen",
    address: {
      line1: "510 Townsend St",
      postal_code: "98140",
      city: "San Francisco",
      state: "CA",
      country: "US",
    },
  });

  console.log(paymentIntent.client_secret);
  res.status(201).send({ clientSecret: paymentIntent.client_secret });
});

app.listen(process.env.PORT || 5001, () => {
  console.log("Server started on port.");
});
