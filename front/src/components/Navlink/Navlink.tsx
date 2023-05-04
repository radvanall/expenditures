import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navlink.module.css";
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
  return (
    <ul>
      {auth && <button onClick={handleLogout}>Logout</button>}
      {links.map((link) => (
        <Link
          key={link.pathname}
          className={getLinkClass(link.pathname)}
          to={link.pathname}
        >
          {link.name}
        </Link>
      ))}
    </ul>
  );
};
export default Navlink;
