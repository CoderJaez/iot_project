const mongoose = require("mongoose");
const uniqueValidator = require("../validators/uniqueValidator");

const dataStreamSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The {PATH} field is required"],
    unique: true,
  },
  type: {
    type: String,
    required: [true, "The {PATH} field is required"],
  },
  default_value: {
    type: String,
    required: [true, "The {PATH} field is required"],
  },
  hardware: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HardwareModule",
    required: [true, `The {PATH} field is required`],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

uniqueValidator(dataStreamSchema);
exports.DataStream = mongoose.model("DataStream", dataStreamSchema);
exports.dataStreamSchema = dataStreamSchema;
