import React, { FC } from "react";
import styles from "./ProgressBar.module.css";
export interface ProgressBarI
  extends React.ProgressHTMLAttributes<HTMLProgressElement> {}

const ProgressBar: FC<ProgressBarI> = ({ max, value }) => {
  return (
    <div className={styles.progress__bar__wrapper}>
      <progress max={max} value={value} className={styles.progress__bar} />
      <label>{value}</label>
    </div>
  );
};

export default ProgressBar;
