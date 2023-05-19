import React, { FC, ReactNode } from "react";

import { SelectI } from "../../Interfaces/SelectI";
import Select from "../Select/Select";
import styles from "./SelectFormField.module.css";
interface Props {
  name: string;
  label: string;
  options: SelectI[] | null;
  displayedOptions?: SelectI[] | null;
  defaultValue?: SelectI | null;
  color?: string;
  width?: string;
  setDisplayedOptions: React.Dispatch<React.SetStateAction<SelectI[] | null>>;
  handleCallback?: (id: SelectI) => void;
  errors: string | undefined;
  children?: ReactNode;
  z_index?: number;
}

const SelectFormField: FC<Props> = ({
  name,
  label,
  options,
  displayedOptions,
  setDisplayedOptions,
  defaultValue,
  handleCallback,
  children,
  errors,
  color,
  width,
  z_index,
}) => {
  return (
    <div className={styles.input__wrapper}>
      <Select
        name={name}
        label={label}
        options={options}
        displayedOptions={displayedOptions}
        setDisplayedOptions={setDisplayedOptions}
        defaultValue={defaultValue}
        handleCallback={handleCallback}
        color={color ?? ""}
        width={width ?? "75%"}
        z_index={z_index}
      />
      {children && <div className={styles.buttons_container}>{children}</div>}
      {errors && <span className={styles.error__message}>{errors}</span>}
    </div>
  );
};

export default SelectFormField;
