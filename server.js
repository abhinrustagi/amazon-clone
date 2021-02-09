const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

const path = require("path");

const mongoose = require("mongoose");

// config vars
require("dotenv").config();

// passport
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./passport/initializePassport");
initializePassport(passport);

// routers
const authRoute = require("./routes/auth/auth");
const updateAddress = require("./routes/user functions/updateAddress");

// express middlewares
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "./client/build")));

// mongoose connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection established to the database.");
});

// routes

app.use("/auth", authRoute);

app.use("/users", updateAddress);

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// app.post("/payments/create", async (req, res) => {
//   const total = req.query.total;
//   console.log("Payment request received.", total);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total,
//     currency: "usd",
//     description: "Software Development Project",
//   });

//   var customer = await stripe.customers.create({
//     name: "Jenny Rosen",
//     address: {
//       line1: "510 Townsend St",
//       postal_code: "98140",
//       city: "San Francisco",
//       state: "CA",
//       country: "US",
//     },
//   });

//   console.log(paymentIntent.client_secret);
//   res.status(201).send({ clientSecret: paymentIntent.client_secret });
// });

app.listen(process.env.PORT || 8888, () => {
  console.log("Server started on port.");
});
