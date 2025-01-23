const AdminRegister = require("../models/Admin/adminregister-model.js");
// const User = require("../models/user-model");
const Floor = require("../models/Admin/addfloor-model.js");
const Class = require("../models/Admin/addclass-model");
const Category = require("../models/Admin/addcategory-model");
const Facility = require("../models/Admin/addfacility-model");
const UserAddComplaint = require("../models/User/addcomplaint-model");
const Incharge = require("../models/Admin/addincharge-model");
const bcrypt = require("bcryptjs");

const adminRegister = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;

    console.log(req.body);
    const AdminExist = await AdminRegister.findOne({
      username
    });

    if (AdminExist) {
      return res.status(400).json({ msg: "Admin already exists" });
    }
    const newAdminRegister = await AdminRegister.create({
      username,
      password
    });
    res.status(201).json({
      msg: "Admin added successfully",
      Admin: newAdminRegister,
    });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;

    const adminExist = await AdminRegister.findOne({ username });

    if (adminExist) {
      return res.status(400).json({ msg: "admin already exist" });
    }
    const newAdmin = await AdminRegister.create({ username, password });

    res.status(201).json({ msg: "Admin added successfully", admin: newAdmin });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the admin exists in the UserRegister table
    const admin = await AdminRegister.findOne({ username });

    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    // Now, compare the entered password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // If both username and password are correct, return success message
    return res.status(200).json({ msg: "Admin login successfully" });

  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ msg: "Internal server error" });
  }
}

// const home = async (req, res) => {
//   try {
//     res.status(200).send("Hello World using router");
//   } catch (error) {
//     console.log(error);
//   }
// };

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exist" });
    }

    // hash the password
    // const SaltBound = 10;
    // const HashedPassword = await bcrypt.hash(password, SaltBound);

    const UserCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({ msg: UserCreated });
  } catch (error) {
    res.status(400).json("internal server error");
  }
};

