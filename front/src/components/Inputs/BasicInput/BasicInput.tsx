import React, { ReactNode, FC } from "react";
import styles from "./BasicInput.module.css";
import Input from "../Input/Input";
import InputProps from "../../../Interfaces/InputProps";

const BasicInput: FC<InputProps> = ({
  children,
  width,
  type,
  name,
  onBlur,
  onChange,
  inputRef,
}) => {
  return (
    <div style={{ width: width ?? "100%" }} className={styles.wrapper}>
      {children && <div className={styles.icon_container}>{children}</div>}
      <Input
        styles={styles}
        name={name}
        type={type}
        onBlur={onBlur}
        onChange={onChange}
        inputRef={inputRef}
      />
    </div>
  );
};

export default BasicInput;
