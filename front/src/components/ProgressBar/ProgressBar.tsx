import React, { FC } from "react";
import styles from "./ProgressBar.module.css";
export interface ProgressBarI
  extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  additionalLabel?: string;
}

const ProgressBar: FC<ProgressBarI> = ({ max, value, additionalLabel }) => {
  return (
    <div className={styles.progress__bar__wrapper}>
      <progress max={max} value={value} className={styles.progress__bar} />
      <label>{additionalLabel ? `${value}  ${additionalLabel}` : value}</label>
    </div>
  );
};

export default ProgressBar;
