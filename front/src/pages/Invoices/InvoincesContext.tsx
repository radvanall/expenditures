import useInvoices, {
  defaultFormValues,
  defaultFormValuesType,
  tableData,
} from "./useInvoices";

import { createContext, FC, ReactNode, useContext } from "react";
interface Props {
  children: ReactNode;
}

type initDataType = {
  tableData: undefined | tableData[];
  nrOfPages: number;
  maxPrice: number | undefined;
  selected: number;
  formData: defaultFormValuesType;
  isChecked: { range: boolean; date: boolean };
  handleDetails: (id: number) => void;
  changeFirstRow: (nr: number) => void;
  goToStart: () => void;
  goToEnd: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const initData: initDataType = {
  tableData: undefined,
  maxPrice: 0,
  nrOfPages: 0,
  selected: 1,
  formData: defaultFormValues,
  isChecked: { range: false, date: false },
  handleDetails: (id: number) => {},
  changeFirstRow: (nr: number) => {},
  goToStart: () => {},
  goToEnd: () => {},
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {},
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleRadioClick: (e: React.MouseEvent<HTMLInputElement>) => {},
};
const InvoicesContext = createContext(initData);
export const InvoicesProvider: FC<Props> = ({ children }) => {
  return (
    <InvoicesContext.Provider value={useInvoices()}>
      {children}
    </InvoicesContext.Provider>
  );
};

export const useInvoicesContext = () => {
  return useContext(InvoicesContext);
};
