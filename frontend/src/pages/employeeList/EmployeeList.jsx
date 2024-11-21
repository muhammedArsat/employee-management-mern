import React, { useEffect, useMemo, useState } from "react";
import "./EmployeeList.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../../api/employeeApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [search,setSearch] = useState('');

  const searchedData = useMemo(()=>{
    return employees.filter((emp)=>emp.name.toLowerCase().includes(search))
  },[search,employees])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.getEmployee();
        setEmployees(response.data.employees);
      } catch (error) {
        toast.error("Error in Fetching Employee Details");
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employeecode) => {
    navigate(`/employee-edit/${employeecode}`);
  };

  const handleView = (employeecode) => {
    navigate(`/employee-details/${employeecode}`);
  };

  const handleDelete =async (employeecode,empid) => {
    try{
    const response = await api.deleteEmployee(employeecode);
    toast.success(`Employee Id ${empid} Deleted Successfully`);
    setSearch((employee)=>{
      employee.employeecode !== employeecode
    })

    }catch(error){
      toast.error("Error in Deleting Employee Details")
    }

  };

  if(!searchedData){
    return(
      <p>Loading...</p>
    )
  }
  return (
    <>
      <div className="search-cont">
        <div className="search-icon">
          <div className="search-cont">{<FaSearch size={20} />}</div>
        </div>
        <input type="text" placeholder="search Here..." value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div className="list-container">
        <table>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Name</th>
              <th>Job Role</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {
              searchedData.length === 0 ? 
              <tr>
              <td colSpan="4" style={{textAlign:"center"}}>No Employee Found</td>
            </tr>
            :(
              searchedData.map((employee, index) => {
              
               
              
                return(
                    <tr key={index}>
                      <td>{employee.empid}</td>
    
                      <td>{employee.name}</td>
                      <td>{employee.role}</td>
                      <td>
                        <div className="button-container">
                          <button
                            className="view-btn"
                            onClick={() => handleView(employee.employeecode)}
                          >
                            view
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(employee.employeecode)}
                          >
                            Edit
                          </button>
                          <button
                            className="del-btn"
                            onClick={() => handleDelete(employee.employeecode,employee.empid)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
            )
            }
          
          
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
