import React, { FC, useEffect, useState } from "react";
import Modal from "../../components/Modals/Modal/Modal";
import { SelectI } from "../../Interfaces/SelectI";
import { itemTypes, categoryTypes } from "../../Interfaces/keyConversionTypes";
import useGetRequest from "../../services/hooks/useGetRequest";
import SelectFormField from "../SelectFormField/SelectFormField";
import BasicButton from "../Buttons/BasicButton/BasicButton";
import {
  MdOutlineProductionQuantityLimits,
  MdPriceCheck,
} from "react-icons/md";
import InputFormField from "../InputFormField/InputFormField";
import { record as inputFields, record } from "../../data/loginInputFields";
import useValidate from "../../services/hooks/useValidate";
import usePost from "../../services/hooks/usePost";
type FormData = Record<string, string | number>;
type recordType = {
  id: number;
  item_id: number;
  item_name: string;
  unit: string;
  category_id: number;
  category_name: string;
  quantity: number;
  price: number;
  total_price: number;
};

export interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formState: string;
  record: recordType | null;
  invoice_id?: number;
  fetchData: () => Promise<void>;
}
const EditForm: FC<Props> = ({
  visible,
  setVisible,
  formState,
  record,
  invoice_id,
  fetchData,
}) => {
  const { register, errors, setValue, setError, trigger, handleSubmit } =
    useValidate(inputFields);
  const [defaultItem, setDefaultItem] = useState<SelectI | null>(null);
  const [defaultCategory, setDefaultCategory] = useState<SelectI | null>(null);
  const [displayedItems, setDisplayedItems] = useState<SelectI[] | null>(null);
  const [displayedCategories, setDisplayedCategories] = useState<
    SelectI[] | null
  >(null);
  const {
    data: items,
    loading: itemsLoading,
    error: itemsError,
    fetchData: fetchItems,
  } = useGetRequest<SelectI>("/item.php?id=all", itemTypes);
  const {
    error,
    pending,
    message: answer,
    makePostRequest,
    resetPost,
  } = usePost(
    "http://localhost:84/expenditures/public/record.php",
    formState === "edit" ? "update" : "insert"
  );
  const resetErrors = () => {
    setError("category_id", { type: "", message: "" });
    setError("category_name", { type: "", message: "" });
    setError("item_name", { type: "", message: "" });
    setError("quantity", { type: "", message: "" });
    setError("price", { type: "", message: "" });
  };
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchData: fetchCategories,
  } = useGetRequest<SelectI>("/category.php?id=all", categoryTypes);
  useEffect(() => {
    setDisplayedItems(items);
  }, [items]);
  useEffect(() => {
    setDisplayedCategories(categories);
  }, [categories]);
  useEffect(() => {
    if (record) {
      setDefaultCategory({
        id: record.category_id,
        name: record.category_name,
      });
      setValue("category_id", Number(record.category_id) ?? null);
      setValue("category_name", record.category_name ?? "");
      setDefaultItem({
        id: record.item_id,
        name: record.item_name,
        links: record.category_id,
        unit: record.unit,
      });
      setValue("item_id", Number(record.item_id) ?? null);
      setValue("item_name", record.item_name ?? "");

      setValue("quantity", record.quantity);
      setValue("price", record.price);
      resetErrors();
      return;
    }
    setDefaultCategory({
      id: null,
      unit: "",
      name: "",
      links: null,
    });
    setDefaultItem({ id: null, unit: "", name: "", links: null });
    setValue("category_id", -1);
    setValue("category_name", "");
    setValue("item_id", -1);
    setValue("item_name", "");
    setValue("quantity", "");
    setValue("price", "");
    resetErrors();
  }, [record, visible]);
  const showAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisplayedItems(items);
  };
  const handleChangeItem = (
    item: SelectI,
    items: SelectI[] | null,
    categories: SelectI[] | null
  ) => {
    const unit = items?.find((field) => Number(item.id) === Number(field.id));
    setValue("item_id", Number(item.id) ?? null);
    setValue("item_name", item.name ?? "");
    trigger("item_name");
    // dispatch({ type: TYPE.SET_DEFAULT_ITEM, payload: unit });
    setDefaultItem(
      unit ?? {
        id: null,
        unit: "",
        name: "",
        links: null,
      }
    );
    const newArray = categories?.filter(
      (category) => Number(category.id) === Number(item.links)
    );
    if (newArray?.length) {
      //   dispatch({
      //     type: TYPE.SET_DEFAULT_CATEGORY,
      //     payload: {
      //       id: newArray[0].id,
      //       name: newArray[0].name,
      //       links: newArray[0]?.links,
      //     } as SelectI,
      //   });

      setDefaultCategory(
        newArray[0]
          ? ({
              id: newArray[0].id,
              name: newArray[0].name,
              links: newArray[0]?.links,
            } as SelectI)
          : {
              id: null,
              unit: "",
              name: "",
              links: null,
            }
      );
      setValue("category_id", Number(newArray[0].id) ?? null);
      setValue("category_name", newArray[0].name ?? "");
      trigger("category_name");
    } else {
      setValue("category_id", -1);
      setValue("category_name", "");
    }
  };
  const modifyItem = (item: SelectI) => {
    handleChangeItem(item, items, categories);
  };

  const handleChangeCategory = (
    item: SelectI,
    items: SelectI[] | null,
    categories: SelectI[] | null,
    setDisplayedItems: (value: React.SetStateAction<SelectI[] | null>) => void,
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
        (field) => Number(field.links) === Number(defaultItem?.links)
      )
    ) {
      //   dispatch({
      //     type: TYPE.SET_DEFAULT_ITEM,
      //     payload: {
      //       id: null,
      //       name: "",
      //       unit: "",
      //       links: null,
      //     },
      //   });
      setDefaultItem({
        id: null,
        unit: "",
        name: "",
        links: null,
      });
      setValue("item_id", -1);
      setValue("item_name", "");
    }
    setTimeout(() => setDisplayedCategories(categories), 300);
  };
  const modifyCategory = (item: SelectI) => {
    handleChangeCategory(
      item,
      items,
      categories,
      setDisplayedItems,
      setDisplayedCategories
    );
  };
  const getReg = (name: string) => {
    if (!name) return null;
    return register(name, { valueAsNumber: true });
  };
  const regQuantity = getReg("quantity");
  const regPrice = getReg("price");

  const submitData = (data: FormData) => {
    if (record) {
      data.id = record?.id;
      console.log("SUBMITED", data);
      makePostRequest(data);
      fetchData();
    }
  };
  const submit = handleSubmit(submitData);

  const createRecord = (data: FormData) => {
    if (invoice_id) {
      data.invoice_id = invoice_id;
      makePostRequest(data);
      fetchData();
      console.log("SUBMITED", data);
    }
  };
  const submitRecord = handleSubmit(createRecord);
  const getError = (name: string) => {
    return errors?.[name]?.message;
  };
  return (
    <Modal visible={visible} setVisible={setVisible}>
      {/* <form onSubmit={submit}> */}
      <div>
        <form>
          <SelectFormField
            name={"Select category"}
            label={"Select category"}
            options={categories}
            displayedOptions={displayedCategories}
            handleCallback={modifyCategory}
            defaultValue={defaultCategory}
            setDisplayedOptions={setDisplayedCategories}
            z_index={4}
            errors={getError("category_name")}
          >
            {/* <BasicButton text="New" handleClick={createNewCategory} /> */}
          </SelectFormField>
          <SelectFormField
            name={"Select item"}
            label={"Select item"}
            options={items}
            displayedOptions={displayedItems}
            handleCallback={modifyItem}
            defaultValue={defaultItem}
            setDisplayedOptions={setDisplayedItems}
            errors={getError("item_name")}
          >
            <BasicButton text="All" handleClick={showAll} />
          </SelectFormField>

          <InputFormField
            type="number"
            name={regQuantity?.name ?? ""}
            onChange={regQuantity?.onChange}
            onBlur={regQuantity?.onBlur}
            inputRef={regQuantity?.ref}
            label="Quantity"
            errors={getError("quantity")}
            afterText={defaultItem?.unit}
          >
            <MdOutlineProductionQuantityLimits />
          </InputFormField>

          <InputFormField
            type="number"
            name={regPrice?.name ?? ""}
            onChange={regPrice?.onChange}
            onBlur={regPrice?.onBlur}
            inputRef={regPrice?.ref}
            width="75%"
            label="Price per unit"
            errors={getError("price")}
            afterText={"lei"}
          >
            <MdPriceCheck />
          </InputFormField>

          {formState === "create" ? (
            <BasicButton
              text="Add record"
              type="submit"
              handleClick={submitRecord}
            />
          ) : (
            <div>
              <BasicButton text="Edit" type="submit" handleClick={submit} />{" "}
              <BasicButton
                text="Cancel"
                type="button"
                handleClick={() => {
                  setVisible(false);
                  resetPost();
                }}
              />
            </div>
          )}
        </form>

        {error && <p>{error}</p>}
        {answer && <p>{answer}</p>}
      </div>
    </Modal>
  );
};

export default EditForm;
