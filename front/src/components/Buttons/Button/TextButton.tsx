import React, { FC } from "react";
import styles from "./TextButton.module.css";
interface Props {
  message: string | null;
  formHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonText?: string;
}
const TextButton: FC<Props> = ({ message, formHandler, buttonText }) => {
  return (
    <div className={styles.button__wrapper}>
      {message}
      <span>
        <button onClick={formHandler}>{buttonText}</button>
      </span>
    </div>
  );
};

export default TextButton;
