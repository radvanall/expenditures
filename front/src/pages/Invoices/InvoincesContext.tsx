import useInvoices from "./useInvoices";
import { createContext, FC, ReactNode, useContext } from "react";
interface Props {
  children: ReactNode;
}

// const { data,
//     nrOfPages,
//     selected,
//     formData,
//     changeFirstRow,
//     goToStart,
//     goToEnd,
//     handleSubmit,
//     handleFormChange}=useInvoices();
type useInvoicesType = ReturnType<typeof useInvoices>;
const initData = {
  data: null,
};
const InvoicesContext = createContext<useInvoicesType | null>(null);
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
