import React, { FC, HTMLAttributes } from "react";
import styles from "./Radiobox.module.css";
interface Radiobox extends HTMLAttributes<HTMLInputElement> {
  name: string;
  id?: string;
  label: string;
  value: string;
}
const Radiobox: FC<Radiobox> = ({ label, name, id, value, ...props }) => {
  return (
    <div className={styles.radiobox__container}>
      <input type="radio" name={name} id={id} value={value} {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Radiobox;
