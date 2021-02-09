const User = require("../../models/userModel");
const { use } = require("./auth");

const validateNewUser = async (userdata) => {
  if (userdata.password != userdata.password2) {
    return { message: "Passwords do not match", valid: false };
  }

  if (
    await User.findOne({ email: userdata.email }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (user != null) {
          return true;
        }
      }
    })
  ) {
    return { message: "User exists", valid: false };
  }

  if (
    await User.findOne({ phone: userdata.phone }, (err, user) => {
      if (err) {
        console.log(err);
      }
      if (user != null) {
        return true;
      }
    })
  ) {
    return {
      message: "Another account already linked with this phone number.",
      valid: false,
    };
  }

  return { message: "valid", valid: true };
};

module.exports = validateNewUser;
