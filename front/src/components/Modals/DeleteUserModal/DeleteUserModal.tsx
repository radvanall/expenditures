import React, { FC, useEffect, useRef } from "react";
import styles from "./DeleteUserModal.module.css";
import Modal from "../Modal/Modal";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import useValidate from "../../../services/hooks/useValidate";
import { InputType } from "../../../Interfaces/InputType";
import usePost from "../../../services/hooks/usePost";
import useGetUser from "../../../services/hooks/useGetUser";
import Form from "../../Forms/Form/Form";
import { deleteAccount } from "../../../data/loginInputFields";
import { useNavigate } from "react-router-dom";
import { useAuth, useUserData } from "../../../context/Provider";
import { useModal } from "../../../context/Provider";
import { useTranslation } from "react-i18next";

type FormData = Record<string, string | number>;
interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteUserModal: FC<Props> = ({ visible, setVisible }) => {
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost(
    "http://localhost:84/expenditures/public/userController.php",
    "delete_user"
  );
  const { t } = useTranslation(["userCard"]);
  const navigate = useNavigate();
  const { setVisible: setDeleteVisible, setDeleteMessage } = useModal();
  const { setAuth } = useAuth();
  const { setUserData } = useUserData();
  const submitData = async (data: FormData) => {
    console.log("SUBMITED", data);

    await makePostRequest(data);

    // getRequest();
    console.log("data", data);
  };
  useEffect(() => {
    if (answer) {
      console.log("answer is true", answer);
      setAuth(false);
      setUserData(null);
      setDeleteVisible(true);
      setDeleteMessage(answer);
      navigate("/");
    }
  }, [answer]);
  useEffect(() => {
    deleteAccount[0].label = t("enterPassword");
  }, [t]);
  const { register, errors, handleSubmit } = useValidate(deleteAccount);
  const submit = handleSubmit(submitData);
  const ref = useRef<HTMLFormElement>(null);
  const resetForm = (val: boolean) => {
    setVisible(val);
    resetPost();
    ref.current?.reset();
  };
  return (
    <Modal visible={visible} setVisible={resetForm} minWidth="270px">
      <Form
        ref={ref}
        formName={t("deleteAccount")}
        Input={BasicInput}
        inputFields={deleteAccount}
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

export default DeleteUserModal;
