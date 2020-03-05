const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connection to database successful")
);

//import routes
const authRoute = require("./routes/auth");

const app = express();

app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server running and up"));
