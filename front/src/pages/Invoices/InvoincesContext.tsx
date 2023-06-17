import useInvoices, {
  defaultFormValues,
  defaultFormValuesType,
  dataTable,
  tableData,
} from "./useInvoices";
import { createContext, FC, ReactNode, useContext } from "react";
interface Props {
  children: ReactNode;
}
// const defaultFormValues = {
//   date_radio: "",
//   date: new Date().toISOString().slice(0, 10),
//   first_date: new Date().toISOString().slice(0, 10),
//   last_date: new Date().toISOString().slice(0, 10),
//   min_price_checkbox: false,
//   min_price: 0,
//   max_price_checkbox: false,
//   max_price: 0,
// };
// const { data,
//     nrOfPages,
//     selected,
//     formData,
//     changeFirstRow,
//     goToStart,
//     goToEnd,
//     handleSubmit,
//     handleFormChange}=useInvoices();
type InvoiceTable = {
  id: number;
  date: string;
  quantity: number;
  nr_of_records: number;
  total_price: number;
};

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
