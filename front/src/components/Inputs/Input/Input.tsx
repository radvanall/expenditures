import React, { FC } from "react";
type Props = {
  styles: { [key: string]: string };
  name: string;
  type: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.Ref<HTMLInputElement>;
};
const Input: FC<Props> = ({
  styles,
  name,
  onBlur,
  onChange,
  inputRef,
  type,
}) => {
  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        placeholder="any"
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
      />
      <label htmlFor="input">{name}</label>
    </div>
  );
};

export default Input;
