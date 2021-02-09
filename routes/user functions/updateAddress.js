const router = require("express").Router();
const User = require("../../models/userModel");
const checkAuthenticated = require("../auth/checkAuthenticated");

router.post("/updateAddress", checkAuthenticated, (req, res) => {
  User.updateOne(
    { email: req.body.email },
    { address: req.body.address },
    (err, docs) => {
      if (err) {
        res.json({ success: false, message: "There was an error." });
      } else {
        res.json({ success: true, message: "Completed." });
      }
    }
  );
});

module.exports = router;
