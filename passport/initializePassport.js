const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
// const getUserByEmail = require("./getUser");
const getUserByID = require("./getUserById");
const User = require("../models/userModel");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    // const user = await getUserByEmail(email);
    User.findOne({ email: email }, (err, user) => {
      if (!err) {
        if (!user) {
          return done(null, false, { message: "No user with that email." });
        } else {
          try {
            if (bcrypt.compare(password, user.password)) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          } catch (e) {
            return done(e);
          }
        }
      } else {
        console.log(err);
      }
    });
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((_id, done) => {
    return done(null, getUserByID(_id));
  });
}

module.exports = initialize;
