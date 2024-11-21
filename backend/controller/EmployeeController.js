const EmployeeModal = require("../modal/EmployeeModal");
const crypto = require("crypto");
// localhost:3000/api/v1/employee(get)
exports.getAllEmployee = async (req, res, next) => {
  try {
    const employees = await EmployeeModal.find({});
    res.json({
      employees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// localhost:3000/api/v1/employee/:empcode(get)
exports.getEmployeeByEmployeeCode = async (req, res, next) => {
  try {
    const employee = await EmployeeModal.findOne({
      employeecode: req.params.employeecode,
    });
    res.json({
      employee,
    });
  } catch (error) {
    res.status(400).json({ message: "Employee Not Found" });
  }
};

// localhost:3000/api/v1/employee (post)
exports.createEmployee = async (req, res, next) => {
  try {
    const { empid, name, role, age, salary, profile } = req.body;
    const employeecode = crypto.randomBytes(8).toString("hex");

    const newEmployee = await EmployeeModal.create({
      empid,
      name,
      role,
      age,
      salary,
      profile,
      employeecode,
    });
    res.json({
      success: true,
      message: "Create Employee is Working",
      newEmployee,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// localhost:3000/api/v1/employee (put)
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await EmployeeModal.findOneAndUpdate(
      { employeecode: req.params.employeecode },
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(400).json({ message: "Employee Not Found" });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in Updating Employee Details" });
  }
};

// localhost:3000/api/v1/employee(delete)
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await EmployeeModal.findOneAndDelete({
      employeecode: req.params.employeecode,
    });
    if (!employee) {
      return res.status(400).json({ messge: "Employee is Not Found" });
    }
    res.json({
      success: true,
      mesesage: "SuccessFully Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Error in Deleting Employee " });
  }
};
