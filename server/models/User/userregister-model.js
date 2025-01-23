const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true, 
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{
    token:{
      type: String,
      required: true,
    }
  }]
});


userRegisterSchema.methods.generateAuthToken = async function() {
  try{
    console.log(this._id)
    const token = jwt.sign({_id:this._id.toString()}, "My name is harsh Mehta studying in Bscit.")
    // this.tokens = this.tokens.concat({token})
    this.tokens = this.tokens.concat({token: token})
    await this.save()
    // console.log(token)
  } catch(error){
    res.send("The error part " + error);
    console.log("The error part " + error);
  }
}

// secure the password with the bcrypt middleware before saving a user to the database.
userRegisterSchema.pre("save", async function (next) {
  // console.log("pre method", this);
  const UserRegister = this;

  if (!UserRegister.isModified("password")) {
    next();
  }

  try {
    const SaltBound = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(UserRegister.password, SaltBound);
    UserRegister.password = HashedPassword;
  } catch (error) {
    next(error);
  }
});

// define the model or the collection name.
const UserRegister = new mongoose.model("UserRegister", userRegisterSchema);
module.exports = UserRegister;
