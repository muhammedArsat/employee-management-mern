import React, { useEffect, useState } from "react";
import "./EmployeeProfile.css";
import TestImage from "../../assets/react.svg";
import { useParams } from "react-router-dom";
import api from "../../api/employeeApi";

const EmployeeProfile = () => {
  const { employeecode } = useParams();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await api.getEmployeeByCode(employeecode);
      setProfile(response.data.employee);
    };

    fetchUserProfile();
  }, []);
  if (!profile) {
    return <div>Loading...</div>; // Show loading while fetching data
  }
  console.log(profile);
  return (
    <div className="emp-cont">
      <div className="emp-prof-cont">
        <div className="emp-prof-left">
          <img
            src={`http://localhost:3000/${profile.profile.replace(/\\/g, "/")}`}
            alt="profile pic"
          />
        </div>
        <div className="emp-prof-right">
          <p>Emp Id: {profile.empid}</p>
          <p>Name:{profile.name}</p>
          <p>JobRole:{profile.role} </p>
          <p>Age:{profile.age} </p>
          <p>Salary:{profile.salary} </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
