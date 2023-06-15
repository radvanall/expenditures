import React, { FC, useEffect, useState } from "react";
type Props = {
  styles: { [key: string]: string };
  name: string;
  type: string;
  label?: string;
  key?: string;
  min?: string;
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
  min,
  name,
  label,
  onBlur,
  onChange,
  inputRef,
  type,
}) => {
  console.log("i", defaultValue);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        id="in"
        defaultValue={defaultValue}
        accept="image/*"
        value={value}
        min={min}
        key={defaultValue}
        type={type}
        placeholder="any"
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
        autoComplete="off"
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="in">{label}</label>
    </div>
  );
};
export default Input;
