import React, { useEffect, useState } from "react";
import useGetReq from "../../services/hooks/useGetReq";
import { usePagination } from "../../services/hooks/usePagination";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const defaultFormValues = {
  date_radio: "",
  date: new Date().toISOString().slice(0, 10),
  first_date: new Date().toISOString().slice(0, 10),
  last_date: new Date().toISOString().slice(0, 10),
  min_price_checkbox: false,
  min_price: 0,
  max_price_checkbox: false,
  max_price: 0,
};
export type defaultFormValuesType = typeof defaultFormValues;
type InvoiceTable = {
  id: number;
  date: string;
  quantity: number;
  nr_of_records: number;
  total_price: number;
};
export interface dataTable {
  invoices: InvoiceTable[];
  row_count: number;
  max_price: number;
}
export interface tableData {
  id: number;
  [key: string]: string | number;
}
const useInvoices = () => {
  const { t } = useTranslation(["invoicesTable"]);
  const { t: t2 } = useTranslation(["chart"]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormValues);
  const [tableData, setTableData] = useState<tableData[]>([]);
  const [isChecked, setIsChecked] = useState({
    date: false,
    range: false,
  });

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
    if (value === "date") {
      setIsChecked((prevValues) => ({
        date: true,
        range: false,
      }));
    }
    if (value === "range") {
      setIsChecked((prevValues) => ({
        range: true,
        date: false,
      }));
    }
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleRadioClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (formData.date_radio === value) {
      setFormData((prevValues) => ({
        ...prevValues,
        [name]: "",
      }));
      setIsChecked((prevValues) => ({
        ...prevValues,
        [value]: false,
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    goToStart();
  };
  const handleDetails = (id: number) => {
    navigate(id);
  };
  useEffect(() => {
    if (data?.row_count) setRowCount(data?.row_count);
    if (data?.invoices) {
      const newArray = data.invoices.map((invoice) => ({
        id: invoice.id,
        [t("date")]: DateTime.fromISO(invoice.date)
          .setLocale(t2("luxonLocale"))
          .toFormat("d,MMM,yyyy"),
        [t("quantity")]: invoice.quantity,
        [t("nrOfRecords")]: invoice.nr_of_records,
        [t("totalPrice")]: invoice.total_price,
      }));
      setTableData(newArray);
    }
  }, [data, t]);
  useEffect(() => {
    fetchData();
  }, [firstRow, offset]);
  return {
    tableData,
    maxPrice: data?.max_price,
    nrOfPages,
    selected,
    formData,
    isChecked,
    handleDetails,
    handleRadioClick,
    changeFirstRow,
    goToStart,
    goToEnd,
    handleSubmit,
    handleFormChange,
  };
};

export default useInvoices;
