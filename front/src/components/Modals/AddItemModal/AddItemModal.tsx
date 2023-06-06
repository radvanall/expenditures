import React, { FC, useEffect, useState } from "react";
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
type FormData = Record<string, string | number>;

const AddItemModal: FC<AddModalI> = ({
  visible,
  setVisible,
  inputFields,
  fetchData,
  request,
  Id,
}) => {
  const [displayedCategories, setDisplayedCategories] = useState<
    SelectI[] | null
  >(null);
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchData: fetchCategories,
  } = useGetRequest<SelectI>("/category.php?id=all", categoryTypes);

  useEffect(() => {
    console.log("in useEffect");
    setDisplayedCategories(categories);
  }, [categories]);
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost(
    "http://localhost:84/expenditures/public/item.php",
    request ? request : "insert"
  );
  const submitData = async (data: FormData) => {
    console.log("SUBMITED", data);
    if (Id && request === "update") data.id = Id;
    await makePostRequest(data);
    fetchData();
  };
  const [selectValue, setSelectValue] = useState<SelectI>({
    id: inputFields[2].defaultValue as number,
    name: inputFields[3].defaultValue as string,
  });
  const { register, errors, setValue, trigger, handleSubmit } =
    useValidate(inputFields);
  const submit = handleSubmit(submitData);
  const handleChangeItem = (item: SelectI) => {
    console.log(item);
    setValue("category_id", Number(item.id) ?? "");
    setValue("category_name", item.name ?? "");
    console.log("newArray:");
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
    <Modal visible={visible} setVisible={setVisible}>
      <Form
        formName={request === "insert" ? "Add new category" : "Edit category"}
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
            label="Select category"
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
