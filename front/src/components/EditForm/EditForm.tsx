import React, { FC } from "react";
import Modal from "../../components/Modals/Modal/Modal";
import SelectFormField from "../SelectFormField/SelectFormField";
import BasicButton from "../Buttons/BasicButton/BasicButton";
import {
  MdOutlineProductionQuantityLimits,
  MdPriceCheck,
} from "react-icons/md";
import InputFormField from "../InputFormField/InputFormField";
import { useEditForm } from "./useEditForm";
import { recordType } from "../../Interfaces/RecordType";
import { useTranslation } from "react-i18next";
export interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formState: string;
  record: recordType | null;
  invoice_id?: number;
  fetchData: () => Promise<void>;
}
const EditForm: FC<Props> = ({
  visible,
  setVisible,
  formState,
  record,
  invoice_id,
  fetchData,
}) => {
  const {
    categories,
    displayedCategories,
    modifyCategory,
    defaultCategory,
    setDisplayedCategories,
    getError,
    items,
    displayedItems,
    modifyItem,
    setDisplayedItems,
    defaultItem,
    showAll,
    getReg,
    closeModal,
    submit,
    submitRecord,
    error,
    answer,
  } = useEditForm(
    formState,
    record,
    visible,
    fetchData,
    setVisible,
    invoice_id
  );
  const regQuantity = getReg("quantity");
  const regPrice = getReg("price");
  const { t } = useTranslation(["invoiceForm"]);
  return (
    <Modal visible={visible} setVisible={closeModal}>
      <div>
        <form>
          <SelectFormField
            name={"Select category"}
            label={t("category")}
            options={categories}
            displayedOptions={displayedCategories}
            handleCallback={modifyCategory}
            defaultValue={defaultCategory}
            setDisplayedOptions={setDisplayedCategories}
            z_index={4}
            color="pink"
            errors={getError("category_name")}
          ></SelectFormField>
          <SelectFormField
            name={"Select item"}
            label={t("item")}
            options={items}
            displayedOptions={displayedItems}
            handleCallback={modifyItem}
            defaultValue={defaultItem}
            setDisplayedOptions={setDisplayedItems}
            color="pink"
            errors={getError("item_name")}
          >
            <BasicButton text={t("all")} handleClick={showAll} color="pink" />
          </SelectFormField>

          <InputFormField
            type="number"
            name={regQuantity?.name ?? ""}
            onChange={regQuantity?.onChange}
            onBlur={regQuantity?.onBlur}
            inputRef={regQuantity?.ref}
            label={t("quantity") as string}
            errors={getError("quantity")}
            color="pink"
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
            color="pink"
            errors={getError("price")}
            afterText={"lei"}
          >
            <MdPriceCheck />
          </InputFormField>

          {formState === "create" ? (
            <BasicButton
              text={t("addRecord")}
              type="submit"
              color="blue"
              handleClick={submitRecord}
            />
          ) : (
            <div style={{ display: "flex", gap: "5px" }}>
              <BasicButton
                text={t("edit")}
                type="submit"
                handleClick={submit}
                color="blue"
              />
              <BasicButton
                text={t("cancel")}
                type="button"
                color="pink"
                handleClick={closeModal}
              />
            </div>
          )}
        </form>
        {error && <p>{error}</p>}
        {answer && <p>{answer}</p>}
      </div>
    </Modal>
  );
};

export default EditForm;
