const mongoose = require("mongoose");
const EncryptKey = require("../utils/encryptKey");
const hardwareItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    unique: true,
  },
  assigned_cage: {
    type: String,
    required: [true, "Assigned cage is required"],
  },
  auth_key: {
    type: String,
    default: EncryptKey,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

exports.HardwareItem = mongoose.model("HardwareItem", hardwareItemSchema);
exports.hardwareItemSchema = hardwareItemSchema;
