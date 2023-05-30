import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import ShowInvoicesTable from "../../components/ShowInvoicesTable/ShowInvoicesTable";
import useGetReq from "../../services/hooks/useGetReq";
import styles from "./Invoices.module.css";
import { usePagination } from "../../services/hooks/usePagination";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { InvoicesProvider, useInvoicesContext } from "./InvoincesContext";

const Invoices = () => {
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
  // const {
  //   offset,
  //   firstRow,
  //   nrOfPages,
  //   selected,
  //   changeFirstRow,
  //   goToStart,
  //   goToEnd,
  //   setRowCount,
  //   setOffset,
  // } = usePagination();
  // const { data, loading, error, fetchData } = useGetReq<dataTable>(
  //   `/invoice.php?request=get_table_invoice&firstRow=${firstRow}&offset=${offset}&date=${
  //     defaultFormValues.date_radio === "date" ? defaultFormValues.first_date : 0
  //   }&`
  // );
  // useEffect(() => {
  //   if (data?.row_count) setRowCount(data?.row_count);
  // }, [data]);
  // useEffect(() => {
  //   fetchData();
  // }, [firstRow, offset]);

  // console.log(data && data);
  return (
    <InvoicesProvider>
      <div className={styles.invoice_wrapper}>
        <div className={styles.invoice_menu}>
          <FilterMenu />
        </div>

        <div className={styles.invoice_table}>
          <ShowInvoicesTable />
          {/* {data && (
          <ShowInvoicesTable
            data={data.invoices}
            nr_of_pages={nrOfPages}
            selected={selected}
            changeFirstRow={changeFirstRow}
            goToStart={goToStart}
            goToEnd={goToEnd}
          />
        )} */}
        </div>
      </div>
    </InvoicesProvider>
  );
};

export default Invoices;
