import React from "react";
import styles from "./RadioButton.module.css";
const RadioButton = () => {
  return (
    <div className={styles.radio__button}>
      <label className={styles.radio}>
        <input
          type="radio"
          value="first"
          name="date"
          onChange={(e) => console.log(e.target.value)}
        />
        Select date
        <span></span>
      </label>
    </div>
  );
};

export default RadioButton;
