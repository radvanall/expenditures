import React, { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./ImgButton.module.css";
interface Props {
  children: ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  height?: string;
  color?: string;
  fontSize?: string;
}
const ImgButton: FC<Props> = ({
  children,
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
      {children}
    </button>
  );
};

export default ImgButton;
