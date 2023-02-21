const mongoose = require("mongoose");
require("dotenv/config");
const { DEV_URI_DB, URI_DB } = process.env;

const connection = mongoose
  .connect(URI_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connection is ready from cloud.");
  })
  .catch((err) => console.error("ERROR: ", err.message));

module.exports = connection;
