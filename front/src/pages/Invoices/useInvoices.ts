import React, { useEffect, useState } from "react";
import useGetReq from "../../services/hooks/useGetReq";
import { usePagination } from "../../services/hooks/usePagination";

const useInvoices = () => {
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
  const defaultFormValues = {
    date_radio: "",
    date: new Date().toISOString().slice(0, 10),
    first_date: new Date().toISOString().slice(0, 10),
    last_date: new Date().toISOString().slice(0, 10),
    min_price_checkbox: false,
    min_price: 0,
    max_price_checkbox: false,
    max_price: 0,
  };
  const [formData, setFormData] = useState(defaultFormValues);
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
    `/invoice.php?request=get_table_invoice&firstRow=${firstRow}&offset=${offset}&date=${
      formData.date_radio === "date" ? formData.date : 0
    }&first_date=${
      formData.date_radio === "range" ? formData.first_date : 0
    }&last_date=${
      formData.date_radio === "range" ? formData.last_date : 0
    }&max_price=${
      formData.max_price_checkbox ? formData.max_price : 0
    }&min_price=${formData.min_price_checkbox ? formData.min_price : 0}`
  );
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "min_price_checkbox" || name === "max_price_checkbox") {
      setFormData((prevValues) => ({
        ...prevValues,
        [name]: e.target.checked,
      }));
      return;
    }
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  useEffect(() => {
    if (data?.row_count) setRowCount(data?.row_count);
  }, [data]);
  useEffect(() => {
    fetchData();
  }, [firstRow, offset]);
  return {
    data,
    nrOfPages,
    selected,
    formData,
    changeFirstRow,
    goToStart,
    goToEnd,
    handleSubmit,
    handleFormChange,
  };
};

export default useInvoices;
