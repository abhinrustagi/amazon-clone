const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
// const getUserByEmail = require("./getUser");
const getUserByID = require("./getUserById");
const User = require("../models/userModel");

const JWTStrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;

require("dotenv").config({ path: "../.env" });

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    // const user = await getUserByEmail(email);
    User.findOne({ email: email }, async (err, user) => {
      if (!err) {
        if (!user) {
          return done(null, false, { message: "No user with that email." });
        } else {
          bcrypt.compare(password, user.password).then((isValid) =>
            isValid
              ? done(null, {
                  name: user.name,
                  email: user.email,
                  address: user.address,
                  phone: user.phone,
                })
              : done(null, false, { message: "Password Incorrect" })
          );
        }
      } else {
        return done(null, false, { message: "Unknown Error" });
      }
    });
  };

  // const opts = {
  //   jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  //   secret: process.env.JWT_SECRET,
  // };

  // passport.use(
  //   "jwt",
  //   new JWTStrategy(opts, (jwt_payload, done) => {
  //     User.findOne({ email: jwt_payload.email }, (err, user) => {
  //       if (err) {
  //         done(null, false);
  //       } else {
  //         if (user) {
  //           console.log(user);
  //         }
  //       }
  //     });
  //   })
  // );

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password", session: "false" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((_id, done) => {
    return done(null, getUserByID(_id));
  });
}

module.exports = initialize;
