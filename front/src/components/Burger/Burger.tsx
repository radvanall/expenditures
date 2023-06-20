import { FC } from "react";
import styles from "./Burger.module.css";
interface Props {
  burger: boolean;
  setBurger: () => void;
}
const Burger: FC<Props> = ({ burger, setBurger }) => {
  return (
    <div className={styles.burger} onClick={setBurger}>
      <div className={styles.line}>
        <div
          className={
            burger ? `${styles.up_left} ${styles.line_size}` : styles.half_line
          }
        ></div>
        <div
          className={
            burger ? `${styles.up_right} ${styles.line_size}` : styles.half_line
          }
        ></div>
      </div>
      <div className={styles.line}>
        <div
          className={
            burger
              ? `${styles.middle_left} ${styles.line_size}`
              : styles.half_line
          }
        ></div>
        <div
          className={
            burger
              ? `${styles.middle_right} ${styles.line_size}`
              : styles.half_line
          }
        ></div>
      </div>
      <div className={styles.line}>
        <div
          className={
            burger
              ? `${styles.bottom_left} ${styles.line_size}`
              : styles.half_line
          }
        ></div>
        <div
          className={
            burger
              ? `${styles.bottom_right} ${styles.line_size}`
              : styles.half_line
          }
        ></div>
      </div>
    </div>
  );
};

export default Burger;
