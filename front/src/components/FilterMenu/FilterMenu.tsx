import React from "react";
import BasicInput from "../Inputs/BasicInput/BasicInput";
import styles from "./FilterMenu.module.css";
import RadioButton from "../RadioButton/RadioButton";
import Checkbox from "../Checkbox/Checkbox";
const FilterMenu = () => {
  return (
    <div className={styles.menu__wrapper}>
      <Checkbox />
      {/* <RadioButton /> */}
      {/* <div className={styles.radio__button}>
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
      </div> */}
      {/* <div className={styles.radio__button}>
        <label className={styles.radio}>
          <input type="radio" value="second" name="date" />
          Select a range of dates
          <span></span>
        </label>
      </div> */}

      <BasicInput
        type="date"
        label=""
        name="date"
        value={new Date().toISOString().slice(0, 10)}
        //   onChange={handleDateChange}
      />
    </div>
  );
};

export default FilterMenu;
