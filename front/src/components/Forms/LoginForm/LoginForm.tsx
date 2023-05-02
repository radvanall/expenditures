import React, { FC, useState } from "react";
import Form from "../Form/Form";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import { LoginInputFields as inputFields } from "../../../data/loginInputFields";
import useValidate from "../../../services/hooks/useValidate";
import TextButton from "../../Buttons/Button/TextButton";
import usePost from "../../../services/hooks/usePost";
import Modal from "../../Modals/Modal/Modal";
import Pending from "../../Pending/Pending";
type FormData = Record<string, string>;
interface Props {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginForm: FC<Props> = ({ setForm }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
  } = usePost(
    "http://localhost:84/expenditures/public/userController.php",
    "login"
  );

  const submitData = (data: FormData) => {
    const objectData = {
      email: data.Email,
      password: data.Password,
    };
    makePostRequest(objectData);
    setVisible(true);
  };
  const { register, errors, handleSubmit } = useValidate(inputFields);
  const submit = handleSubmit(submitData);
  const message: string = "Don't have an account? ";
  const buttonText: string = "Register";
  const formHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setForm((prev) => !prev);
  };
  return (
    <div>
      <Modal visible={visible} setVisible={setVisible}>
        {pending ? (
          <Pending />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <TextButton
            message={answer + " "}
            formHandler={formHandler}
            // buttonText={buttonText}
          />
        )}
      </Modal>
      <Form
        formName={"Login"}
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
