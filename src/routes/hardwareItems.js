const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const {
  insertHardwarItem,
  getHardwareItem,
} = require("../controllers/hwItemController");

router.post("/", insertHardwarItem);
router.get("/", getHardwareItem);

module.exports = router;
