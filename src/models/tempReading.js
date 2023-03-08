const mongoose = require("mongoose");

const readingSchema = mongoose.Schema({
  temperature: {
    type: Number,
    required: [true, "The {PATH} value is required"],
  },
  ammonia: {
    type: Number,
    required: [true, "The {PATH} value is required"],
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HardwareModule",
    required: [true, `The {PATH} is required`],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.TempReading = mongoose.model("TempReading", readingSchema);
