import React, { FC } from "react";
import Table from "../../components/Table/Table";
import Pagination from "../Pagination/Pagination";
import styles from "./ShowInvoicesTable.module.css";

type InvoiceTable = {
  id: number;
  date: string;
  quantity: number;
  nr_of_records: number;
  total_price: number;
};

type ShowInvoicesTableProps = {
  data: InvoiceTable[];
  nr_of_pages: number;
  selected: number;
  changeFirstRow: (nr: number) => void;
  goToStart: () => void;
  goToEnd: () => void;
};
const ShowInvoicesTable: FC<ShowInvoicesTableProps> = ({
  data,
  nr_of_pages,
  selected,
  changeFirstRow,
  goToStart,
  goToEnd,
}) => {
  return (
    <div className={styles.table__wrapper}>
      <Table<InvoiceTable>
        tableFields={data}
        handleDetails={() => {}}
        tableTitle={"Invoices"}
      />
      <Pagination
        goToStart={goToStart}
        goToEnd={goToEnd}
        changeFirstRow={changeFirstRow}
        nr_of_pages={nr_of_pages}
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
