import { createContext, FC, ReactNode, useContext } from "react";

import { useInvoiceContext } from "./useInvoiceContext";
import { initInvoiceContextState } from "./initInvoiceContextType";

interface Props {
  children: ReactNode;
}
const InvoiceContext = createContext<typeof initInvoiceContextState>(
  initInvoiceContextState
);
export const InvoiceProvider: FC<Props> = ({ children }) => {
  return (
    <InvoiceContext.Provider value={useInvoiceContext()}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  return useContext(InvoiceContext);
};
