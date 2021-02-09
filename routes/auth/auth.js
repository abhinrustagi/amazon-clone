const User = require("../../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const checkNotAuthenticated = require("./checkNotAuthenticated");

router.post("/register", checkNotAuthenticated, async (req, res) => {
  if (req.body.password != req.body.password2) {
    res.send({ message: "Passwords do not match", error: 1 });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        res.send({ message: "User exists", error: 1 });
      }
    }
  });

  const password = await bcrypt.hash(req.body.password, 15);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body?.address || null,
    password: password,
  });

  await newUser.save();

  res.send({ message: "Registered", error: 0 });
});

router.post("/login", checkNotAuthenticated, async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(401).json(err);
    }
    if (user) {
      res.json(user);
    } else {
      res.json(info);
    }
  })(req, res);
});

module.exports = router;
