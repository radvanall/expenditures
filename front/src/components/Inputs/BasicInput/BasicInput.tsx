import React, { ReactNode, FC } from "react";
import styles from "./BasicInput.module.css";
import Input from "../Input/Input";
import InputProps from "../../../Interfaces/InputProps";

const BasicInput: FC<InputProps> = ({
  children,
  value,
  width,
  type,
  label,
  name,
  borderColor,
  onBlur,
  onChange,
  inputRef,
}) => {
  console.log("bi", value);
  return (
    <div
      style={{ width: width ?? "100%" }}
      className={
        borderColor === "pink"
          ? `${styles.wrapper} ${styles.pink}`
          : styles.wrapper
      }
    >
      {children && <div className={styles.icon_container}>{children}</div>}
      <Input
        styles={styles}
        value={value}
        name={name}
        type={type}
        label={label}
        onBlur={onBlur}
        onChange={onChange}
        inputRef={inputRef}
      />
    </div>
  );
};
export default BasicInput;
