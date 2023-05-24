import React, { FC, HTMLAttributes } from "react";
import styles from "./Checkbox.module.css";
interface Checkbox extends HTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  label: string;
}
const Checkbox: FC<Checkbox> = ({ label, name, id, ...props }) => {
  return (
    <div className={styles.checkbox__container}>
      <input type="checkbox" name={name} id={id} {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
