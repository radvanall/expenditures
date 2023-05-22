import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import ShowInvoicesTable from "../../components/ShowInvoicesTable/ShowInvoicesTable";
import useGetReq from "../../services/hooks/useGetReq";
import styles from "./Invoices.module.css";
import { usePagination } from "../../services/hooks/usePagination";
import FilterMenu from "../../components/FilterMenu/FilterMenu";

type InvoiceTable = {
  id: number;
  date: string;
  quantity: number;
  nr_of_records: number;
  total_price: number;
};
interface dataTable {
  invoices: InvoiceTable[];
  row_count: number;
}

const Invoices = () => {
  const {
    offset,
    firstRow,
    nrOfPages,
    selected,
    changeFirstRow,
    goToStart,
    goToEnd,
    setRowCount,
    setOffset,
  } = usePagination();
  const { data, loading, error, fetchData } = useGetReq<dataTable>(
    `/invoice.php?request=get_table_invoice&firstRow=${firstRow}&offset=${offset}`
  );
  useEffect(() => {
    if (data?.row_count) setRowCount(data?.row_count);
  }, [data]);
  useEffect(() => {
    fetchData();
  }, [firstRow, offset]);

  console.log(data && data);
  return (
    <div className={styles.invoice_wrapper}>
      <div className={styles.invoice_menu}>
        <FilterMenu />
      </div>

      <div className={styles.invoice_table}>
        {data && (
          <ShowInvoicesTable
            data={data.invoices}
            nr_of_pages={nrOfPages}
            selected={selected}
            changeFirstRow={changeFirstRow}
            goToStart={goToStart}
            goToEnd={goToEnd}
          />
        )}
      </div>
    </div>
  );
};

export default Invoices;
