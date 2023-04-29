import React, { FC } from "react";
import styles from "./Layout.module.css";
import { links } from "../../services/links";
import { Outlet, Link, useLocation } from "react-router-dom";
const Layout: FC = () => {
  const location = useLocation();
  const getLinkClass = (pathname: string) => {
    const style =
      location.pathname === pathname
        ? `${styles.active} ${styles.link} `
        : `${styles.inactive} ${styles.link} `;
    return style;
  };
  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
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
      </nav>
      <Outlet />
      {/* <input type="text" /> */}
    </div>
  );
};

export default Layout;
