const mongoose = require("mongoose");
const User = require("../models/userModel");

const getUserById = (id) => {
  User.findById(id, (err, user) => {
    if (!err) {
      if (user) {
        return user;
      } else {
        return false;
      }
    } else {
      console.log(err);
    }
  });
};

module.exports = getUserById;
