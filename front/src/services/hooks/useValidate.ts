import { InputType } from "./../../Interfaces/InputType";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = Record<string, string>;

function useValidate(inputFields: InputType[]) {
  const schema: ZodType<FormData> = z.object(
    Object.fromEntries(
      inputFields.map(({ name, type }) => [
        name,
        type === "email"
          ? z.string().min(5, "to small").email()
          : z.string().min(5, "to small").max(20, "To long"),
      ])
    )
  );

  const fullSchema = inputFields.some(
    (field) => field.name === "Confirm password"
  )
    ? schema.refine((data) => data["Confirm password"] === data["Password"], {
        message: "Passwords do not match",
        path: ["Confirm password"],
      })
    : schema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
  });
  return { register, errors, handleSubmit };
}
export default useValidate;
