import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Customer Care Registry</h1>
      <div className="details">
        <p>John Doe</p>
        <button>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
