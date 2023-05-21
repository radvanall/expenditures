import styles from "./NewInvoice.module.css";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";
import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
import { InvoiceProvider } from "../../context/InvoiceContext/InvoiceContext";
const NewInvoice = () => {
  return (
    <div className={styles.invoice_wrapper}>
      <InvoiceProvider>
        <div className={styles.invoice_form}>
          <InvoiceForm />
        </div>
        <div className={styles.invoice_table}>
          <InvoiceTable />
        </div>
      </InvoiceProvider>
    </div>
  );
};

export default NewInvoice;
