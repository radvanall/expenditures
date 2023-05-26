import React, { useState } from "react";
import BasicInput from "../Inputs/BasicInput/BasicInput";
import styles from "./FilterMenu.module.css";
import Radiobox from "../Radiobox/Radiobox";
import Checkbox from "../Checkbox/Checkbox";
import BasicButton from "../Buttons/BasicButton/BasicButton";
const FilterMenu = () => {
  const defaultFormValues = {
    date_radio: "",
    date: new Date().toISOString().slice(0, 10),
    first_date: new Date().toISOString().slice(0, 10),
    last_date: new Date().toISOString().slice(0, 10),
  };
  const [formData, setFormData] = useState(defaultFormValues);
  const [ckecked, setChecked] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div className={styles.menu__wrapper}>
      <button onClick={() => console.log(ckecked)}>Click</button>
      <form onSubmit={handleSubmit}>
        <div className={styles.checkbox__wrapper}>
          {/* <Checkbox
          name="check"
          id="dateid"
          label="Select date"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        /> */}
        </div>
        <div className={styles.checkbox__wrapper}>
          <Radiobox
            id="date"
            name="date_radio"
            label="chousedate"
            value="date"
            onChange={handleFormChange}
          />
        </div>
        <BasicInput
          type="date"
          label=""
          name="date"
          value={formData.date}
          onChange={handleFormChange}
        />
        <div className={styles.checkbox__wrapper}>
          <Radiobox
            id="date2"
            name="date_radio"
            label="chouseRangeofdate"
            value="range"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.input__wrapper}>
          <BasicInput
            type="date"
            label="First date"
            name="first_date"
            value={formData.first_date}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.input__wrapper}>
          <BasicInput
            type="date"
            label="Last date"
            name="last_date"
            value={formData.last_date}
            onChange={handleFormChange}
          />
        </div>
        <BasicButton type="submit" text="Filter" />
      </form>
    </div>
  );
};

export default FilterMenu;
