// require dependencies
// Read and set any environment variables with the dotenv package
require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

//requires the content in the models folder
const db = require("/models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// host static files so CSS and js files can be retreived
app.use(express.static("public"));

// Connecting to Mongo Atlas (running databse in the cloud)
// workoutdb database
const databaseUrl = `mongodb+srv://sareronald:${encodeURIComponent(
  process.env.MONGO_PWD
)}@primarycluster0.sxdap.mongodb.net/workoutdb`;

mongoose.connect(databaseUrl, { useNewUrlParser: true });

// Routes
// ================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});

// Middleware
// ================

// Start the Server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
