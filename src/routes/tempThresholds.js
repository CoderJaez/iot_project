const express = require("express");
const router = express.Router();
const {
  getThreshold,
  insertThreshold,
  putThreshold,
  deleteThreshold,
} = require("../controllers/configs/tempThresholdController");

router
  .post("/", insertThreshold)
  .get("/", getThreshold)
  .get("/:id", getThreshold)
  .put("/:id", putThreshold)
  .delete("/:id", deleteThreshold);

module.exports = router;
