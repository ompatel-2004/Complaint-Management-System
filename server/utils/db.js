const { mongoose } = require("mongoose");
const {} = require("../../router/auth-router");
const {} = require("../../router/user-auth-router");
require("dotenv").config();

const URI =
  "mongodb+srv://harshmehta7722:hm1312@cluster0.etv5tqu.mongodb.net/hello?retryWrites=true&w=majority&appName=Cluster0";
// const URI = process.env.URII;

const connectdb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
    // window.location.href = "/floor.html";
  } catch (error) {
    console.error("database connection failed...");
    process.exit(0); // terminate and show error
  }
};

module.exports = connectdb;
