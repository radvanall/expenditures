import React, { FC, useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import useGetReq from "../../../services/hooks/useGetReq";
import ProgressBar, { ProgressBarI } from "../../ProgressBar/ProgressBar";
import Table from "../../Table/Table";
import { newItem } from "../../../data/loginInputFields";
import Card from "../Card/Card";
import BasicButton from "../../Buttons/BasicButton/BasicButton";
import { useMountTransition } from "../../../services/hooks/useMountTransition";
import MessageModal from "../../Modals/MessageModal/MessageModal";
import usePost from "../../../services/hooks/usePost";
import styles from "./ItemCard.module.css";
import AddItemModal from "../../Modals/AddItemModal/AddItemModal";
import ImgButton from "../../Buttons/ImgButton/ImgButton";
import { useTranslation } from "react-i18next";

type ItemsT = {
  id: number;
  [key: string]: string | number | JSX.Element;
  // category_id?: number;
  // Item: string;
  // "Category name": string;
  // Unit: string;
  // "Total price": number | JSX.Element;
};
type ItemTableT = {
  items: ItemsT[];
};

// type itemsElementsT = {
//   id: number;
//   "Category name": string;
//   "Number of items": number;
//   "Total price": JSX.Element;
// };
const ItemCard = () => {
  const { data, loading, error, fetchData } = useGetReq<ItemTableT>(
    "http://localhost:84/expenditures/public/item.php?request=get_item_table"
  );
  const {
    error: postError,
    pending,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost("http://localhost:84/expenditures/public/item.php", "delete");
  const [items, setItems] = useState<ItemsT[]>([]);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemId, setItemId] = useState(-1);
  const [requestType, setRequestType] = useState("insert");
  const hasTransitionedIn = useMountTransition(modal, 300);
  const { t } = useTranslation(["itemCard"]);
  const getItems = () => {
    if (data?.items.length) {
      const totalPrice = data?.items[0]["Total price"];
      const newArray: ItemsT[] = data?.items.map((item, index) => {
        return {
          id: item.id,
          // Item: item["Item"],
          // "Category name": item["Category name"],
          // Unit: item["Unit"],
          [t("items")]: item["Item"],
          [t("categoryName")]: item["Category name"],
          [t("unit")]: item["Unit"],
          [t("totalPrice")]: (
            <ProgressBar
              value={item["Total price"] as number}
              max={totalPrice as number}
              additionalLabel="lei"
              key={index}
            />
          ),
        };
      });
      setItems(newArray);
    }
    console.log(data);
  };
  useEffect(() => {
    getItems();
  }, [data, t]);
  const handleEdit = (id: number) => {
    const item = data?.items.find((item) => item.id === id);
    console.log("fetched:", item);
    setRequestType("update");
    newItem[0].defaultValue = (item?.["Item"] as string) ?? "";
    newItem[1].defaultValue = (item?.Unit as string) ?? "";
    newItem[2].defaultValue = item?.category_id?.toString() ?? "";
    newItem[3].defaultValue = (item?.["Category name"] as string) ?? "";
    if (item) setItemId(item.id);
    setModal(true);
  };
  const handleAdd = () => {
    newItem[0].defaultValue = "";
    newItem[1].defaultValue = "";
    newItem[2].defaultValue = "";
    newItem[3].defaultValue = "";
    setRequestType("insert");
    setModal(true);
  };
  const handleOpenDeleteMessage = (id: number) => {
    setItemId(id);
    setDeleteModal(true);
  };
  const handleDelete = () => {
    makePostRequest({
      id: itemId,
    });
    fetchData();
    setItemId(-1);
  };
  const handleCancel = () => {
    setItemId(-1);
  };
  useEffect(() => {
    if (!modal) {
      newItem[0].defaultValue = "";
      newItem[1].defaultValue = "";
      newItem[2].defaultValue = "";
      newItem[3].defaultValue = "";
    }
  }, [modal]);
  return (
    <Card>
      <div className={styles.add__item__wrapper}>
        <BasicButton text={t("addItems")} handleClick={handleAdd} />
        <ImgButton
          color="pink"
          handleClick={() => {
            fetchData();
          }}
        >
          <FiRefreshCcw />
        </ImgButton>
      </div>

      <MessageModal
        visible={deleteModal}
        setVisible={setDeleteModal}
        handleOk={handleDelete}
        cancelButton={true}
        handleCancel={handleCancel}
      >
        {t("deleteMessage")}
      </MessageModal>
      {(modal || hasTransitionedIn) && (
        <AddItemModal
          inputFields={newItem}
          visible={modal && hasTransitionedIn}
          setVisible={setModal}
          fetchData={fetchData}
          request={requestType}
          Id={requestType === "update" ? itemId : undefined}
        />
      )}
      {items && (
        <div className={styles.table__wrapper}>
          <Table<ItemsT>
            tableTitle={t("items") as string}
            tableFields={items}
            bodyHeight="320px"
            buttonPading="10px"
            handleEdit={handleEdit}
            handleDelete={handleOpenDeleteMessage}
            customColumnWidth={{ columnName: t("totalPrice"), width: 30 }}
          />
        </div>
      )}
    </Card>
  );
};

export default ItemCard;
