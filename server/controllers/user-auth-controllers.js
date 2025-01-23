const UserRegister = require("../models/User/userregister-model");
// const UserLogin = require("../models/User/userlogin-model");
const UserAddComplaint = require("../models/User/addcomplaint-model");
const Floor = require("../models/Admin/addfloor-model");
const Category = require("../models/Admin/addcategory-model");
const Facility = require("../models/Admin/addfacility-model");
const Incharge = require("../models/Admin/addincharge-model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const home = async (req, res) => {
  try {
    res.status(200).send("Hello World using router");
  } catch (error) {
    console.log(error);
  }
};

const userRegister = async (req, res) => {
  try {
    // console.log(req.body);
    const {
      username,
      email,
      phone,
      gender,
      password
    } = req.body;

    console.log(req.body);
    const UserExist = await UserRegister.findOne({
      username
    });

    if (UserExist) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUserRegister = await UserRegister.create({
      username,
      email,
      phone,
      gender,
      password
    });
    res.status(201).json({
      msg: "User added successfully",
      User: newUserRegister,
    });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const userRegister1 = async (req, res) => {
  try {
    // console.log(req.body);
    const {
      username,
      email,
      phone,
      gender,
      password
    } = req.body;

    console.log(req.body);
    const UserExist = await UserRegister.findOne({
      username
    });

    if (UserExist) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUserRegister = await UserRegister.create({
      username,
      email,
      phone,
      gender,
      password
    });

    const token = await newUserRegister.generateAuthToken()

    res.status(201).json({
      msg: "User added successfully",
      User: newUserRegister,
    });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const showAllUsers1 = async (req, res) => {
  try {
    // Fetch all floors from the database
    const users = await UserRegister.find({username}, "username")

    // Send the floors as JSON response
    res.status(200).json(users);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const showAllUsers = async (req, res) => {
  try {
    // Fetch all complaints from the database
    const users = await UserRegister.find(
      {}
    ); // Assuming UserAddComplaint model has addComplaintNumber and floorNumber and categoryNumber and addComplaintDescription fields
    console.log(users)
    // Send the Facility as JSON response
    res.status(200).json(users);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// const userLogin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if the user exists in the UserRegister table
//     const user = await UserRegister.findOne({ username });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     // Now, compare the entered password with the hashed password stored in the database
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid password" });
//     }

//     // If both username and password are correct, return success message
//     return res.status(200).json({ msg: "User login successfully" });

//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// }

// Login route
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await UserRegister.findOne({ username });

    // If user does not exist, return error
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id.toString() }, "My name is harsh Mehta studying in Bscit.");

    // Add token to user's tokens array
    user.tokens = user.tokens.concat({ token });
    await user.save();
    console.log(token)
    // Return token and user data
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllUserAddComplaints = async (req, res) => {
  try {
    // console.log(req.body);
    const {
      addComplaintNumber,
      email,
      floorNumber,
      classNumber,
      categoryNumber,
      facilityNumber,
      addComplaintDescription,
      note,
      report,
    } = req.body;

    console.log(req.body);
    const UserAddComplaintExist = await UserAddComplaint.findOne({
      addComplaintNumber,
    });

    if (UserAddComplaintExist) {
      return res.status(400).json({ msg: "UserAddComplaint already exists" });
    }
    const newUserAddComplaint = await UserAddComplaint.create({
      addComplaintNumber,
      email,
      floorNumber,
      classNumber,
      categoryNumber,
      facilityNumber,
      addComplaintDescription,
      note,
      report,
    });
    res.status(201).json({
      msg: "UserAddComplaint added successfully",
      UserAddComplaint: newUserAddComplaint,
    });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const showAllUserAddComplaints = async (req, res) => {
  try {
    // Fetch all complaints from the database
    const UserAddComplaints = await UserAddComplaint.find(
      {}
    ); // Assuming UserAddComplaint model has addComplaintNumber and floorNumber and categoryNumber and addComplaintDescription fields
    console.log(UserAddComplaints)
    // Send the Facility as JSON response
    res.status(200).json(UserAddComplaints);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching UserAddComplaints:", error);
    res.status(500).json({ error: "Failed to fetch UserAddComplaints" });
  }
};

const updateComplaint = async (req, res) => {
  const {AddComplaintID} = req.params;
  const {addComplaintNumber,
    email,
    floorNumber,
    classNumber,
    categoryNumber,
    facilityNumber,
    addComplaintDescription,
    note,
    report,} = req.body;
  try{
    const updateAddComplaint = await UserAddComplaint.findByIdAndUpdate(
      AddComplaintID,
      {addComplaintNumber,
        email,
        floorNumber,
        classNumber,
        categoryNumber,
        facilityNumber,
        addComplaintDescription,
        note,
        report,},
      {new:true}
    );

    if(!updateAddComplaint){
        return res.status(404).json({message : "No usercomplaint with this id was found."});
    }
    res.status(200).json({message : "Complaint Updated Succesfully",updateAddComplaint});
  }catch(error){
    console.error("Error updating Complaints" , error)
    res.status(500).json({message : "Internal server error."});
  }
}

const removeComplaint = async (req, res) => {
  const {AddComplaintID}=req.params;
  try{
    const removeAddComplaint = await UserAddComplaint.findByIdAndDelete(AddComplaintID)

    if(!removeAddComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully!" });
  } catch (error) {
      console.error("Error removing Complaint:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const inchargeLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the UserRegister table
    const incharge = await Incharge.findOne({ username });

    if (!incharge) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Now, compare the entered password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, incharge.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // If both username and password are correct, return success message
    return res.status(200).json({ msg: "Incharge login successfully"});

  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ msg: "Internal server error" });
  }
}




module.exports = {
  home,
  userRegister,
  userRegister1,
  showAllUsers,
  userLogin,
  getAllUserAddComplaints,
  showAllUserAddComplaints,
  updateComplaint,
  removeComplaint,
  inchargeLogin,
};
