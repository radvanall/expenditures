import React, { FC } from "react";
import styles from "./BasicButton.module.css";
interface Props {
  text: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  height?: string;
  color?: string;
  fontSize?: string;
}
const BasicButton: FC<Props> = ({
  text,
  handleClick,
  type = "button",
  height,
  color,
  fontSize,
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
      style={{ height: height ?? "auto", fontSize: fontSize ?? "auto" }}
    >
      {text}
    </button>
  );
};

export default BasicButton;
