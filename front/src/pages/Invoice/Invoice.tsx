import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";
import { recordType } from "../../Interfaces/RecordType";
import Table from "../../components/Table/Table";
import useGetReq from "../../services/hooks/useGetReq";
import usePost from "../../services/hooks/usePost";
import styles from "./Invoice.module.css";
import BasicButton from "../../components/Buttons/BasicButton/BasicButton";
import MessageModal from "../../components/Modals/MessageModal/MessageModal";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon";

type InvoiceType = {
  id: number;
  date: string;
  user_id: number;
  total_sum: number;
  records: recordType[];
};
type TableType = {
  id: number;
  [key: string]: string | number;
};
const Invoice = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [deleteMessageModal, setDeleteMessageModal] = useState<boolean>(false);
  const [formState, setFormState] = useState<"edit" | "create">("edit");
  const { id } = useParams();
  const { data, loading, error, fetchData } = useGetReq<InvoiceType>(
    `/invoice.php?request=get_full_invoice&invoice_id=${id}`
  );
  const { message, makePostRequest } = usePost(
    "http://localhost:84/expenditures/public/record.php",
    "delete"
  );
  const [records, setRecords] = useState<TableType[] | undefined | null>();
  const [currentRecord, setCurrentRecord] = useState<recordType | null>(null);
  const { t } = useTranslation(["invoice"]);
  const { t: t2 } = useTranslation(["chart"]);
  useEffect(() => {
    if (!data?.records) {
      setRecords(null);
      return;
    }
    const tableData: TableType[] | undefined = data?.records.map((record) => {
      return {
        id: record.id,
        [t("item")]: record.item_name,
        [t("category")]: record.category_name,
        [t("quantity")]: record.quantity,
        [t("unit")]: record.unit,
        [t("price")]: record.price,
        [t("totalPrice")]: record.total_price,
      };
    });
    setRecords(tableData);
  }, [data, t, message]);
  const closeModal = () => {
    setCurrentRecord(null);
    setModal(false);
  };
  const handleEdit = (id: number) => {
    setFormState("edit");
    const record = data?.records.find((record) => record.id === id);
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
        <p>{t("deleteMessage")}</p>
        <br />
      </MessageModal>
      <div className={styles.new__record__button}>
        <BasicButton text={t("add")} type="button" handleClick={createRecord} />
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
        <h4>{t("title")}</h4>
        <div className={styles.invoice__data}>
          <div>
            <p>
              {t("id")}: {data?.id}
            </p>
            <p>
              {t("date")}:{" "}
              {DateTime.fromISO(data?.date as string)
                .setLocale(t2("luxonLocale"))
                .toFormat("d,MMM,yyyy")}
            </p>
            <p>
              {t("totalPrice")}: {data?.total_sum} $
            </p>
          </div>
        </div>
        {}
        <Table<TableType>
          tableFields={records ?? undefined}
          handleEdit={handleEdit}
          handleDelete={openDeleteModal}
          tableTitle={t("records") as string}
        />
      </div>
    </div>
  );
};

export default Invoice;
