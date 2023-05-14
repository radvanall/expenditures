import { FC } from "react";
import { AddModalI } from "../../../Interfaces/AddModal";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import Modal from "../Modal/Modal";
import Form from "../../Forms/Form/Form";
import useValidate from "../../../services/hooks/useValidate";
import usePost from "../../../services/hooks/usePost";

type FormData = Record<string, string | number>;
const AddCategoryModal: FC<AddModalI> = ({
  visible,
  setVisible,
  inputFields,
  fetchData,
}) => {
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost("http://localhost:84/expenditures/public/category.php", "insert");
  const submitData = (data: FormData) => {
    console.log("SUBMITED", data);
    makePostRequest(data);
    fetchData();
  };
  const { register, errors, handleSubmit } = useValidate(inputFields);
  const submit = handleSubmit(submitData);

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Form
        formName={"Add new category"}
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
