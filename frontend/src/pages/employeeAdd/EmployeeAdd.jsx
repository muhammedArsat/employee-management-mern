import React from "react";
import EmployeeCard from "../../components/employeeCard/EmployeeCard";
import { toast } from "react-toastify";
import api from "../../api/employeeApi";

const EmployeeAdd = () => {
  const handleAdd = (data) => {
    try {
      const response = api.createEmployee(data);
      toast.success(
        `New Employee added successfully with EmpId :${data.empid}`
      );
    } catch(error) {
      toast.error("Failed to Add Employee");
    }
  };
  return (
    <div>
      <EmployeeCard
        btnName={"Add Employee"}
        onSubmit={handleAdd}
        initialValues={{}}
        toastifyMessage={"Added"}
      />
    </div>
  );
};

export default EmployeeAdd;
