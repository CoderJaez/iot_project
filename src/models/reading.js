const mongoose = require("mongoose");

const readingSchema = mongoose.Schema({
  temperature: {
    type: Number,
    required: [true, "The {path} value is required"],
  },
  ammoania: {
    type: Number,
    required: [true, "The {path} value is required"],
  },
  hardwareModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HardwareModule",
    required: [true, `The {path} is required`],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});
