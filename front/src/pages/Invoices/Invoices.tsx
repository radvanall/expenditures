import ShowInvoicesTable from "../../components/ShowInvoicesTable/ShowInvoicesTable";
import styles from "./Invoices.module.css";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { InvoicesProvider } from "./InvoincesContext";

const Invoices = () => {
  return (
    <InvoicesProvider>
      <div className={styles.invoice_wrapper}>
        <div className={styles.invoice_menu}>
          <FilterMenu />
        </div>
        <div className={styles.invoice_table}>
          <ShowInvoicesTable />
        </div>
      </div>
    </InvoicesProvider>
  );
};

export default Invoices;
