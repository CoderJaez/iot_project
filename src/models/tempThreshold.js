const mongoose = require("mongoose");
const uniqueValidator = require("../validators/uniqueValidator");

const tempThresholdSchema = mongoose.Schema({
  name: {
    type: String,
    uniquie: true,
    required: [true, "The {PATH} is required."],
  },
  value: {
    type: Number,
    required: [true, "The {PATH} is required."],
  },
  label: {
    type: String,
    uniquie: true,
    required: [true, "The {PATH} is required."],
    enum: {
      values: ["LOW", "NORMAL", "WARNING", "CRITICAL"],
      message: "The {VALUE} is not supported",
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

uniqueValidator(tempThresholdSchema);
exports.TempThreshold = mongoose.model("TempThreshold", tempThresholdSchema);
