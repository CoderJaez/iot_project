const mongoose = require("mongoose");
const uniqueValidator = require("../validators/uniqueValidator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "{PATH} is required"],
  },
  email: {
    type: String,
    required: [true, "{PATH} is required"],
    uniquie: true,
  },
  password: {
    required: String,
    required: [true, "{PATH} is required"],
    min: [8, "{PATH} must at least {VAUE} characters"],
  },
});

uniqueValidator(userSchema, "{PATH} is already exist");

exports.User = mongoose.model("User", userSchema);
