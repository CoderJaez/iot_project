const express = require("express");
const app = express();
const cors = require("cors");
const connectMongoDb = require("./configs/db");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv/config");
const { API_URL } = process.env;

app.use(express.json());

app.use(cors());
app.options("*", cors());
//Routers
const hwItemRoutes = require("./routes/hardwareItems");

//Routes
app.use(`${API_URL}hardwares`, hwItemRoutes);

//Middleware
app.use(errorHandler);

app.listen(3000, connectMongoDb, () => {
  //   connectMongoDb;
  console.log(`server is running http://localhost:3000${API_URL}`);
});
