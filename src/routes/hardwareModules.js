const express = require("express");
const router = express.Router();
const {
  insertHardwareModule,
  getHardwareModule,
  putHardwareModule,
  deleteHardwareModule,
  deleteManyHardwareModule,
} = require("../controllers/hwModuleController");

router
  .post("/", insertHardwareModule)
  .get("/", getHardwareModule)
  .get("/:id", getHardwareModule)
  .put("/:id", putHardwareModule)
  .post("/delete_hardwares", deleteManyHardwareModule)
  .delete("/:id", deleteHardwareModule);

module.exports = router;
