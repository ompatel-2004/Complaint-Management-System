const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ClassSchema = new mongoose.Schema({
  classNumber: {
    type: Number,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  floorNumber: {
    type: Number, // Reference to the Floor model
    ref: "Floor", // Name of the referenced model
    required: true,
  },
});

// define the model or the collection name.
const Class = new mongoose.model("Class", ClassSchema);
module.exports = Class;
