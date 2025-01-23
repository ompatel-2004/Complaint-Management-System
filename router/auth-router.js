const express = require("express");
const router = express.Router();
const authcontrollers = require("../server/controllers/auth-controller");


// router.route("/").get(authcontrollers.home);

router.post("/adminRegister", authcontrollers.adminRegister)
router.post("/addadmin", authcontrollers.getAllAdmins);
router.post("/adminLogin", authcontrollers.adminLogin)

router.route("/register").post(authcontrollers.register);

router.post("/addfloor", authcontrollers.getAllFloors);
router.get("/showAllFloors", authcontrollers.showAllFloors);
router.put("/updateFloor/:floorId", authcontrollers.updateFloor);
router.delete("/removeFloor/:floorId", authcontrollers.removeFloor);

router.post("/addclass", authcontrollers.getAllClasses);
router.get("/showAllClasses", authcontrollers.showAllClasses);
router.get("/showAllClasses1/:floorNumber", authcontrollers.showAllClasses1);
router.put("/updateClass/:classId", authcontrollers.updateClass);
router.delete("/removeClass/:classId", authcontrollers.removeClass);

router.post("/addCategory", authcontrollers.getAllCategories);
router.get("/showAllCategories", authcontrollers.showAllCategories);
router.put("/updateCategory/:categoryId", authcontrollers.updateCategory);
router.delete("/removeCategory/:CategoryId", authcontrollers.removeCategory);

router.post("/addFacility", authcontrollers.getAllFacilities);
router.get("/showAllFacilities", authcontrollers.showAllFacilities);
router.get("/showAllFacilities1/:categoryNumber", authcontrollers.showAllFacilities1);
router.put("/updateFacility/:FacilityId", authcontrollers.updateFacility);
router.delete("/removeFacility/:FacilityId", authcontrollers.removeFacility);

router.get("/showAllComplaints", authcontrollers.showAllComplaints);2

router.get("/showAllIncharges", authcontrollers.showAllIncharges);
router.post("/addIncharge", authcontrollers.getAllIncharges);
router.put("/updateIncharge/:inchargeId", authcontrollers.updateIncharge);
router.delete("/removeIncharge/:inchargeId", authcontrollers.removeIncharge);

module.exports = router;
