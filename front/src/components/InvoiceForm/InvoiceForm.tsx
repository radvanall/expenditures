import React, { useEffect, useState, useTransition } from "react";
import styles from "./InvoiceForm.module.css";
import { SelectI } from "../../Interfaces/SelectI";
import { itemTypes, categoryTypes } from "../../Interfaces/keyConversionTypes";
import {
  MdOutlineProductionQuantityLimits,
  MdPriceCheck,
} from "react-icons/md";
import { newItem, newCategory } from "../../data/loginInputFields";
import { useMountTransition } from "../../services/hooks/useMountTransition";
import AddCategoryModal from "../Modals/AddCategoryModal/AddCategoryModal";
import AddItemModal from "../Modals/AddItemModal/AddItemModal";
import useGetRequest from "../../services/hooks/useGetRequest";
import BasicInput from "../Inputs/BasicInput/BasicInput";
import BasicButton from "../Buttons/BasicButton/BasicButton";
import SelectFormField from "../SelectFormField/SelectFormField";
import InputFormField from "../InputFormField/InputFormField";
import { useInvoice } from "../../context/InvoiceContext/InvoiceContext";
import { useTranslation } from "react-i18next";
const InvoiceForm = () => {
  const {
    getReg,
    formState,
    dateState,
    handleDateChange,
    submit,
    handleChangeCategory,
    defaultCategory,
    getError,
    handleChangeItem,
    defaultItem,
    submitChanges,
    setFormState,
  } = useInvoice();
  const [modal, setModal] = useState<boolean>(false);
  const [itemModal, setItemModal] = useState<boolean>(false);
  const hasTransitionedIn = useMountTransition(modal, 300);
  const hasItemTransitionedIn = useMountTransition(itemModal, 300);
  const [displayedItems, setDisplayedItems] = useState<SelectI[] | null>(null);
  const [displayedCategories, setDisplayedCategories] = useState<
    SelectI[] | null
  >(null);
  const { t } = useTranslation(["invoiceForm"]);
  const {
    data: items,
    loading: itemsLoading,
    error: itemsError,
    fetchData: fetchItems,
  } = useGetRequest<SelectI>("/item.php?id=all", itemTypes);
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchData: fetchCategories,
  } = useGetRequest<SelectI>("/category.php?id=all", categoryTypes);
  useEffect(() => {
    setDisplayedItems(items);
  }, [items]);
  useEffect(() => {
    setDisplayedCategories(categories);
  }, [categories]);

  const showAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisplayedItems(items);
  };
  const createNewCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModal(true);
  };
  const createNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItemModal(true);
  };
  const regQuantity = getReg("quantity");
  const regPrice = getReg("price");
  const modifyCategory = (item: SelectI) => {
    handleChangeCategory(
      item,
      items,
      categories,
      setDisplayedItems,
      setDisplayedCategories
    );
  };

  const modifyItem = (item: SelectI) => {
    handleChangeItem(item, items, categories);
  };
  console.log("invoiceformUp");
  return (
    <div className={styles.form__wrapper}>
      <h4 className={styles.form__title}>
        {formState === "create" ? t("title") : t("titleEdit")}
      </h4>
      {(modal || hasTransitionedIn) && (
        <AddCategoryModal
          visible={modal && hasTransitionedIn}
          setVisible={setModal}
          fetchData={fetchCategories}
          inputFields={newCategory}
        />
      )}
      {(itemModal || hasItemTransitionedIn) && (
        <AddItemModal
          visible={itemModal && hasItemTransitionedIn}
          setVisible={setItemModal}
          fetchData={fetchItems}
          inputFields={newItem}
        />
      )}
      <div className={styles.input__wrapper}>
        <BasicInput
          type="date"
          label={t("date") as string}
          name="date"
          value={
            dateState?.toISOString().split("T")[0] ||
            new Date().toISOString().slice(0, 10)
          }
          onChange={handleDateChange}
        />
      </div>
      <form onSubmit={submit}>
        <SelectFormField
          name={"Select category"}
          label={t("category")}
          options={categories}
          displayedOptions={displayedCategories}
          handleCallback={modifyCategory}
          defaultValue={defaultCategory}
          setDisplayedOptions={setDisplayedCategories}
          z_index={4}
          errors={getError("category_name")}
        >
          <BasicButton text={t("newButton")} handleClick={createNewCategory} />
        </SelectFormField>
        <SelectFormField
          name={"Select item"}
          label={t("item")}
          options={items}
          displayedOptions={displayedItems}
          handleCallback={modifyItem}
          defaultValue={defaultItem}
          setDisplayedOptions={setDisplayedItems}
          errors={getError("item_name")}
        >
          <BasicButton text={t("all")} handleClick={showAll} />
          <BasicButton text={t("newButton")} handleClick={createNewItem} />
        </SelectFormField>

        <InputFormField
          type="number"
          name={regQuantity?.name ?? ""}
          onChange={regQuantity?.onChange}
          onBlur={regQuantity?.onBlur}
          inputRef={regQuantity?.ref}
          label={t("quantity") as string}
          errors={getError("quantity")}
          afterText={defaultItem?.unit}
        >
          <MdOutlineProductionQuantityLimits />
        </InputFormField>

        <InputFormField
          type="number"
          name={regPrice?.name ?? ""}
          onChange={regPrice?.onChange}
          onBlur={regPrice?.onBlur}
          inputRef={regPrice?.ref}
          width="75%"
          label={t("price") as string}
          errors={getError("price")}
          afterText={"lei"}
        >
          <MdPriceCheck />
        </InputFormField>

        {formState === "create" ? (
          <BasicButton text={t("addRecord")} type="submit" />
        ) : (
          <div>
            <BasicButton
              text={t("edit")}
              type="submit"
              handleClick={submitChanges}
            />{" "}
            <BasicButton
              text={t("cancel")}
              type="button"
              color="pink"
              handleClick={() => setFormState("create")}
            />
          </div>
        )}
      </form>
    </div>
  );
};
export default InvoiceForm;
