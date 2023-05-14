import React, { useState } from "react";
import { links, protectedLinks } from "../../services/links";
import { useAuth } from "../../context/Provider";
import useAuthorization from "../../services/hooks/useAuthorization";
import styles from "./Navbar.module.css";
import Modal from "../Modals/Modal/Modal";
import Pending from "../Pending/Pending";
import Navlink from "../Navlink/Navlink";

const Navbar = () => {
  const { auth } = useAuth();
  const [visible, setVisible] = useState<boolean>(false);
  const { error, pending, message, logout } = useAuthorization();
  const handleLogout = () => {
    setVisible(true);
    logout();
  };
  console.log("render");
  return (
    <div>
      <Modal visible={visible} setVisible={setVisible}>
        {pending ? <Pending /> : error ? <h4>{error}</h4> : <h4>{message}</h4>}
      </Modal>
      <nav className={styles.navbar}>
        {auth === false ? (
          <Navlink links={links} handleLogout={handleLogout} auth={auth} />
        ) : (
          <Navlink
            links={protectedLinks}
            handleLogout={handleLogout}
            auth={auth}
          />
        )}
      </nav>
    </div>
  );
};
export default Navbar;
