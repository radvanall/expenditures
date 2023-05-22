import React, { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./PaginButton.module.css";
interface PaginButton extends HTMLAttributes<HTMLButtonElement> {}
const PaginButton: FC<PaginButton> = ({ className, children, ...props }) => {
  return (
    <button className={`${styles.button__style} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default PaginButton;
