import React from "react";
import { Link } from "react-router-dom";
import NavbarStyles from "../css/navbar.module.css";
import Logout from "./Logout";
const Navbar = ({ data }) => {
  return (
    <nav className={NavbarStyles.navbar}>
      {data.map(({ key, url }, index) => {
        return (
          <Link key={index} to={url}>
            {key}
          </Link>
        );
      })}
      <Logout />
    </nav>
  );
};

export default Navbar;
