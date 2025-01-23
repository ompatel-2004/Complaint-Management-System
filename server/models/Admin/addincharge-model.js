const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const InchargeSchema = new mongoose.Schema({
  inchargeNumber: {
    type: Number,
    required: true,
  },
  floorNumber: {
    type: Number, // Reference to the Floor model
    ref: "Floor", // Name of the referenced model
    required: true,
  },
  username: {
    type: String, // Reference to the userregister model
    ref: "UserRegister", // Name of the referenced model
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// secure the password with the bcrypt middleware before saving a user to the database.
InchargeSchema.pre("save", async function (next) {
  // console.log("pre method", this);
  const Incharge = this;

  if (!Incharge.isModified("password")) {
    next();
  }

  try {
    const SaltBound = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(Incharge.password, SaltBound);
    Incharge.password = HashedPassword;
  } catch (error) {
    next(error);
  }
});

// define the model or the collection name.
const Incharge = new mongoose.model("Incharge", InchargeSchema);
module.exports = Incharge;
