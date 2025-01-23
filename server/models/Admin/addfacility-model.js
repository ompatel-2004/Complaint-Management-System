const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const FacilitySchema = new mongoose.Schema({
  facilityNumber: {
    type: Number,
    required: true,
  },
  facilityName: {
    type: String,
    required: true,
  },
  categoryNumber: {
    type: Number, // Reference to the Category model
    ref: "Category", // Name of the referenced model
    required: true,
  },
});

// define the model or the collection name.
const Facility = new mongoose.model("Facility", FacilitySchema);
module.exports = Facility;
