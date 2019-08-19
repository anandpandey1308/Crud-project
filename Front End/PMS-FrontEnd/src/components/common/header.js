import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "darkorange" };
  const style = { padding: 110 };
  const navStyle = {
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 5,
    padding: 20,
    color: "black"
  };

  return (
    <nav style={navStyle}>
      <NavLink activeStyle={activeStyle} style={style} exact to="/">
        Home
      </NavLink>
      {"   |   "}
      <NavLink activeStyle={activeStyle} style={style} exact to="/patients">
        Patients
      </NavLink>
      {"   |   "}
      <NavLink activeStyle={activeStyle} style={style} to="/appointments">
        Manage Patients
      </NavLink>
      {"   |   "}
      <NavLink activeStyle={activeStyle} style={style} to="/about">
        About
      </NavLink>
    </nav>
  );
}

export default Header;
