import React, { FC, ReactNode } from "react";
import styles from "./Modal.module.css";

interface Props {
  visible: boolean;
  setVisible:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((val: boolean) => void)
    | (() => void);
  children?: ReactNode;
}
const Modal: FC<Props> = ({ visible, setVisible, children }) => {
  return (
    <div
      className={
        visible
          ? `${styles.modal__wrapper} ${styles.active}`
          : styles.modal__wrapper
      }
    >
      <div
        className={
          visible
            ? `${styles.modal__content} ${styles.active}`
            : styles.modal__content
        }
      >
        <div className={styles.btn__wrapper}>
          <button className={styles.btn} onClick={() => setVisible(false)}>
            {" "}
            &#10005;
          </button>
        </div>
        <div className={styles.children__wrapper}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
