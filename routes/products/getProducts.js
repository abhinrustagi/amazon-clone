const router = require("express").Router();
const Product = require("../../models/productModel");

require("dotenv").config({ path: "../../.env" });

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.get("/home", (req, res) => {
  Product.aggregate([{ $sample: { size: 7 } }], (err, sample) => {
    if (err) {
      res.json({ error: 1, message: "Error connecting to the database." });
    } else {
      res.json({ error: 0, message: "Received", sample });
    }
  });
});

router.post("/search", (req, res) => {
  const regex = new RegExp(escapeRegex(req.body.query), "gi");
  Product.find({ name: regex }, (err, docs) => {
    if (err) {
      res.json({ message: "There was an error.", error: 1 });
    } else {
      if (docs) {
        res.json({ message: "Successful", error: 0, results: docs.slice(5) });
      } else {
        res.json({
          message: "Successful",
          error: 0,
          results: [{ name: "No results found." }],
        });
      }
    }
  });
});

module.exports = router;
