// Read and set any environment variables with the dotenv package
require("dotenv").config();
// require dependencies
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

//requires the content in the models folder
const { Workout } = require("./models");
const { parse } = require("path");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// host static files so CSS and js files can be retreived
app.use(express.static("public"));

// Connecting to Mongo Atlas (running databse in the cloud)
// workoutdb database
// const databaseUrl = `mongodb+srv://sareronald:${encodeURIComponent(
//   process.env.MONGO_PWD
// )}@primarycluster0.sxdap.mongodb.net/workoutdb`;
// mongoose.connect(databaseUrl, { useNewUrlParser: true });

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Routes
// ================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// Middleware
// ================

// GET information about existing workouts (for /workouts page)
app.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET workout stats (for /range page)
app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST a new workout - generate the workout
app.post("/api/workouts", ({ body }, res) => {
  const workout = new Workout(body);

  Workout.create(workout)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// UPDATE workouts on MongoAtlas by _id value - edit it and add another exercise to the workout
app.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        exercises: {
          type: req.body.type,
          name: req.body.name,
          duration: req.body.duration,
          distance: req.body.distance,
          weight: req.body.weight,
          reps: req.body.reps,
          sets: req.body.sets,
        },
      },
      // https://docs.mongodb.com/manual/reference/operator/update/inc/
      $inc: { totalDuration: req.body.duration },
    }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Start the Server
// ================
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
