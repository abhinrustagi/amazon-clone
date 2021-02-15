function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("Yes");
    res.json({ message: "Logged In" });
  }
  next();
}

module.exports = checkNotAuthenticated;
