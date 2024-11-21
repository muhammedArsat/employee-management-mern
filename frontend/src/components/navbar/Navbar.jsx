import React, { useState } from "react";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri";


const Navbar = () => {
  const [isOpen, setIsOpen] =useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const isActive= (path)=>{
    return path === location.pathname ? "active":"";

  }
  const toggleSideBar = () =>{
    setIsOpen(prev => !prev);
  }

  const handleLogout = () =>{
    navigate('/');
  }
  return (
    <nav>
      <div className="logo">
        <h1>Employee Management</h1>
      </div>
      <div className={`${isOpen? 'mobile-nav open' : 'mobile-nav'}`} >
        <ul>
        <a href="/employee-lists" >
          <li>Home</li>
        </a>
        <a href="/employee-add">
          <li>Add Employee</li>
        </a>
        <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="menu" onClick={toggleSideBar}><RiMenu4Line size={30}/></div>
      <ul>
        <a href="/employee-lists"className={isActive("/employee-lists")}>
          <li>Home</li>
        </a>
        <a href="/employee-add"className={isActive("/employee-add")}>
          <li>Add Employee</li>
        </a>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
