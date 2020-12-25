import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <div className="nav">
      <NavLink to="/" exact className="item">
        Home
      </NavLink>
      <NavLink to="/charts" className="item">
        Charts
      </NavLink>
      <NavLink to="/wallet" className="item">
        Wallet
      </NavLink>
    </div>
  );
};

export default Navbar;
