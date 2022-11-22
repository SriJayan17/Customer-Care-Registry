import React from "react";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = ()=>{
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <nav className="navbar">
      <h1 className="logo">Customer Care Registry</h1>
      <div className="details">
        <p>John Doe</p>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
