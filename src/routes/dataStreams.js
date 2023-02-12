const express = require("express");
const router = express.Router();

const {
  getDataStream,
  insertDataStream,
  putDataStrem,
  deleteDataStream,
} = require("../controllers/dataStreamController");

router
  .get("/", getDataStream)
  .get("/:id", getDataStream)
  .post("/", insertDataStream)
  .put("/:id", putDataStrem)
  .delete("/:id", deleteDataStream);

module.exports = router;
