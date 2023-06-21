import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navlink.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";
import ImgButton from "../Buttons/ImgButton/ImgButton";
import ToggleSlider from "../ToggleSlider/ToggleSlider";
import { useTheme } from "../../context/Provider";
import i18next from "i18next";
import Burger from "../Burger/Burger";
import i18n from "../../i18n";
interface Props {
  links: {
    pathname: string;
    name: string;
  }[];
  handleLogout: () => void;
  auth: boolean;
}
const Navlink: FC<Props> = ({ links, handleLogout, auth }) => {
  const [burger, setBurger] = useState(false);
  const location = useLocation();
  const getLinkClass = (pathname: string) => {
    const style =
      location.pathname === pathname
        ? `${styles.active} ${styles.link} `
        : `${styles.inactive} ${styles.link} `;
    return style;
  };
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("en");
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked);
    localStorage.setItem("theme", JSON.stringify(e.target.checked));
  };
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(JSON.parse(localStorage.getItem("theme") as string));
    } else {
      localStorage.setItem("theme", JSON.stringify(false));
    }
    if ((localStorage.getItem("i18nextLng")?.length ?? 0) > 2) {
      i18next.changeLanguage("en");
      setLang("en");
    } else if (localStorage.getItem("i18nextLng"))
      setLang(localStorage.getItem("i18nextLng") as string);
  }, []);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("i18nextLng", e.target.value);
    setLang(e.target.value);
  };
  const handleBurger = () => {
    setBurger((prev) => !prev);
  };
  return (
    <ul className={styles.navlink_list}>
      <div className={styles.burger}>
        <Burger burger={burger} setBurger={handleBurger} />
      </div>
      <div
        className={
          burger ? `${styles.links} ${styles.links_visible}` : styles.links
        }
      >
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
      </div>
      <div className={styles.link__buttons}>
        <ToggleSlider onChange={handleCheck} checked={theme} />
        <select
          onChange={handleLanguageChange}
          value={lang}
          className={styles.select}
        >
          <option value="en">En</option>
          <option value="ro">Ro</option>
          <option value="ru">Ru</option>
        </select>
      </div>
    </ul>
  );
};
export default Navlink;
