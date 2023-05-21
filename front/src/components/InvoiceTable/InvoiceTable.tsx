import React, { FC, useEffect, useState } from "react";
import styles from "./InvoiceTable.module.css";
import Table from "../Table/Table";
import { useInvoice } from "../../context/InvoiceContext/InvoiceContext";
import Pending from "../Pending/Pending";
import BasicButton from "../Buttons/BasicButton/BasicButton";
import { useMountTransition } from "../../services/hooks/useMountTransition";
import MessageModal from "../Modals/MessageModal/MessageModal";
interface tableField {
  id: number;
  category: string;
  item: string;
  price: number;
  quantity: number;
  total: number;
}
const InvoiceTable = () => {
  const {
    tableData,
    handleEdit,
    handleDelete,
    handleSave,
    handleResetRecords,
    pending,
    error,
    answer,
  } = useInvoice();
  const [visible, setVisible] = useState(false);
  const [serverAnswer, setServerAnswer] = useState(false);
  const tableTitle = "Records";
  const submitRecords = () => {
    setServerAnswer(true);
    handleSave();
  };
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(
      tableData
        ? tableData?.reduce((accumulator, field) => {
            return accumulator + field.total;
          }, 0)
        : 0
    );
  }, [tableData]);
  return (
    <div className={styles.table__wrapper}>
      <MessageModal
        visible={visible}
        setVisible={setVisible}
        handleOk={handleResetRecords}
        cancelButton={true}
      >
        <h4>{"The records will be lost."}</h4>
      </MessageModal>

      <MessageModal
        visible={serverAnswer}
        setVisible={setServerAnswer}
        handleOk={() => setServerAnswer(false)}
      >
        {pending ? <Pending /> : error ? <h4>{error}</h4> : <h4>{answer}</h4>}
      </MessageModal>

      <Table<tableField>
        tableTitle={tableTitle}
        tableFields={tableData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <div className={styles.footer}>
        <h4>{`Total price: ${totalPrice}`}</h4>
      </div>
      <div className={styles.buttons__wrapper}>
        <BasicButton
          text="Save"
          height="26px"
          color="blue"
          handleClick={submitRecords}
        />
        <BasicButton
          text="Delete all records"
          height="26px"
          color="pink"
          handleClick={() => setVisible(true)}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
