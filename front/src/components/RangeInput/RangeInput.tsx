import { FC, HTMLAttributes } from "react";
import styles from "./RangeInput.module.css";
interface RangeInput extends HTMLAttributes<HTMLInputElement> {
  name: string;
  value?: number;
  unit?: string;
  min?: number;
  max?: number;
}
const RangeInput: FC<RangeInput> = ({
  name,
  min,
  max,
  value,
  unit = "",
  ...props
}) => {
  return (
    <div className={styles.range__input__container}>
      <div className={styles.range__input__wrapper}>
        <input
          type="range"
          name={name}
          value={value}
          min={min ?? 0}
          max={max ?? 10000}
          {...props}
        />
        <progress value={value} max={max ?? 10000}></progress>
      </div>
      <label>{value + " " + unit}</label>
    </div>
  );
};

export default RangeInput;
