const express = require("express");
const router = express.Router();
const userauthcontrollers = require("../server/controllers/user-auth-controllers");
// const { authenticateToken } = require('../middleware/authenticate');
const {authenticateToken} = require("../server/middleware/authenticate")
const {generateToken} = require("../server/controllers/auth")
const dotenv = require('dotenv');

dotenv.config()

router.route("/").get(userauthcontrollers.home);

router.post("/userRegister", userauthcontrollers.userRegister)
router.post("/userRegister1", userauthcontrollers.userRegister1)
router.post("/UserLogin", userauthcontrollers.userLogin)
router.get("/showAllUsers", userauthcontrollers.showAllUsers)

router.post("/UserAddComplaint", userauthcontrollers.getAllUserAddComplaints);
router.get(
  "/showAllUserAddComplaints",
  userauthcontrollers.showAllUserAddComplaints
);
router.put("/updateComplaint/:AddComplaintID", userauthcontrollers.updateComplaint)
router.delete("/removeComplaint/:AddComplaintID", userauthcontrollers.removeComplaint)

router.post("/inchargeLogin",userauthcontrollers.inchargeLogin)

// Protected route
router.get('/protected-route', authenticateToken, (req, res) => {
  // Access user info from req.user
  res.json({ message: 'Protected route accessed', user: req.user });
});

router.post('/logins', async (req, res) => {
  try {
    // Your login logic goes here...
    
    // If login successful, generate JWT token
    const token = generateToken({ username: req.body.username, role: 'incharge' });

    // Send token in response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
