import React, { FC, ReactNode } from "react";
import styles from "./ImgButton.module.css";
interface Props {
  children: ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  height?: string;
  color?: string;
  fontSize?: string;
  title?: string;
}
const ImgButton: FC<Props> = ({
  children,
  handleClick,
  type = "button",
  height,
  color,
  fontSize,
  title,
}) => {
  return (
    <button
      className={
        color === "pink"
          ? `${styles.basic__button} ${styles.pink}`
          : `${styles.basic__button} ${styles.blue}`
      }
      onClick={handleClick}
      title={title}
      type={type}
      style={{ height: height ?? "auto", fontSize: fontSize ?? "auto" }}
    >
      {children}
    </button>
  );
};

export default ImgButton;
