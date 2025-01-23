const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminRegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

// secure the password with the bcrypt middleware before saving a user to the database.
AdminRegisterSchema.pre("save", async function (next) {
  // console.log("pre method", this);
  const AdminRegister = this;

  if (!AdminRegister.isModified("password")) {
    next();
  }

  try {
    const SaltBound = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(AdminRegister.password, SaltBound);
    AdminRegister.password = HashedPassword;
  } catch (error) {
    next(error);
  }
});

// define the model or the collection name.
const AdminRegister = new mongoose.model("AdminRegister", AdminRegisterSchema);
module.exports = AdminRegister;


   






