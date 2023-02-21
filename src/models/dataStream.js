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
    enem: {
      values: ["sensor", "switch"],
      message: "{VALUE} is not supported",
    },
  },
  vpin: {
    type: String,
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
  date_created: {
    type: Date,
    default: Date.now(),
  },
});

uniqueValidator(dataStreamSchema);
exports.DataStream = mongoose.model("DataStream", dataStreamSchema);
exports.dataStreamSchema = dataStreamSchema;
