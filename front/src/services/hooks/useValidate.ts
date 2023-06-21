import { InputType } from "./../../Interfaces/InputType";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

type FormData = Record<string, string | number>;

function useValidate(inputFields: InputType[]) {
  const { t } = useTranslation(["validation"]);
  const schema: ZodType<FormData> = z.object(
    Object.fromEntries(
      inputFields.map(({ name, type }) => [
        name,
        type === "email"
          ? z
              .string()
              .min(5, t("small") as string)
              .email()
          : type === "number"
          ? z
              .number({
                invalid_type_error: t("enterNumber") as string,
              })
              .min(1, t("enterNumber") as string)
          : type === "select"
          ? z
              .number({
                required_error: t("chooseOption") as string,
              })
              .min(1, t("chooseOption") as string)
          : type === "select_text"
          ? z
              .string({
                required_error: t("chooseOption") as string,
              })
              .min(1, t("chooseOption") as string)
          : name === "unit"
          ? z.string().min(1, t("enter") as string)
          : z
              .string()
              .min(3, t("small") as string)
              .max(20, t("tooLong") as string),
      ])
    )
  );
  const fullSchema = inputFields.some(
    (field) => field.name === "Confirm password"
  )
    ? schema.refine((data) => data["Confirm password"] === data["Password"], {
        message: t("passwordDoNotMatch") as string,
        path: ["Confirm password"],
      })
    : schema;
  const {
    register,
    setValue,
    setError,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
  });
  return { register, errors, setValue, setError, trigger, handleSubmit };
}
export default useValidate;
