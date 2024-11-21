import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Login from "./pages/login/Login";
import EmployeeAdd from "./pages/employeeAdd/EmployeeAdd";
import EmployeeDetails from "./pages/employeeDetails/EmployeeDetails";
import EmployeeList from "./pages/employeeList/EmployeeList";
import EmployeeEdit from "./pages/employeeEdit/EmployeeEdit";
import NotFound from "./pages/notfound/NotFound";


import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
        <NavbarWrapper/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee-lists" element={<EmployeeList />} />
        <Route path="/employee-add" element={<EmployeeAdd />} />
        <Route
          path="/employee-details/:employeecode"
          element={<EmployeeDetails />}
        />
        <Route path="/employee-edit/:employeecode" element={<EmployeeEdit />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    <ToastContainer/>
    </Router>
  );
};

const NavbarWrapper = () =>{
  const location = useLocation();
  const isLoginPage = location.pathname === '/' 
  return !isLoginPage ? <Navbar/> : null;
}

export default App;
