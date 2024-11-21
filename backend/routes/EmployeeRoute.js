const express = require("express");

const {
  getAllEmployee,
  getEmployeeByEmployeeCode,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controller/EmployeeController");

const router = express.Router();

router.route("/employee").get(getAllEmployee);
router.route("/employee/:employeecode").get(getEmployeeByEmployeeCode);
router.route("/employee").post(createEmployee);
router.route("/employee/:employeecode").put(updateEmployee);
router.route("/employee/:employeecode").delete(deleteEmployee);


module.exports = router;
