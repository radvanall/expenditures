import { FC, HTMLAttributes } from "react";
import styles from "./Radiobox.module.css";
interface Radiobox extends HTMLAttributes<HTMLInputElement> {
  name: string;
  id?: string;
  label: string;
  labelFontWeight?: string;
  value: string;
  checked: boolean;
}
const Radiobox: FC<Radiobox> = ({
  label,
  name,
  id,
  value,
  labelFontWeight,
  checked,
  ...props
}) => {
  return (
    <div className={styles.radiobox__container}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        {...props}
      />
      <label htmlFor={id} style={{ fontWeight: labelFontWeight ?? "500" }}>
        {label}
      </label>
    </div>
  );
};

export default Radiobox;
