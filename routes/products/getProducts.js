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
  await Product.fuzzySearch(req.body.query, "name", (err, products) => {
    if (err) {
      res.json({
        message: "Error connecting to the database.",
        error: 1,
        results: [{ name: "Error Connecting to the database." }],
      });
    } else {
      if (products) {
        res.json({ message: "Successful", error: 0, results: products });
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

router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      res.json({
        message: "Database Error.",
        error: 1,
        results: [{ name: "Error connecting to the database." }],
      });
    } else {
      if (product) {
        res.json({ message: "Successful", error: 0, results: product });
      } else {
        res.json({
          message: "No Product Found",
          error: 0,
          results: [{ name: "No Product found." }],
        });
      }
    }
  });
});

module.exports = router;