const getAllFloors = async (req, res) => {
  try {
    // console.log(req.body);
    const { floorNumber, floorName } = req.body;

    const floorExist = await Floor.findOne({ floorNumber });

    if (floorExist) {
      return res.status(400).json({ msg: "floor already exist" });
    }
    const newFloor = await Floor.create({ floorNumber, floorName });

    // const FloorCreated = await Floor.create({
    //   floorNumber,
    //   floorName,
    // });
    res.status(201).json({ msg: "Floor added successfully", floor: newFloor });
    // res.status(201).json({ msg: FloorCreated });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const showAllFloors = async (req, res) => {
  try {
    // Fetch all floors from the database
    const floors = await Floor.find({}, "floorNumber floorName"); // Assuming Floor model has floorNumber and floorName fields

    // Send the floors as JSON response
    res.status(200).json(floors);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching floors:", error);
    res.status(500).json({ error: "Failed to fetch floors" });
  }
};

// Function to handle updating a floor
const updateFloor = async (req, res) => {
  const { floorId } = req.params;
  const { floorNumber, floorName } = req.body;

  try {
    // Find the floor by ID
    const floor = await Floor.findById(floorId);

    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    // Update floor details
    floor.floorNumber = floorNumber;
    floor.floorName = floorName;

    // Save the updated floor
    await floor.save();

    res.status(200).json({ message: "Floor updated successfully", floor });
  } catch (error) {
    console.error("Error updating floor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFloor = async (req, res) => {
  const { floorId } = req.params;

  try {
    // Find the Floor by ID and remove it
    const removedFloor = await Floor.findByIdAndDelete(floorId);

    if (!removedFloor) {
      return res.status(404).json({ error: "Floor not found" });
    }

    res.status(200).json({ message: "Floor removed successfully" });
  } catch (error) {
    console.error("Error removing floor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllClasses = async (req, res) => {
  try {
    // console.log(req.body);
    const { classNumber, className, floorNumber } = req.body;

    console.log(req.body);
    const classExist = await Class.findOne({ classNumber });

    if (classExist) {
      return res.status(400).json({ msg: "Class already exists" });
    }
    const newClass = await Class.create({
      classNumber,
      className,
      floorNumber,
    });
    res.status(201).json({ msg: "Class added successfully", class: newClass });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const showAllClasses = async (req, res) => {
  try {
    // Fetch all classs from the database
    const classes = await Class.find({}, "classNumber className floorNumber"); // Assuming class model has classNumber and className and floorNumberfields

    // Send the classs as JSON response
    res.status(200).json(classes);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};
const showAllClasses1 = async (req, res) => {
  try {
    const { floorNumber } = req.params;
    // Fetch all classs from the database
    const classes = await Class.find(
      { floorNumber },
      "classNumber className floorNumber"
    ); // Assuming class model has classNumber and className and floorNumberfields

    // Send the classs as JSON response
    res.status(200).json(classes);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};

const updateClass = async (req, res) => {
  const { classId } = req.params;
  const { classNumber, className, floorNumber } = req.body;

  try {
    // Find the class by ID
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { classNumber, className, floorNumber },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res
      .status(200)
      .json({ message: "Class updated successfully", updatedClass });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeClass = async (req, res) => {
  const { classId } = req.params;

  try {
    // Find the class by ID and remove it
    const removedClass = await Class.findByIdAndDelete(classId);

    if (!removedClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(200).json({ message: "Class removed successfully" });
  } catch (error) {
    console.error("Error removing class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // console.log(req.body);
    const { categoryNumber, categoryName } = req.body;

    const CategoryExist = await Category.findOne({
      categoryNumber,
      categoryName,
    });

    if (CategoryExist) {
      return res.status(400).json({ msg: "Category already exist" });
    }

    const newCategory = await Category.create({ categoryNumber, categoryName });
    res
      .status(201)
      .json({ msg: "Category added successfully", Category: newCategory });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "categoryNumber categoryName");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Function to handle updating a Category
const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryNumber, categoryName } = req.body;

  try {
    // Find the Category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update Category details
    category.categoryNumber = categoryNumber;
    category.categoryName = categoryName;

    // Save the updated Category
    await category.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating Category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeCategory = async (req, res) => {
  const { CategoryId } = req.params;

  try {
    // Find the Category by ID and remove it
    const removedCategory = await Category.findByIdAndDelete(CategoryId);

    if (!removedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category removed successfully" });
  } catch (error) {
    console.error("Error removing Category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllFacilities = async (req, res) => {
  try {
    // console.log(req.body);
    const { facilityNumber, facilityName, categoryNumber } = req.body;

    console.log(req.body);
    const facilityExist = await Facility.findOne({ facilityNumber });

    if (facilityExist) {
      return res.status(400).json({ msg: "Facility already exists" });
    }
    const newFacility = await Facility.create({
      facilityNumber,
      facilityName,
      categoryNumber,
    });
    res
      .status(201)
      .json({ msg: "Facility added successfully", Facility: newFacility });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const showAllFacilities = async (req, res) => {
  try {
    // const { categoryNumber } = req.params;

    // Fetch all classs from the database
    const facilities = await Facility.find(
      {},
      "facilityNumber facilityName categoryNumber"
    ); // Assuming Facility model has facilityNumber and facilityName and categoryNumber fields

    // Send the Facility as JSON response
    res.status(200).json(facilities);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching facilities:", error);
    res.status(500).json({ error: "Failed to fetch facilities" });
  }
};
const showAllFacilities1 = async (req, res) => {
  try {
    const { categoryNumber } = req.params;

    // Fetch all classs from the database
    const facilities = await Facility.find(
      { categoryNumber },
      "facilityNumber facilityName categoryNumber"
    ); // Assuming Facility model has facilityNumber and facilityName and categoryNumber fields

    // Send the Facility as JSON response
    res.status(200).json(facilities);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching facilities:", error);
    res.status(500).json({ error: "Failed to fetch facilities" });
  }
};

const updateFacility = async (req, res) => {
  const { FacilityId } = req.params;
  const { facilityNumber, facilityName, categoryNumber } = req.body;

  try {
    // Find the class by ID
    const updatedFacility = await Facility.findByIdAndUpdate(
      FacilityId,
      { facilityNumber, facilityName, categoryNumber },
      { new: true }
    );

    if (!updatedFacility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    res
      .status(200)
      .json({ message: "Facility updated successfully", updatedFacility });
  } catch (error) {
    console.error("Error updating Facility:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFacility = async (req, res) => {
  const { FacilityId } = req.params;

  try {
    // Find the class by ID and remove it
    const removedFacility = await Facility.findByIdAndDelete(FacilityId);

    if (!removedFacility) {
      return res.status(404).json({ error: "Facility not found" });
    }

    res.status(200).json({ message: "Facility removed successfully" });
  } catch (error) {
    console.error("Error removing Facility:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const showAllComplaints = async (req, res) => {
  try {
    // Fetch all complaints from the database
    const UserComplaints = await UserAddComplaint.find(
      {}
    ); // Assuming UserAddComplaint model has addComplaintNumber and floorNumber and categoryNumber and addComplaintDescription fields
    console.log(UserComplaints)
    // Send the Facility as JSON response
    res.status(200).json(UserComplaints);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching UserComplaints:", error);
    res.status(500).json({ error: "Failed to fetch UserComplaints" });
  }
};

const getAllIncharges1 = async (req, res) => {
  try {
    const { inchargeNumber, floorNumber, username } = req.body;
    const existingIncharge = await Incharge.findOne({ $or: [{ inchargeNumber }, { floorNumber }, { username }] });

    if (existingIncharge) {
      const existingFields = [];
      if (existingIncharge.inchargeNumber === inchargeNumber) existingFields.push('Incharge Number');
      if (existingIncharge.floorNumber === floorNumber) existingFields.push('Floor Number');
      if (existingIncharge.username === username) existingFields.push('Username');

      return res.status(400).json({ msg: `${existingFields.join(', ')} already exists` });
    }

    const newIncharge = await Incharge.create({ inchargeNumber, floorNumber, username });
    res.status(201).json({
      msg: "Incharge added successfully",
      incharge: newIncharge,
    });
  } catch (error) {
    console.error("Error adding Incharge:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllIncharges = async (req, res) => {
  try {
    // console.log(req.body);
    const { inchargeNumber, floorNumber,username,password } = req.body;

    const InchargeExist = await Incharge.findOne({ username });

    if (InchargeExist) {
      return res.status(400).json({ msg: "Incharge already exist" });
    }
    const newIncharge = await Incharge.create({ inchargeNumber, floorNumber, username, password });

    res.status(201).json({ msg: "Incharge added successfully", incharge: newIncharge });
  } catch (error) {
    console.error("Error adding :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const showAllIncharges = async (req, res) => {
  try {
    // Fetch all complaints from the database
    const Incharges = await Incharge.find(
      {}
    ); 
    console.log(Incharges)
    // Send the Incharge as JSON response
    res.status(200).json(Incharges);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching Incharges:", error);
    res.status(500).json({ error: "Failed to fetch Incharges" });
  }
};

// Function to handle updating a floor
const updateIncharge = async (req, res) => {
  const { inchargeId } = req.params;
  const { inchargeNumber,floorNumber, username, password } = req.body;

  try {
    // Find the Incharge by ID
    const incharge = await Incharge.findById(inchargeId);

    if (!incharge) {
      return res.status(404).json({ message: "Incharge not found" });
    }

    // Update floor details
    incharge.inchargeNumber = inchargeNumber;
    incharge.floorNumber = floorNumber;
    incharge.username = username;
    // incharge.password = password;

    // Save the updated floor
    await incharge.save();

    res.status(200).json({ message: "Incharge updated successfully", incharge });
  } catch (error) {
    console.error("Error updating incharge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeIncharge = async (req, res) => {
  const { inchargeId } = req.params;

  try {
    // Find the class by ID and remove it
    const removeIncharge = await Incharge.findByIdAndDelete(inchargeId);

    if (!removeIncharge) {
      return res.status(404).json({ error: "Incharge not found" });
    }

    res.status(200).json({ message: "Incharge removed successfully" });
  } catch (error) {
    console.error("Error removing Incharge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  adminRegister,
  getAllAdmins,
  adminLogin,
  // home,
  register,
  getAllFloors,
  showAllFloors,
  updateFloor,
  removeFloor,
  getAllClasses,
  showAllClasses,
  showAllClasses1,
  updateClass,
  removeClass,
  getAllCategories,
  showAllCategories,
  updateCategory,
  removeCategory,
  getAllFacilities,
  showAllFacilities,
  showAllFacilities1,
  updateFacility,
  removeFacility,
  showAllComplaints,
  getAllIncharges,
  showAllIncharges,
  updateIncharge,
  removeIncharge,
};
