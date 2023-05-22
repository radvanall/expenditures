import React, { ReactNode } from "react";
export default interface InputProps {
  children?: ReactNode;
  defaultValue?: string | number;
  value?: string | number;
  width?: string;
  min?: string;
  type: string;
  label?: string;
  name: string;
  borderColor?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}
