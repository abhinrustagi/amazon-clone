const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");

const productSchema = new Schema({
  name: String,
  price: Number,
  img: String,
  rating: Number,
  desc: [String],
});

productSchema.plugin(mongooseFuzzySearching, { fields: ["name"] });

module.exports = mongoose.model("product", productSchema, "product");
