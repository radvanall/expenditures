import React, { FC, useEffect, useState, useReducer, useRef } from "react";
import styles from "./Select.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { SelectI } from "../../Interfaces/SelectI";
import BasicInput from "../Inputs/BasicInput/BasicInput";
import useSelect from "./useSelect";

interface Props {
  z_index?: number;
  name: string;
  label: string;
  defaultValue?: SelectI | null;
  options: SelectI[] | null;
  displayedOptions?: SelectI[] | null;
  setDisplayedOptions: React.Dispatch<React.SetStateAction<SelectI[] | null>>;
  handleCallback?: (id: SelectI) => void;
  color?: string;
  width?: string;
}
const Select: FC<Props> = ({
  z_index,
  defaultValue,
  name,
  label,
  width,
  options,
  displayedOptions,
  setDisplayedOptions,
  handleCallback,
  color,
}) => {
  const {
    toggleOptions,
    handleBlur,
    handleInputChange,
    handleSelect,
    liRefs,
    visible,
    state,
  } = useSelect(options, setDisplayedOptions, defaultValue, handleCallback);

  return (
    <div
      className={
        color === "pink"
          ? `${styles.select__wrapper} ${styles.pink}`
          : `${styles.select__wrapper} ${styles.blue}`
      }
      style={{ width: width ?? "100%" }}
      data-list="drop_down_list"
    >
      <div className={styles.input__wrapper}>
        <BasicInput
          type="text"
          onBlur={handleBlur}
          onChange={handleInputChange}
          name={name}
          label={label}
          value={state.value.name}
        />
        <button onClick={toggleOptions} type="button">
          <AiFillCaretDown
            className={visible ? `${styles.icon} ${styles.up}` : styles.icon}
          />
        </button>
      </div>
      <div
        className={
          visible ? `${styles.menu_list} ${styles.visible}` : styles.menu_list
        }
        style={{ zIndex: z_index ?? 3 }}
      >
        <ul className={styles.list} onMouseDown={handleSelect}>
          {displayedOptions &&
            displayedOptions.map((option, index) => (
              <li
                className={
                  Number(index) === state.selected && visible
                    ? styles.selected
                    : ""
                }
                ref={(ref) => (liRefs.current[index] = ref)}
                key={option.id}
                data-links={option?.links ?? ""}
                data-id={option?.id}
                data-index={index}
              >
                {option.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
