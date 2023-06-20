import { FC, useEffect } from "react";
import { AddModalI } from "../../../Interfaces/AddModal";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import Modal from "../Modal/Modal";
import Form from "../../Forms/Form/Form";
import useValidate from "../../../services/hooks/useValidate";
import usePost from "../../../services/hooks/usePost";
import { useTranslation } from "react-i18next";

type FormData = Record<string, string | number>;
const AddCategoryModal: FC<AddModalI> = ({
  visible,
  setVisible,
  inputFields,
  fetchData,
  request = "insert",
  Id,
}) => {
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost(
    "http://localhost:84/expenditures/public/category.php",
    request ? request : "insert"
  );
  const { t } = useTranslation(["addCategoryModal"]);
  const submitData = async (data: FormData) => {
    console.log("SUBMITED", data);
    if (Id && request === "update") data.id = Id;

    await makePostRequest(data);
    fetchData();
  };
  const { register, errors, handleSubmit } = useValidate(inputFields);
  const submit = handleSubmit(submitData);
  useEffect(() => {
    inputFields[0].label = t("input") as string;
  }, [t]);
  return (
    <Modal visible={visible} setVisible={setVisible} minWidth="270px">
      <Form
        formName={request === "insert" ? t("title") : t("editTitle")}
        Input={BasicInput}
        inputFields={inputFields}
        register={register}
        submit={submit}
        errors={errors}
        modal={true}
        serverError={error}
        serverAnswer={answer}
      ></Form>
    </Modal>
  );
};
export default AddCategoryModal;
