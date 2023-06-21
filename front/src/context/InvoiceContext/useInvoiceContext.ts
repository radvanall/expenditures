import { useTranslation } from "react-i18next";
import { useCallback, useReducer } from "react";
import { record as inputFields } from "../../data/loginInputFields";
import { SelectI } from "../../Interfaces/SelectI";
import usePost from "../../services/hooks/usePost";
import useValidate from "../../services/hooks/useValidate";
import { invoiceReducer, TYPE, initState } from "./invoiceReducer";
type FormData = Record<string, string | number>;
interface RecordI {
  [index: string]: string | number;
  id: number;
  category_id: number;
  category_name: string;
  item_id: number;
  item_name: string;
  price: number;
  quantity: number;
  unit: string;
}
interface tableField {
  id: number;
  [key: string]: string | number;
}

export const useInvoiceContext = () => {
  const { t } = useTranslation(["invoiceTable"]);
  const [state, dispatch] = useReducer(invoiceReducer, initState);
  const { register, errors, setValue, trigger, handleSubmit } =
    useValidate(inputFields);

  const tableData: tableField[] | undefined = state.records?.map((record) => ({
    id: record.id,
    [t("item")]: record.item_name,
    [t("category")]: record.category_name,
    [t("price")]: record.price,
    [t("quantity")]: record.quantity,
    [t("unit")]: record.unit,
    [t("total")]: record.quantity * record.price,
  }));
  const handleEdit = (id: number) => {
    dispatch({ type: TYPE.SET_FORM_TO_EDIT });
    dispatch({ type: TYPE.SET_EDITED_RECORD_ID, payload: id });
    const field = state.records?.find((field) => field.id === id);
    if (field) {
      dispatch({
        type: TYPE.SET_DEFAULT_CATEGORY,
        payload: { id: field?.id, name: field.category_name },
      });
      setValue("category_id", Number(field.category_id) ?? null);
      setValue("category_name", field.category_name ?? "");
      dispatch({
        type: TYPE.SET_DEFAULT_ITEM,
        payload: {
          id: field?.item_id,
          name: field.item_name,
          links: field.category_id,
          unit: field.unit,
        },
      });
      setValue("item_id", Number(field.item_id) ?? null);
      setValue("item_name", field.item_name ?? "");
      setValue("quantity", field.quantity);
      setValue("price", field.price);
    }
  };
  const changeRecord = (data: FormData) => {
    dispatch({
      type: TYPE.UPDATE_RECORD,
      payload: data as RecordI,
    });
    dispatch({ type: TYPE.SET_FORM_TO_CREATE });
  };
  const submitChanges = handleSubmit(changeRecord);
  const handleDelete = (id: number) => {
    dispatch({ type: TYPE.DELETE_RECORD, payload: id });
  };
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
  } = usePost(
    "http://localhost:84/expenditures/public/invoice.php",
    "insert_full"
  );
  const handleSave = () => {
    makePostRequest({
      date: state.dateState?.toISOString().slice(0, 10),
      records: state.records ? [...state.records] : null,
    });
  };
  const handleChangeCategory = useCallback(
    (
      item: SelectI,
      items: SelectI[] | null,
      categories: SelectI[] | null,
      setDisplayedItems: (
        value: React.SetStateAction<SelectI[] | null>
      ) => void,
      setDisplayedCategories: (
        value: React.SetStateAction<SelectI[] | null>
      ) => void
    ) => {
      setValue("category_id", Number(item.id) ?? null);
      setValue("category_name", item.name ?? "");
      trigger("category_name");
      const newArray = items?.filter(
        (value) => Number(value.links) === Number(item.id)
      );
      setDisplayedItems(
        newArray?.length
          ? newArray
          : [{ id: null, name: "No item for this category", links: null }]
      );
      if (
        !newArray?.some(
          (field) => Number(field.links) === Number(state.defaultItem?.links)
        )
      ) {
        dispatch({
          type: TYPE.SET_DEFAULT_ITEM,
          payload: {
            id: null,
            name: "",
            unit: "",
            links: null,
          },
        });
        setValue("item_id", -1);
        setValue("item_name", "");
      }
      setTimeout(() => setDisplayedCategories(categories), 300);
    },
    []
  );
  const handleChangeItem = useCallback(
    (item: SelectI, items: SelectI[] | null, categories: SelectI[] | null) => {
      const unit = items?.find((field) => Number(item.id) === Number(field.id));
      setValue("item_id", Number(item.id) ?? null);
      setValue("item_name", item.name ?? "");
      trigger("item_name");
      dispatch({ type: TYPE.SET_DEFAULT_ITEM, payload: unit });
      const newArray = categories?.filter(
        (category) => Number(category.id) === Number(item.links)
      );
      if (newArray?.length) {
        dispatch({
          type: TYPE.SET_DEFAULT_CATEGORY,
          payload: {
            id: newArray[0].id,
            name: newArray[0].name,
            links: newArray[0]?.links,
          } as SelectI,
        });
        setValue("category_id", Number(newArray[0].id) ?? null);
        setValue("category_name", newArray[0].name ?? "");
        trigger("category_name");
      } else {
        setValue("category_id", -1);
        setValue("category_name", "");
      }
    },
    []
  );
  const submitData = (data: FormData) => {
    data.id = state.recordsId;
    if (
      !state?.records?.some(
        (field) =>
          field.item_id === Number(data.item_id) &&
          field.price === Number(data.price)
      )
    )
      dispatch({ type: TYPE.INCREASE_RECORD_ID });
    data.unit = state.defaultItem?.unit as string;
    dispatch({ type: TYPE.SUBMIT_RECORD, payload: data as RecordI });
  };
  const submit = handleSubmit(submitData);
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    const newDate = new Date(dateValue);
    dispatch({ type: TYPE.SET_DATE_STATE, payload: newDate });
  };
  const getReg = (name: string) => {
    if (!name) return null;
    return register(name, { valueAsNumber: true });
  };
  const getError = (name: string) => {
    return errors?.[name]?.message;
  };
  const setFormState = (value: string) => {
    value === "create"
      ? dispatch({ type: TYPE.SET_FORM_TO_CREATE })
      : dispatch({ type: TYPE.SET_FORM_TO_EDIT });
  };
  const handleResetRecords = () => {
    dispatch({ type: TYPE.RESET_RECORDS });
  };

  return {
    handleResetRecords,
    error,
    pending,
    answer,
    dateState: state.dateState,
    handleDateChange,
    submit,
    handleChangeCategory,
    defaultCategory: state.defaultCategory,
    handleChangeItem,
    defaultItem: state.defaultItem,
    submitChanges,
    setFormState,
    getReg,
    handleEdit,
    handleSave,
    handleDelete,
    getError,
    tableData,
    formState: state.formState,
  };
};
