import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";
import { recordType } from "../../Interfaces/RecordType";
import Table from "../../components/Table/Table";
import useGetReq from "../../services/hooks/useGetReq";
import usePost from "../../services/hooks/usePost";
import styles from "./Invoice.module.css";
import BasicButton from "../../components/Buttons/BasicButton/BasicButton";
import MessageModal from "../../components/Modals/MessageModal/MessageModal";
type InvoiceType = {
  id: number;
  date: string;
  user_id: number;
  total_sum: number;
  records: recordType[];
};
type TableType = {
  id: number;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  "Total price": number;
};
const Invoice = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [deleteMessageModal, setDeleteMessageModal] = useState<boolean>(false);
  const [formState, setFormState] = useState<"edit" | "create">("edit");
  const { id } = useParams();
  const { data, loading, error, fetchData } = useGetReq<InvoiceType>(
    `/invoice.php?request=get_full_invoice&invoice_id=${id}`
  );
  const {
    error: postError,
    pending,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost("http://localhost:84/expenditures/public/record.php", "delete");
  const [records, setRecords] = useState<TableType[] | undefined | null>();
  const [currentRecord, setCurrentRecord] = useState<recordType | null>(null);
  useEffect(() => {
    if (!data?.records) {
      setRecords(null);
      return;
    }
    const tableData: TableType[] | undefined = data?.records.map((record) => {
      return {
        id: record.id,
        item: record.item_name,
        category: record.category_name,
        quantity: record.quantity,
        unit: record.unit,
        price: record.price,
        ["Total price"]: record.total_price,
      };
    });
    setRecords(tableData);
  }, [data]);
  const closeModal = () => {
    setCurrentRecord(null);
    setModal(false);
  };
  const handleEdit = (id: number) => {
    setFormState("edit");
    const record = data?.records.find((record) => record.id === id);

    console.log(record);
    if (record) setCurrentRecord(record);
    setModal(true);
  };
  const createRecord = () => {
    setFormState("create");
    setModal(true);
  };
  const openDeleteModal = (id: number) => {
    const record = data?.records.find((record) => record.id === id);
    if (record) setCurrentRecord(record);
    setDeleteMessageModal(true);
  };
  const handleDelete = () => {
    makePostRequest({
      id: currentRecord?.id,
    });
    fetchData();
    setCurrentRecord(null);
  };
  const handleCancel = () => {
    setCurrentRecord(null);
  };
  return (
    <div className={styles.invoice__page}>
      <MessageModal
        visible={deleteMessageModal}
        setVisible={setDeleteMessageModal}
        handleOk={handleDelete}
        cancelButton={true}
        handleCancel={handleCancel}
      >
        <p>Are you sure you want to delete this record?</p>
        <br />
      </MessageModal>
      <div className={styles.new__record__button}>
        <BasicButton
          text="Add new record"
          type="button"
          handleClick={createRecord}
        />
      </div>

      <EditForm
        visible={modal}
        setVisible={closeModal}
        formState={formState}
        record={currentRecord}
        invoice_id={data?.id}
        fetchData={fetchData}
      />

      <div className={styles.invoice__wrapper}>
        <h4>Invoice</h4>
        <div className={styles.invoice__data}>
          <div>
            <p>Invoice id: {data?.id}</p>
            <p>Date: {data?.date}</p>
            <p>Invoice price: {data?.total_sum} lei</p>
          </div>
        </div>
        {}
        <Table<TableType>
          tableFields={records ?? undefined}
          handleEdit={handleEdit}
          handleDelete={openDeleteModal}
          tableTitle={"Records"}
        />
      </div>
    </div>
  );
};

export default Invoice;
