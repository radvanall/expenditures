import { InputType } from "./InputType";

export interface AddModalI {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputFields: InputType[];
  fetchData: (() => void) | (() => Promise<void>);
  request?: string;
  Id?: number;
}
