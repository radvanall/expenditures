import { FC, HTMLAttributes } from "react";
import styles from "./ToggleSlider.module.css";
interface Props extends HTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  checked?: boolean;
}
const ToggleSlider: FC<Props> = ({ id, name, checked, ...props }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} name={name} id={id} {...props} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSlider;
