const router = require("express").Router();
const Product = require("../../models/productModel");

router.get("/home", (req, res) => {
  Product.aggregate([{ $sample: { size: 9 } }], (err, sample) => {
    if (err) {
      res.json({ error: 1, message: "Error connecting to the database." });
    } else {
      res.json({ error: 0, message: "Received", sample });
    }
  });
});

router.post("/search", async (req, res) => {
  await Product.fuzzySearch(req.body.query).then((products) => {
    if (products) {
      res.json({ message: "Successful", error: 0, results: products.slice(5) });
    } else {
      res.json({
        message: "Successful",
        error: 0,
        results: [{ name: "No results found." }],
      });
    }
  });
});

module.exports = router;
