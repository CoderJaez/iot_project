const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const {
  insertHardwareModule,
  getHardwareModule,
  putHardwareModule,
} = require("../controllers/hwModuleController");

router.post("/", insertHardwareModule);
router.get("/", getHardwareModule).get("/:id", getHardwareModule);
router.put("/:id", putHardwareModule);

module.exports = router;
