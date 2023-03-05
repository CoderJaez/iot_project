const express = require("express");
const router = express.Router();
const {
  insertReading,
  getReading,
  updateReading,
  deleteReading,
} = require("../controllers/readingsController");

router
  .get("/", getReading)
  .get("/:id", getReading)
  .post("/", insertReading)
  .put("/:id", updateReading)
  .delete("/:id", deleteReading);

module.exports = router;
