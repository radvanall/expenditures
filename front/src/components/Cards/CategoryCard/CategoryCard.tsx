import { useEffect, useState } from "react";
import useGetReq from "../../../services/hooks/useGetReq";
import AddCategoryModal from "../../Modals/AddCategoryModal/AddCategoryModal";
import ProgressBar from "../../ProgressBar/ProgressBar";
import Table from "../../Table/Table";
import { newCategory } from "../../../data/loginInputFields";
import Card from "../Card/Card";
import BasicButton from "../../Buttons/BasicButton/BasicButton";
import { useMountTransition } from "../../../services/hooks/useMountTransition";
import MessageModal from "../../Modals/MessageModal/MessageModal";
import usePost from "../../../services/hooks/usePost";
import styles from "./CategoryCard.module.css";
import ImgButton from "../../Buttons/ImgButton/ImgButton";
import { FiRefreshCcw } from "react-icons/fi";
import { useTranslation } from "react-i18next";

type categoriesT = {
  id: number;
  "Category name": string;
  "Number of items": number;
  "Total price": number;
};
type CategoryTableT = {
  categories: categoriesT[];
};

type categoriesElementsT = {
  id: number;
  [key: string]: string | number | JSX.Element;
};

const CategoryCard = () => {
  const { data, fetchData } = useGetReq<CategoryTableT>(
    "http://localhost:84/expenditures/back/public/category.php?request=get_category_table"
  );
  const { makePostRequest } = usePost(
    "http://localhost:84/expenditures/back/public/category.php",
    "delete"
  );
  const [cateogries, setCategories] = useState<categoriesElementsT[]>([]);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryId, setCategoryId] = useState(-1);
  const [requestType, setRequestType] = useState("insert");
  const hasTransitionedIn = useMountTransition(modal, 300);
  const { t } = useTranslation(["CategoryCard"]);

  useEffect(() => {
    if (data?.categories.length) {
      const totalPrice = data?.categories[0]["Total price"];
      const newArray: categoriesElementsT[] = data?.categories.map(
        (category, index) => {
          return {
            id: category.id,
            [t("categoryName")]: category["Category name"],
            [t("numberOfItems")]: category["Number of items"],

            [t("totalPrice")]: (
              <ProgressBar
                value={category["Total price"] as number}
                max={totalPrice as number}
                additionalLabel="$"
                key={index}
              />
            ),
          };
        }
      );
      setCategories(newArray);
    }
  }, [data, t]);
  const handleEdit = (id: number) => {
    const category = data?.categories.find((category) => category.id === id);
    setRequestType("update");
    newCategory[0].defaultValue = category?.["Category name"] ?? "";
    if (category?.id) setCategoryId(category?.id);
    setModal(true);
  };
  const handleAdd = () => {
    newCategory[0].defaultValue = "";
    setRequestType("insert");
    setModal(true);
  };
  const handleOpenDeleteMessage = (id: number) => {
    setCategoryId(id);
    setDeleteModal(true);
  };
  const handleDelete = () => {
    makePostRequest({
      id: categoryId,
    });
    fetchData();
    setCategoryId(-1);
  };
  const handleCancel = () => {
    newCategory[0].defaultValue = "";
    setCategoryId(-1);
  };
  useEffect(() => {
    if (!modal) {
      newCategory[0].defaultValue = "";
    }
  }, [modal]);
  return (
    <Card>
      <div className={styles.add__category__wrapper}>
        <BasicButton text={t("addCategory")} handleClick={handleAdd} />
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
        <AddCategoryModal
          inputFields={newCategory}
          visible={modal && hasTransitionedIn}
          setVisible={setModal}
          fetchData={fetchData}
          request={requestType}
          Id={requestType === "update" ? categoryId : undefined}
        />
      )}
      {cateogries && (
        <div className={styles.table__wrapper}>
          <Table<categoriesElementsT>
            tableTitle={t("categories") as string}
            tableFields={cateogries}
            bodyHeight="320px"
            buttonPading="10px"
            handleEdit={handleEdit}
            handleDelete={handleOpenDeleteMessage}
            customColumnWidth={{ columnName: t("totalPrice"), width: 40 }}
          />
        </div>
      )}
    </Card>
  );
};

export default CategoryCard;
