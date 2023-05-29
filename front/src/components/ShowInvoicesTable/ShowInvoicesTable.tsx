import React, { FC } from "react";
import Table from "../../components/Table/Table";
import Pagination from "../Pagination/Pagination";
import styles from "./ShowInvoicesTable.module.css";
import { useInvoicesContext } from "../../pages/Invoices/InvoincesContext";
type InvoiceTable = {
  id: number;
  date: string;
  quantity: number;
  nr_of_records: number;
  total_price: number;
};

// type ShowInvoicesTableProps = {
//   data: InvoiceTable[];
//   nr_of_pages: number;
//   selected: number;
//   changeFirstRow: (nr: number) => void;
//   goToStart: () => void;
//   goToEnd: () => void;
// };
// const ShowInvoicesTable: FC<ShowInvoicesTableProps> = (
const ShowInvoicesTable = (
  {
    // data,
    // nr_of_pages,
    // selected,
    // changeFirstRow,
    // goToStart,
    // goToEnd,
  }
) => {
  const {
    data,
    goToStart,
    goToEnd,
    changeFirstRow,
    handleDetails,
    nrOfPages,
    selected,
  } = useInvoicesContext();
  return (
    <div className={styles.table__wrapper}>
      <Table<InvoiceTable>
        tableFields={data?.invoices}
        handleDetails={handleDetails}
        tableTitle={"Invoices"}
      />
      <Pagination
        goToStart={goToStart}
        goToEnd={goToEnd}
        changeFirstRow={changeFirstRow}
        nr_of_pages={nrOfPages}
        selected={selected}
      />
      {/* <div>
        <button onClick={goToStart}>Beginning</button>
        {Array.from({ length: nr_of_pages }, (_, index) => (
          <button key={index + 1} onClick={() => changeFirstRow(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={goToEnd}>End</button>
      </div> */}
    </div>
  );
};

export default ShowInvoicesTable;
