import React, { FC, useContext } from "react";
// import styles from "./Layout.module.css";
import { links } from "../../services/links";
import { Outlet, Link, useLocation } from "react-router-dom";
import useLogout from "../../services/hooks/useLogout";
import Navbar from "../Navbar/Navbar";

const Layout: FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
