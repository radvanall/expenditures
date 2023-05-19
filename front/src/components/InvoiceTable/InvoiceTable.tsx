import React, { FC } from "react";
import styles from "./InvoiceTable.module.css";
import Table from "../Table/Table";
import { useInvoice } from "../../context/InvoiceContext/InvoiceContext";
interface tableField {
  // [index: string]: string | number;
  id: number;
  category: string;
  item: string;
  price: number;
  quantity: number;
  total: number;
}
interface Props {}
const InvoiceTable: FC<Props> = () => {
  const { tableData, handleEdit, handleDelete, handleSave } = useInvoice();
  return (
    <div>
      <Table
        tableFields={tableData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSave={handleSave}
      />
    </div>
  );
};

export default InvoiceTable;
