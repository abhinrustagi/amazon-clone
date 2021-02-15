function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("Yes");
    next();
  }
  res.redirect("/");
}

module.exports = checkAuthenticated;
