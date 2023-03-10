const express = require("express");
const app = express();
const cors = require("cors");
const connectMongoDb = require("./configs/db");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
require("dotenv/config");
const { API_URL, PORT } = process.env;

app.use(express.json());

app.use(cors());
app.options("*", cors());

//Routers
const hwModules = require("./routes/hardwareModules");
const dataStreams = require("./routes/dataStreams");
const tempThresholds = require("./routes/tempThresholds");
const readings = require("./routes/readings");
const tempReadings = require("./routes/tempReadings");
//Routes
app.use(`${API_URL}devices`, hwModules);
app.use(`${API_URL}data-streams`, dataStreams);
app.use(`${API_URL}temp-thresholds`, tempThresholds);
app.use(`${API_URL}readings`, readings);
app.use(`${API_URL}temp-readings`, tempReadings);

//Middleware
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, connectMongoDb, () => {
  //   connectMongoDb;
  console.log(`server is running http://localhost:${PORT}/${API_URL}`);
});
