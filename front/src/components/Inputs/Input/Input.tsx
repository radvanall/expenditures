import React, { FC } from "react";
type Props = {
  styles: { [key: string]: string };
};
const Input: FC<Props> = ({ styles }) => {
  return (
    <div className={styles.wrapper}>
      <input type="text" name="input" placeholder="any" />
      <label htmlFor="input">Input</label>
    </div>
  );
};

export default Input;
