const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create a new schema
const WorkoutSchema = new Schema({
  type: String,
  name: String,
  duration: Number,
  distance: Number,
  weight: Number,
  reps: Number,
  sets: Number,
});

// do I need to add type: Date, default: Date.now ?

const Workout = mongoose.model("Workout", WorkoutSchema);

module.export = Workout;
