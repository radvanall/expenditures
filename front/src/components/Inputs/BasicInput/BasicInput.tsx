import React, { FC } from "react";
import styles from "./BasicInput.module.css";
import Input from "../Input/Input";
interface Props {
  width?: string;
}
const BasicInput: FC<Props> = ({ width }) => {
  return (
    <div style={{ width: width ?? "100%" }}>
      <Input styles={styles} />
    </div>
  );
};

export default BasicInput;
