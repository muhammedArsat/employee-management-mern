const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  empid: String,
  name: String,
  age: String,
  role: String,
  salary: String,
  profile: String,
  employeecode: String,
  createdAt: Date,
});

const EmployeeModal = mongoose.model('employee',EmployeeSchema);

module.exports = EmployeeModal;