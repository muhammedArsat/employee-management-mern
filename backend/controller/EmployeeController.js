const EmployeeModal = require("../modal/EmployeeModal");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

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
exports.createEmployee = async (req, res) => {
  upload.single("profile")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { empid, name, role, age, salary } = req.body;
      const employeecode = crypto.randomBytes(8).toString("hex");

      // Create a new employee in the database
      const newEmployee = await EmployeeModal.create({
        empid,
        name,
        role,
        age,
        salary,
        profile: req.file ? req.file.path : null, // Save file path
        employeecode,
      });

      res.json({
        success: true,
        message: "Employee created successfully",
        newEmployee,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};
// localhost:3000/api/v1/employee (put)
exports.updateEmployee = async (req, res, next) => {
  try {
    const employeecode = req.params.employeecode;

    // Find the existing employee in the database
    const employee = await EmployeeModal.findOne({ employeecode });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // If a new profile picture is uploaded, handle it
    if (req.file) {
      // Delete the old profile picture if it exists
      if (employee.profile) {
        const oldProfilePath = path.join(__dirname, "..", employee.profile);
        if (fs.existsSync(oldProfilePath)) {
          fs.unlinkSync(oldProfilePath); // Deletes the old file
        }
      }
      // Set the new profile path from the uploaded file
      req.body.profile = `uploads/${req.file.filename}`;
    }

    // Update employee details in the database
    const updatedEmployee = await EmployeeModal.findOneAndUpdate(
      { employeecode },
      req.body,
      { new: true } // Return the updated document
    );

    res.status(200).json({
      success: true,
      employee: updatedEmployee,
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
