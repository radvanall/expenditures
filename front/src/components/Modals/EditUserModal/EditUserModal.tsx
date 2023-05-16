import React, { FC, useRef } from "react";
import styles from "./EditUserModal.module.css";
import Modal from "../Modal/Modal";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import useValidate from "../../../services/hooks/useValidate";
import { InputType } from "../../../Interfaces/InputType";
import usePost from "../../../services/hooks/usePost";
import useGetUser from "../../../services/hooks/useGetUser";
import Form from "../../Forms/Form/Form";
type FormData = Record<string, string | number>;
interface Props {
  changedField: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputFields: InputType[];
}
const EditUserModal: FC<Props> = ({
  visible,
  setVisible,
  changedField,
  inputFields,
}) => {
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost(
    "http://localhost:84/expenditures/public/userController.php",
    "update"
  );
  console.log("modal:", inputFields);
  const { getRequest } = useGetUser();
  const submitData = (data: FormData) => {
    console.log("SUBMITED", data);
    const objectData = {
      nickname: data?.Nickname ?? "",
      email: data?.Email ?? "",
      password: data?.["Old password"] ?? "",
      new_password: data?.Password ?? "",
      password_confirm: data?.["Confirm password"] ?? "",
    };
    makePostRequest(objectData);
    getRequest();
    console.log("objectdata", objectData);
  };
  const { register, errors, handleSubmit } = useValidate(inputFields);
  const submit = handleSubmit(submitData);
  const ref = useRef<HTMLFormElement>(null);
  console.log(inputFields[0].value);
  const resetForm = (val: boolean) => {
    setVisible(val);
    resetPost();
    ref.current?.reset();
  };
  return (
    <Modal visible={visible} setVisible={resetForm}>
      <Form
        ref={ref}
        formName={`Change ${changedField}`}
        Input={BasicInput}
        inputFields={inputFields}
        register={register}
        submit={submit}
        errors={errors}
        modal={true}
        serverAnswer={answer}
        serverError={error}
      ></Form>
    </Modal>
  );
};

export default EditUserModal;
