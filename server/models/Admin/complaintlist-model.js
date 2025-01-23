const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ComplaintListSchema = new mongoose.Schema({
  username: {
    type: String, // Reference to the UserAddComplaint model
    ref: "UserAddComplaint", // Name of the referenced model
    required: true,
  },
  addcomplaintNumber: {
    type: Number, // Reference to the UserAddComplaint model
    ref: "UserAddComplaint", // Name of the referenced model
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
    type: String, // Reference to the UserAddComplaint model
    ref: "UserAddComplaint", // Name of the referenced model
    required: true,
  },
  note: {
    type: String, // Reference to the UserAddComplaint model
    ref: "UserAddComplaint", // Name of the referenced model
    required: false,
  },
  report: {
    type: String, // Reference to the UserAddComplaint model
    ref: "UserAddComplaint", // Name of the referenced model
    required: true,
  },
});

// define the model or the collection name.
const ComplaintList = new mongoose.model("ComplaintList", ComplaintListSchema);
module.exports = ComplaintList;
