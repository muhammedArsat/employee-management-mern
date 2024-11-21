import React, { useState, useEffect } from "react";
import "./EmployeeCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EmployeeCard = ({
  btnName,
  onSubmit,
  initialValues,
  toastifyMessage,
}) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    empid: "",
    name: "",
    role: "",
    age: "",
    salary: "",
    profile: null,
  });

  useEffect(() => {
    // Only update the state if initialValues change
    if (initialValues) {
      setFormValues({
        empid: initialValues.empid || "",
        name: initialValues.name || "",
        role: initialValues.role || "",
        age: initialValues.age || "",
        salary: initialValues.salary || "",
        profile: null, // Reset file input (you can't set a value here)
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   const { files } = e.target;
  //   setFormValues((prev) => ({
  //     ...prev,
  //     profile: files[0], // Store the file object (first file selected)
  //   }));
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formValues);
      // if (initialValues) {
      //   initialValues.empid = formValues.empid;
      //   initialValues.name = formValues.name;
      //   initialValues.role = formValues.role;
      //   initialValues.age = formValues.age;
      //   initialValues.salary = formValues.salary;
      //   initialValues.empid = formValues.empid;
      // }

      setFormValues({
        empid: initialValues.empid || "",
        name: initialValues.name || "",
        role: initialValues.role || "",
        age: initialValues.age || "",
        salary: initialValues.salary || "",
        profile: null,
      });
      
       navigate("/employee-lists");
    }
  };
  return (
    <div className="employee-card-container">
      <form className="emp-card-sml-container" onSubmit={handleSubmit}>
        <div className="emp-card-label-container">
          <label>Employee ID: </label>
          <input
            name="empid"
            type="text"
            placeholder="EmpId101"
            value={formValues.empid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="emp-card-label-container">
          <label htmlFor="">Name: </label>
          <input
            type="text"
            placeholder="Jhon Doe"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="emp-card-label-container">
          <label htmlFor="">Job Role :</label>
          <input
            type="text"
            placeholder="Developer"
            name="role"
            value={formValues.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="emp-card-label-container">
          <label htmlFor="">Age: </label>

          <input
            type="text"
            placeholder="30"
            name="age"
            value={formValues.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="emp-card-label-container">
          <label htmlFor="">Salary :</label>
          <input
            type="text"
            placeholder="50,000"
            name="salary"
            value={formValues.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="emp-card-label-container">
          <label htmlFor="">Profile :</label>
          {/* <input type="file" 
          name="profile"
             onChange={handleFileChange}
          required /> */}
        </div>
        <div className="emp-btn-cont">
          <button type="submit">{btnName}</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeCard;
