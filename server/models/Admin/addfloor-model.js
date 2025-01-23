const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const floorSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true,
  },
  floorName: {
    type: String,
    required: true,
  },
});

// define the model or the collection name.
const Floor = new mongoose.model("Floor", floorSchema);
module.exports = Floor;
