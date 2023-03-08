const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.query);
  return res.status(200).send("OK");
});

module.exports = router;
