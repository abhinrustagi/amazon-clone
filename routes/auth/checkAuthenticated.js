function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  return res.redirect("/");
}

module.exports = checkAuthenticated;
