const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserAddComplaintSchema = new mongoose.Schema({
  addComplaintNumber: {
    type: Number,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  floorNumber: {
    type: Number, // Reference to the Floor model
    ref: "Floor", // Name of the referenced model
    required: true,
  },
  classNumber: {
    type: Number, // Reference to the Class model
    ref: "Class", // Name of the referenced model
    required: true,
  },
  categoryNumber: {
    type: Number, // Reference to the Category model
    ref: "Category", // Name of the referenced model
    required: true,
  },
  facilityNumber: {
    type: Number, // Reference to the Category model
    ref: "Facility", // Name of the referenced model
    required: true,
  },
  addComplaintDescription: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
    // it is optional so no need for required here
    default: "",
  },
  report: {
    type: String,
    required: true,
    default: "Pending",
  },
});

// define the model or the collection name.
const UserAddComplaint = new mongoose.model(
  "UserAddComplaint",
  UserAddComplaintSchema
);
module.exports = UserAddComplaint;
