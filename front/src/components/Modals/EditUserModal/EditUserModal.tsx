import React, { FC, useRef } from "react";
import styles from "./EditUserModal.module.css";
import Modal from "../Modal/Modal";
import BasicInput from "../../Inputs/BasicInput/BasicInput";
import useValidate from "../../../services/hooks/useValidate";
import { InputType } from "../../../Interfaces/InputType";
import usePost from "../../../services/hooks/usePost";
import useGetUser from "../../../services/hooks/useGetUser";
type FormData = Record<string, string>;
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
  // value,
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
      <form
        className={styles.edit__user__container}
        ref={ref}
        onSubmit={submit}
        noValidate
      >
        <div className={styles.title__container}>
          <h4>{`Change ${changedField}`}</h4>
        </div>
        {inputFields.map((field) => {
          const reg = register(field.name);
          return (
            <div key={field.id}>
              <BasicInput
                value={field.value}
                name={reg.name}
                label={field?.label ?? ""}
                onChange={reg.onChange}
                onBlur={reg.onBlur}
                inputRef={reg.ref}
                type={field.type}
                borderColor="pink"
              />
              {errors[field?.name] && (
                <span className={styles.error__message}>
                  {errors[field.name]?.message}
                </span>
              )}
            </div>
          );
        })}
        <div>
          {error && <span>{error}</span>}
          {answer && <span>{answer}</span>}
        </div>

        <input type="submit" value="Confirm changes" />
      </form>
    </Modal>
  );
};

export default EditUserModal;
