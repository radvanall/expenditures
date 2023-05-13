import React, { FC, useEffect, useState } from "react";
type Props = {
  styles: { [key: string]: string };
  name: string;
  type: string;
  label: string;
  key?: string;
  defaultValue?: string | number;
  value?: string | number;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
};
const Input: FC<Props> = ({
  styles,
  defaultValue,
  value,
  name,
  label,
  onBlur,
  onChange,
  inputRef,
  type,
}) => {
  console.log("i", defaultValue);
  return (
    <div className={styles.wrapper}>
      <input
        defaultValue={defaultValue}
        value={value}
        key={defaultValue}
        type={type}
        placeholder="any"
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
        autoComplete="on"
      />
      <label htmlFor="input">{label}</label>
    </div>
  );
};
export default Input;
