import { links, protectedLinks } from "../../services/links";
import { useAuth, useModal } from "../../context/Provider";
import useAuthorization from "../../services/hooks/useAuthorization";
import styles from "./Navbar.module.css";
import Modal from "../Modals/Modal/Modal";
import Pending from "../Pending/Pending";
import Navlink from "../Navlink/Navlink";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const { auth } = useAuth();
  const { visible, setVisible, deleteMessage } = useModal();
  const { t } = useTranslation(["navbar"]);

  const { error, pending, message, logout } = useAuthorization();
  const handleLogout = () => {
    setVisible(true);
    logout();
  };
  return (
    <div>
      <Modal visible={visible} setVisible={setVisible}>
        {pending ? (
          <Pending />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <h4>{deleteMessage ? deleteMessage : message}</h4>
        )}
      </Modal>
      <nav className={styles.navbar}>
        {auth === false ? (
          <Navlink
            links={links[t("links") as keyof typeof links]}
            handleLogout={handleLogout}
            auth={auth}
          />
        ) : (
          <Navlink
            links={protectedLinks[t("links") as keyof typeof protectedLinks]}
            handleLogout={handleLogout}
            auth={auth}
          />
        )}
      </nav>
    </div>
  );
};
export default Navbar;
