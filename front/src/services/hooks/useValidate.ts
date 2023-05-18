import { InputType } from "./../../Interfaces/InputType";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Console } from "console";

type FormData = Record<string, string | number>;

function useValidate(inputFields: InputType[]) {
  const schema: ZodType<FormData> = z.object(
    Object.fromEntries(
      inputFields.map(({ name, type }) => [
        name,
        type === "email"
          ? z.string().min(5, "to small").email()
          : type === "number"
          ? z
              .number({
                invalid_type_error: "Enter a number",
              })
              .min(1, "Enter a number")
          : type === "select"
          ? z.number().min(1, "Choose an opti")
          : type === "select_text"
          ? z.string().min(1, "Choose an option")
          : name === "unit"
          ? z.string().min(1, "enter something")
          : z.string().min(3, "to small").max(20, "To long"),
      ])
    )
  );
  console.log("Z:", z.number());
  const fullSchema = inputFields.some(
    (field) => field.name === "Confirm password"
  )
    ? schema.refine((data) => data["Confirm password"] === data["Password"], {
        message: "Passwords do not match",
        path: ["Confirm password"],
      })
    : schema;
  console.log(fullSchema);
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
  });
  return { register, errors, setValue, trigger, handleSubmit };
}
export default useValidate;
