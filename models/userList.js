const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userID: String,
  wishlist: [Object],
  cart: [Object],
  orderHistory: [Object],
});

module.exports = mongoose.model("userLists", userSchema, "userList");
