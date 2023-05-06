import React, { FC } from "react";
type Props = {
  styles: { [key: string]: string };
  name: string;
  type: string;
  label: string;
  value?: string | number;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
};
const Input: FC<Props> = ({
  styles,
  value,
  name,
  label,
  onBlur,
  onChange,
  inputRef,
  type,
}) => {
  console.log("i", value);
  return (
    <div className={styles.wrapper}>
      <input
        defaultValue={value}
        // value={value}
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
