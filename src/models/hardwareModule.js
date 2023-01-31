const mongoose = require("mongoose");
const EncryptKey = require("../utils/encryptKey");
const hardwareModuleSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    unique: [true, "Name must be unique."],
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

exports.HardwareModule = mongoose.model("HardwareModule", hardwareModuleSchema);
exports.hardwareModuleSchema = hardwareModuleSchema;
