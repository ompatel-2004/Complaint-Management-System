// require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const router = require("./router/auth-router");
const user_router = require("./router/user-auth-router");
const connectdb = require("./server/utils/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const path = require('path');

// Serve static files from the 'Admin' directory
app.use(express.static(path.join(__dirname,'Admin')));

// Define your routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'Admin', 'adminlogin', 'AdminLogin.html'));
});

app.use(
cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.options("*", cors());
app.use(express.json());

app.use("/", router);
app.use("/", user_router);
// app.use("/api/auth", router);

const PORT = 3000;

// const jwt = require("jsonwebtoken")

// const createToken = async()=>{
//   const token = await jwt.sign({_id:"661625621751e935409bf283"},"This is the secret key for generating token")
//   console.log(token)

//   const userVerification = await jwt.verify(token, "This is the secret key for generating token")

//   console.log(userVerification)
// }

// createToken()


// Set correct MIME type for CSS files
app.get("/AdminLogin.css", (req, res) => {
  res.sendFile(path.join(__dirname, 'Admin','adminlogin' , 'AdminLogin.css'));
});

// Set correct MIME type for JavaScript files
app.get("/AdminValidate.js", (req, res) => {
  res.sendFile(path.join(__dirname, 'Admin','adminlogin' , 'AdminValidate.js'));
});

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
  });
});