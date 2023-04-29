import React, { ReactNode, ReactElement, FC } from "react";
import BasicInput from "../BasicInput/BasicInput";
import styles from "./IconInput.module.css";
interface Props {
  children: ReactNode;
  width?: string;
}
const IconInput: FC<Props> = ({ children, width }) => {
  return (
    <div style={{ width: width ?? "100%" }} className={styles.wrapper}>
      <div className={styles.icon_container}>{children}</div>
      <BasicInput />
    </div>
  );
};

export default IconInput;
