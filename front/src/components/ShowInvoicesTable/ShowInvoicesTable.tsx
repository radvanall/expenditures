import Table from "../../components/Table/Table";
import Pagination from "../Pagination/Pagination";
import styles from "./ShowInvoicesTable.module.css";
import { useInvoicesContext } from "../../pages/Invoices/InvoincesContext";
import { useTranslation } from "react-i18next";
// type InvoiceTable = {
//   id: number;
//   date: string;
//   quantity: number;
//   nr_of_records: number;
//   total_price: number;
// };
export interface tableData {
  id: number;
  [key: string]: string | number;
}
const ShowInvoicesTable = () => {
  const {
    tableData,
    goToStart,
    goToEnd,
    changeFirstRow,
    handleDetails,
    nrOfPages,
    selected,
  } = useInvoicesContext();
  const { t } = useTranslation(["invoicesTable"]);
  return (
    <div className={styles.table__wrapper}>
      <Table<tableData>
        tableFields={tableData}
        handleDetails={handleDetails}
        tableTitle={t("title") as string}
      />
      <Pagination
        goToStart={goToStart}
        goToEnd={goToEnd}
        changeFirstRow={changeFirstRow}
        nr_of_pages={nrOfPages}
        selected={selected}
      />
    </div>
  );
};

export default ShowInvoicesTable;
