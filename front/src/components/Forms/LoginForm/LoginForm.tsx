import React, { FC, useState, useEffect } from "react";
import Form from "../Form/Form";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import { LoginInputFields as inputFields } from "../../../data/loginInputFields";
import useValidate from "../../../services/hooks/useValidate";
import TextButton from "../../Buttons/Button/TextButton";
import useAuthorization from "../../../services/hooks/useAuthorization";
import Modal from "../../Modals/Modal/Modal";
import Pending from "../../Pending/Pending";
import { useTranslation } from "react-i18next";
type FormData = Record<string, string | number>;
interface Props {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginForm: FC<Props> = ({ setForm }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { error, pending, message: answer, login } = useAuthorization();
  const submitData = (data: FormData) => {
    const objectData = {
      email: data.Email,
      password: data.Password,
    };
    login(objectData);
    setVisible(true);
  };
  const { register, errors, handleSubmit } = useValidate(inputFields);
  const { t } = useTranslation(["logreg"]);
  const submit = handleSubmit(submitData);
  const message: string = t("registerMessage");
  const buttonText: string = t("registerButtonText");
  const formHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setForm((prev) => !prev);
  };
  useEffect(() => {
    inputFields[0].label = t("email");
    inputFields[1].label = t("password");
  }, [t]);
  return (
    <div>
      <Modal visible={visible} setVisible={setVisible}>
        {pending ? (
          <Pending />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <TextButton message={answer + " "} formHandler={formHandler} />
        )}
      </Modal>
      <Form
        formName={t("loginTitle")}
        Input={BasicInput}
        inputFields={inputFields}
        register={register}
        submit={submit}
        errors={errors}
      >
        <TextButton
          message={message}
          formHandler={formHandler}
          buttonText={buttonText}
        />
      </Form>
    </div>
  );
};

export default LoginForm;
