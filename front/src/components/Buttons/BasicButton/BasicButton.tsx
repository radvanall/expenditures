import React, { FC, MouseEventHandler } from "react";
import styles from "./BasicButton.module.css";
interface Props {
  text: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  height?: string;
  color?: string;
}
const BasicButton: FC<Props> = ({
  text,
  handleClick,
  type = "button",
  height,
  color,
}) => {
  return (
    <button
      className={
        color === "pink"
          ? `${styles.basic__button} ${styles.pink}`
          : `${styles.basic__button} ${styles.blue}`
      }
      onClick={handleClick}
      type={type}
      style={{ height: height ?? "auto" }}
    >
      {text}
    </button>
  );
};

export default BasicButton;