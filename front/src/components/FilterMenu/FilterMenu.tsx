import React, { useState } from "react";
import BasicInput from "../Inputs/BasicInput/BasicInput";
import styles from "./FilterMenu.module.css";
import Radiobox from "../Radiobox/Radiobox";
import Checkbox from "../Checkbox/Checkbox";
import BasicButton from "../Buttons/BasicButton/BasicButton";
import RangeInput from "../RangeInput/RangeInput";
import { useInvoicesContext } from "../../pages/Invoices/InvoincesContext";
const FilterMenu = () => {
  // const defaultFormValues = {
  //   date_radio: "",
  //   date: new Date().toISOString().slice(0, 10),
  //   first_date: new Date().toISOString().slice(0, 10),
  //   last_date: new Date().toISOString().slice(0, 10),
  //   min_price_checkbox: false,
  //   min_price: 0,
  //   max_price_checkbox: false,
  //   max_price: 0,
  // };
  // const [rangeValue, setRengeValue] = useState(0);
  // const [formData, setFormData] = useState(defaultFormValues);
  // const [ckecked, setChecked] = useState(false);
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };
  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (name === "min_price_checkbox" || name === "max_price_checkbox") {
  //     setFormData((prevValues) => ({
  //       ...prevValues,
  //       [name]: e.target.checked,
  //     }));
  //     return;
  //   }
  //   setFormData((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };
  const { handleSubmit, handleFormChange, formData, data } =
    useInvoicesContext();

  return (
    <div className={styles.menu__wrapper}>
      {/* <button onClick={() => console.log(ckecked)}>Click</button> */}
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
        <div className={styles.checkbox__wrapper}>
          <Checkbox
            name="min_price_checkbox"
            label="Minimum price"
            id="min_price"
            onChange={handleFormChange}
          />
        </div>
        <RangeInput
          name="min_price"
          value={formData.min_price}
          max={data?.max_price}
          unit="Lei"
          onChange={handleFormChange}
        />
        <div className={styles.checkbox__wrapper}>
          <Checkbox
            name="max_price_checkbox"
            label="Maximum price"
            id="max_price"
            onChange={handleFormChange}
          />
        </div>
        <RangeInput
          name="max_price"
          value={formData.max_price}
          max={data?.max_price}
          unit="Lei"
          onChange={handleFormChange}
        />
        <BasicButton type="submit" text="Filter" />
      </form>
    </div>
  );
};

export default FilterMenu;
