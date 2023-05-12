import React, { FC, useState } from "react";
import Form from "../Form/Form";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import { RegisterInputFields as inputFields } from "../../../data/loginInputFields";
import useValidate from "../../../services/hooks/useValidate";
import TextButton from "../../Buttons/Button/TextButton";
import Modal from "../../Modals/Modal/Modal";
import usePost from "../../../services/hooks/usePost";
import Pending from "../../Pending/Pending";

type FormData = Record<string, string | number>;
interface Props {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegistrationForm: FC<Props> = ({ setForm }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
  } = usePost(
    "http://localhost:84/expenditures/public/userController.php",
    "create"
  );
  const submitData = (data: FormData) => {
    const objectData = {
      nickname: data.Nickname,
      email: data.Email,
      password: data.Password,
      password_confirm: data["Confirm password"],
    };
    makePostRequest(objectData);
    setVisible(true);
  };
  const { register, errors, handleSubmit } = useValidate(inputFields);
  const submit = handleSubmit(submitData);
  const message: string = "Already have an account? ";
  const buttonText: string = "Login";
  const formHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setForm((prev) => !prev);
  };
  return (
    <div>
      {/* <button onClick={() => setVisible(true)}>x</button> */}
      <Modal visible={visible} setVisible={setVisible}>
        {pending ? (
          <Pending />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <TextButton
            message={answer + " "}
            formHandler={formHandler}
            buttonText={buttonText}
          />
        )}
      </Modal>
      <Form
        formName={"Registration"}
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

export default RegistrationForm;
