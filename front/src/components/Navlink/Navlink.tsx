import React, { FC, FormEventHandler, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navlink.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";
import ImgButton from "../Buttons/ImgButton/ImgButton";
import ToggleSlider from "../ToggleSlider/ToggleSlider";
import { useTheme } from "../../context/Provider";
interface Props {
  links: {
    pathname: string;
    name: string;
  }[];
  handleLogout: () => void;
  auth: boolean;
}
const Navlink: FC<Props> = ({ links, handleLogout, auth }) => {
  const location = useLocation();
  const getLinkClass = (pathname: string) => {
    const style =
      location.pathname === pathname
        ? `${styles.active} ${styles.link} `
        : `${styles.inactive} ${styles.link} `;
    return style;
  };
  const { theme, setTheme } = useTheme();
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setTheme(e.target.checked);
  };
  return (
    <ul>
      {/* <button onClick={handleLogout}>Logout</button> */}

      {/* {auth && <button onClick={handleLogout}>Logout</button>} */}
      {links.map((link) => (
        <Link
          key={link.pathname}
          className={getLinkClass(link.pathname)}
          to={link.pathname}
        >
          {link.name}
        </Link>
      ))}
      {auth && (
        <ImgButton
          handleClick={handleLogout}
          color="pink"
          fontSize="18px"
          title="Logout"
        >
          <RiLogoutBoxRLine />
        </ImgButton>
      )}
      <ToggleSlider onChange={handleCheck} checked={theme} />
      {/* {auth && <button onClick={handleLogout}>Logout</button>} */}
    </ul>
  );
};
export default Navlink;
