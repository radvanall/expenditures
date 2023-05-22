import React, { FC, ReactNode } from "react";
import BasicInput from "../Inputs/BasicInput/BasicInput";
import styles from "./InputFormField.module.css";
interface Props {
  children?: ReactNode;
  width?: string;
  min?: string;
  type: string;
  label?: string;
  name: string;
  borderColor?: string;
  errors: string | undefined;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  afterText?: string;
}
const InputFormField: FC<Props> = ({
  name,
  children,
  type,
  onChange,
  onBlur,
  inputRef,
  width,
  label,
  errors,
  afterText,
}) => {
  return (
    <div className={styles.input__wrapper}>
      <BasicInput
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={inputRef}
        width={width ?? "75%"}
        label={label}
      >
        {children && children}
      </BasicInput>
      {afterText && (
        <div className={styles.buttons_container}>
          <label>{afterText}</label>
        </div>
      )}

      {errors && <span className={styles.error__message}>{errors}</span>}
    </div>
  );
};

export default InputFormField;
