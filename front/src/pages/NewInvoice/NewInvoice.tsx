import React from "react";
import styles from "./NewInvoice.module.css";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";
import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
const NewInvoice = () => {
  return (
    <div className={styles.invoice_wrapper}>
      <div className={styles.invoice_form}>
        <InvoiceForm />
      </div>
      <div className={styles.invoice_table}>
        <InvoiceTable />
      </div>
    </div>
  );
};

export default NewInvoice;
