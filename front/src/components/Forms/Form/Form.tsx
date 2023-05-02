import React, { FC, ReactNode } from "react";
import styles from "./Form.module.css";
import InputProps from "../../../Interfaces/InputProps";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { InputType } from "../../../Interfaces/InputType";
type FormData = Record<string, string>;

interface Props {
  children?: ReactNode;
  formName: string;
  Input: React.FC<InputProps>;
  inputFields: InputType[];
  register: UseFormRegister<FormData>;
  submit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  errors: FieldErrors<FormData>;
}
const Form: FC<Props> = ({
  children,
  formName,
  Input,
  inputFields,
  register,
  submit,
  errors,
}) => {
  return (
    <div className={styles.form__container}>
      <h2>{formName}</h2>
      <form onSubmit={submit} noValidate>
        {inputFields.map((item) => {
          const reg = register(item.name);
          return (
            <div className={styles.input_container} key={item.id}>
              <Input
                type={item.type}
                name={reg.name}
                onChange={reg.onChange}
                onBlur={reg.onBlur}
                inputRef={reg.ref}
              >
                <item.icon />
              </Input>
              {errors[item.name] && (
                <span className={styles.error__message}>
                  {errors[item.name]?.message}
                </span>
              )}
            </div>
          );
        })}
        <div className={styles.form__end}>
          {children}
          <input className={styles.submit__button} type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
};

export default Form;
