function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return { message: "Logged In" };
  }
  next();
}

module.exports = checkNotAuthenticated;
