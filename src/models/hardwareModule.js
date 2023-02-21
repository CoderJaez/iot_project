const mongoose = require("mongoose");
const uniqueValidator = require("../validators/uniqueValidator");
const generateUniqueId = require("../utils/deviceId");
const EncryptKey = require("../utils/encryptKey");
const hardwareModuleSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    unique: true,
  },
  deviceId: {
    type: String,
    default: generateUniqueId,
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

uniqueValidator(hardwareModuleSchema);

exports.HardwareModule = mongoose.model("HardwareModule", hardwareModuleSchema);
exports.hardwareModuleSchema = hardwareModuleSchema;
