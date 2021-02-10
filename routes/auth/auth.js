const User = require("../../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const checkNotAuthenticated = require("./checkNotAuthenticated");
const jwt = require("jsonwebtoken");
const checkUserValid = require("./newProfileCheck");

require("dotenv").config({ path: "../../" });

router.post("/register", checkNotAuthenticated, async (req, res) => {
  const check = await checkUserValid(req.body);
  if (check.valid) {
    const password = await bcrypt.hash(req.body.password, 15);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body?.address || null,
      password: password,
    });

    await newUser.save();

    res.json({
      message: "Registered",
      error: 0,
      user: {
        name: req.body.name,
        email: req.body.email,
        address: req.body?.address || null,
        phone: req.body.phone,
      },
    });
  } else {
    res.json({ ...check, error: 1 });
  }
});

router.post("/login", checkNotAuthenticated, async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(401).json({ err, success: false });
    }
    if (user) {
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.json({ err, success: false });
        } else {
          jwt.sign(
            { ...user },
            process.env.JWT_SECRET,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              if (err) {
                res.json({ success: false, err });
              }
              res.json({ success: true, token });
            }
          );
        }
      });
    } else {
      res.json({ success: false, message: "Password Incorrect" });
    }
  })(req, res);
});

router.get("/login", checkNotAuthenticated, async (req, res) => {});

module.exports = router;
