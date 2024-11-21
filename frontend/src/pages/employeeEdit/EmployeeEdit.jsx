import React, { useEffect, useState } from "react";
import EmployeeCard from "../../components/employeeCard/EmployeeCard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/employeeApi";
const EmployeeEdit = () => {

  const{employeecode} = useParams();
  const[existing,setExisting] = useState(null);
  useEffect(()=>{
    const fetchEmployeeDetails = async()=>{
      try{
        const response = await api.getEmployeeByCode(employeecode);
        setExisting(response.data.employee)
        
      }catch(error){
        toast.error("Error in fetching Details");
      }
    }

    fetchEmployeeDetails();
  },[employeecode])
  

  const handleEdit = async(data) => {
    try{
    const response = await api.updateEmployee(data,employeecode);
    toast.success(`Employee with id : ${data.empid} is Updated`);
    }catch(error){
      toast.error("Error in Updating Employee Details");
    }
    
  };
  return (
    <div>{
      existing &&
      <EmployeeCard
      btnName="Edit Employee"
      onSubmit={handleEdit}
      initialValues={existing}
      toastifyMessage={"Edited"}
    />
      }
     
    </div>
  );
};

export default EmployeeEdit;
