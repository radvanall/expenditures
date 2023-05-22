import { MdOutlineAlternateEmail } from "react-icons/md";
import { IconType } from "react-icons";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";

// interface InputFieldsInterface {
//   id: number;
//   name: "Email" | "Password";
//   icon: IconType;
//   type: string;
// }
// export const LoginInputFields: InputFieldsInterface[] = [
//   { id: 1, name: "Email", icon: MdOutlineAlternateEmail, type: "text" },
//   { id: 2, name: "Password", icon: RiLockPasswordLine, type: "password" },
// ];
export const LoginInputFields = [
  {
    id: 1,
    name: "Email",
    icon: MdOutlineAlternateEmail,
    type: "email",
    value: "",
    defaultValue: "",
    label: "Email",
    border: "blue",
    key: "l1",
  },
  {
    id: 2,
    name: "Password",
    icon: RiLockPasswordLine,
    type: "password",
    value: "",
    defaultValue: "",
    label: "Password",
    border: "blue",
    key: "l2",
  },
];
export const RegisterInputFields = [
  {
    id: 1,
    name: "Nickname",
    icon: BiUser,
    type: "text",
    value: "",
    defaultValue: "",
    border: "blue",
    label: "Nickname",
    key: "r1",
  },
  {
    id: 2,
    name: "Email",
    icon: MdOutlineAlternateEmail,
    type: "email",
    value: "",
    defaultValue: "",
    label: "Email",
    border: "blue",
    key: "r2",
  },
  {
    id: 3,
    name: "Password",
    icon: RiLockPasswordLine,
    type: "password",
    value: "",
    defaultValue: "",
    label: "Password",
    border: "blue",
    key: "r3",
  },
  {
    id: 4,
    name: "Confirm password",
    icon: RiLockPasswordLine,
    type: "password",
    value: "",
    defaultValue: "",
    label: "Confirm password",
    border: "blue",
    key: "r4",
  },
];
export const editEmailFields = [
  {
    id: 1,
    name: "Email",
    type: "email",
    value: "",
    defaultValue: "",
    label: "Email",
    border: "pink",
    key: "e1",
  },
  {
    id: 2,
    name: "Old password",
    type: "password",
    value: "",
    defaultValue: "",
    label: "Enter password",
    border: "pink",
    key: "e2",
  },
];
export const editNicknameFields = [
  {
    id: 1,
    name: "Nickname",
    type: "text",
    value: "",
    defaultValue: "",
    label: "Nickname",
    border: "pink",
    key: "en1",
  },
  {
    id: 2,
    name: "Old password",
    type: "password",
    value: "",
    defaultValue: "",
    label: "Enter password",
    border: "pink",
    key: "en2",
  },
];
export const editPasswordFields = [
  {
    id: 1,
    name: "Old password",
    type: "password",
    value: "",
    defaultValue: "",
    label: "Old password",
    border: "pink",
    key: "ep1",
  },
  {
    id: 2,
    name: "Password",
    type: "password",
    value: "",
    defaultValue: "",
    label: "New password",
    border: "pink",
    key: "ep2",
  },
  {
    id: 3,
    name: "Confirm password",
    type: "password",
    value: "",
    defaultValue: "",
    label: "Confirm new password",
    border: "pink",
    key: "ep3",
  },
];

export const newItem = [
  {
    id: 1,
    name: "item_name",
    type: "text",
    value: "",
    defaultValue: "",
    label: "Enter item name:",
    border: "pink",
    key: "ni1",
  },
  {
    id: 2,
    name: "unit",
    type: "text",
    value: "",
    defaultValue: "",
    label: "Enter unit",
    border: "pink",
    key: "ni2",
  },
  {
    id: 3,
    name: "category_id",
    type: "select",
    value: "",
    defaultValue: "",
    label: "Choose category",
    border: "pink",
    key: "ni3",
  },
  {
    id: 4,
    name: "category_name",
    type: "select_text",
    value: "",
    defaultValue: "",
    label: "Choose category",
    border: "pink",
    key: "ni3",
  },
];

export const newCategory = [
  {
    id: 1,
    name: "category_name",
    type: "text",
    value: "",
    defaultValue: "",
    label: "Enter category name:",
    border: "pink",
    key: "ci1",
  },
];
export const record = [
  {
    id: 1,
    name: "category_name",
    type: "select_text",
    value: "",
    defaultValue: "",
    label: "Enter category name:",
    border: "blue",
    key: "r1",
  },
  {
    id: 2,
    name: "category_id",
    type: "select",
    value: "",
    defaultValue: "",
    label: "Choose category",
    border: "blue",
    key: "r2",
  },
  {
    id: 3,
    name: "item_name",
    type: "select_text",
    value: "",
    defaultValue: "",
    label: "Choose item",
    border: "blue",
    key: "r3",
  },
  {
    id: 4,
    name: "item_id",
    type: "select",
    value: "",
    defaultValue: "",
    label: "Choose item",
    border: "blue",
    key: "r4",
  },
  {
    id: 5,
    name: "quantity",
    type: "number",
    value: "",
    defaultValue: "",
    label: "Quantity",
    border: "blue",
    key: "r5",
  },
  {
    id: 6,
    name: "price",
    type: "number",
    value: "",
    defaultValue: "",
    label: "Price per unit",
    border: "blue",
    key: "r6",
  },
];
