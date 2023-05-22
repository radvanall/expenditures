import { IconType } from "react-icons";
export type InputType = {
  id: number;
  name: string;
  label?: string;
  icon?: IconType;
  defaultValue?: string | number;
  value?: string | number;
  type: string;
  border: string;
  key: string;
};
