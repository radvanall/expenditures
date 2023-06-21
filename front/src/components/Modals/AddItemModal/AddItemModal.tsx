import { FC, useEffect, useState } from "react";
import { SelectI } from "../../../Interfaces/SelectI";
import { AddModalI } from "../../../Interfaces/AddModal";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import Modal from "../Modal/Modal";
import useValidate from "../../../services/hooks/useValidate";
import usePost from "../../../services/hooks/usePost";
import Form from "../../Forms/Form/Form";
import Select from "../../Select/Select";
import { categoryTypes } from "../../../Interfaces/keyConversionTypes";
import styles from "../../Forms/Form/Form.module.css";
import useGetRequest from "../../../services/hooks/useGetRequest";
import { useTranslation } from "react-i18next";
type FormData = Record<string, string | number>;

const AddItemModal: FC<AddModalI> = ({
  visible,
  setVisible,
  inputFields,
  fetchData,
  request = "insert",
  Id,
}) => {
  const [displayedCategories, setDisplayedCategories] = useState<
    SelectI[] | null
  >(null);
  const { t } = useTranslation(["addItemModal"]);
  const { data: categories } = useGetRequest<SelectI>(
    "/category.php?id=all",
    categoryTypes
  );

  useEffect(() => {
    setDisplayedCategories(categories);
  }, [categories]);

  useEffect(() => {
    inputFields[0].label = t("item") as string;
    inputFields[1].label = t("unit") as string;
    inputFields[2].label = t("Select category") as string;
    inputFields[3].label = t("Select category") as string;
  }, [t]);
  const {
    error,
    message: answer,
    makePostRequest,
  } = usePost(
    "http://localhost:84/expenditures/public/item.php",
    request ? request : "insert"
  );
  const submitData = async (data: FormData) => {
    if (Id && request === "update") data.id = Id;
    await makePostRequest(data);
    fetchData();
  };

  const { register, errors, setValue, trigger, handleSubmit } =
    useValidate(inputFields);
  const [selectValue, setSelectValue] = useState<SelectI>({
    id: inputFields[2].defaultValue as number,
    name: inputFields[3].defaultValue as string,
  });
  useEffect(() => {
    if (request !== "insert") {
      setValue("category_id", Number(inputFields[2].defaultValue) ?? -1);
      setValue("category_name", inputFields[3].defaultValue ?? "");
      trigger("category_name");
    }
  }, []);

  const submit = handleSubmit(submitData);
  const handleChangeItem = (item: SelectI) => {
    setValue("category_id", Number(item.id) ?? "");
    setValue("category_name", item.name ?? "");
    setTimeout(() => setDisplayedCategories(categories), 300);
    trigger("category_name");
    setSelectValue({
      id: item.id,
      name: item.name,
      unit: item.unit,
      links: item.links,
    });
  };
  const filteredFields = inputFields.filter(
    (item) => item.type !== "select" && item.type !== "select_text"
  );

  return (
    <Modal visible={visible} setVisible={setVisible} minWidth="270px">
      <Form
        formName={request === "insert" ? t("inserTitle") : t("editTitle")}
        Input={BasicInput}
        inputFields={filteredFields}
        register={register}
        submit={submit}
        errors={errors}
        modal={true}
        serverAnswer={answer}
        serverError={error}
      >
        <div className={styles.input_container}>
          <Select
            options={categories}
            name="Select category"
            label={t("select")}
            displayedOptions={displayedCategories}
            defaultValue={request === "insert" ? undefined : selectValue}
            handleCallback={handleChangeItem}
            setDisplayedOptions={setDisplayedCategories}
            z_index={4}
            color="pink"
          />
          {errors["category_name"] && (
            <span className={styles.error__message}>
              {errors["category_name"]?.message}
            </span>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default AddItemModal;
