import React, { FC, ReactNode } from "react";
import styles from "./Form.module.css";
import InputProps from "../../../Interfaces/InputProps";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { InputType } from "../../../Interfaces/InputType";
import { useTranslation } from "react-i18next";
type FormData = Record<string, string | number>;

interface Props {
  children?: ReactNode;
  ref?: React.RefObject<HTMLFormElement>;
  formName: string;
  modal?: boolean;
  Input: React.FC<InputProps>;
  inputFields: InputType[];
  register: UseFormRegister<FormData>;
  submit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  errors: FieldErrors<FormData>;
  serverError?: string | null;
  serverAnswer?: string | null;
}
const Form: FC<Props> = ({
  children,
  ref,
  formName,
  Input,
  inputFields,
  register,
  submit,
  errors,
  serverError,
  serverAnswer,
  modal = false,
}) => {
  console.log("form", inputFields);
  const { t } = useTranslation(["logreg"]);
  return (
    <div
      className={
        modal
          ? `${styles.form__container} ${styles.modal}`
          : styles.form__container
      }
    >
      <h2>{formName}</h2>
      <form onSubmit={submit} noValidate ref={ref}>
        {inputFields.map((item) => {
          const reg = register(item.name);
          return (
            <div className={styles.input_container} key={item.id}>
              <Input
                defaultValue={item.defaultValue}
                key={item.key}
                type={item.type}
                label={item?.label ?? ""}
                name={reg.name}
                onChange={reg.onChange}
                onBlur={reg.onBlur}
                inputRef={reg.ref}
                borderColor={item.border}
              >
                {item.icon && <item.icon />}
              </Input>
              {errors[item.name] && (
                <span className={styles.error__message}>
                  {errors[item.name]?.message}
                </span>
              )}
            </div>
          );
        })}
        {children && <div>{children}</div>}
        <div className={styles.form__end}>
          {serverError && <span>{serverError}</span>}
          {serverAnswer && <span>{serverAnswer}</span>}
          <input
            className={styles.submit__button}
            type="submit"
            value={t("send") as string}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
