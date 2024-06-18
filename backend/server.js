const express = require("express");
const env = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const app = express();
env.config();
const connectDb = require("./dbConnection/dbConnection");
// const { router: statisticsRoutes } = require("./routes/statisticsRoutes.js")

const statisticsRoutes = require("./routes/statisticsRoutes");

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api", statisticsRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server Running on port ${PORT}`);
});
