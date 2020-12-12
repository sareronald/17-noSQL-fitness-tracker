const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create a new schema
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Indicate the type of training.",
      },
      name: {
        type: String,
        trim: true,
        required: "Enter a name for your workout.",
      },
      duration: {
        type: Number,
        required: "Length of your workout",
      },
      distance: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
    },
  ],
  totalDuration: {
    type: Number,
    default: 0,
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
