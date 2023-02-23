const express = require("express");
const router = express.Router();
const {
  insertReading,
  getReading,
} = require("../controllers/readingsController");

router.get("/", getReading).get("/:id", getReading).post("/", insertReading);

module.exports = router;
