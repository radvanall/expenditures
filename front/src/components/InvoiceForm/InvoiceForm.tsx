import React, { useEffect, useRef, useState } from "react";
import styles from "./InvoiceForm.module.css";
import useGet from "../../services/hooks/useGet";
import api from "../../services/hooks/api";
import Select from "../Select/Select";
import { AiFillPoundCircle } from "react-icons/ai";
import { newItem } from "../../data/loginInputFields";
import { useMountTransition } from "../../services/hooks/useMountTransition";
import AddItemModal from "../Modals/AddItemModal/AddItemModal";
interface apiData {
  category_id: string;
  category_name: string;
  items: { item_id: string; item_name: string; unit: string }[];
}
// interface Select {
//   id: number;
//   name: string;
//   links?: string | number;
// }
interface SelectI {
  id: number | null | string;
  name: string;
  links?: number | null;
}

const InvoiceForm = () => {
  // const { getData } = useGet(
  //   "http://localhost:84/expenditures/public/category.php?request=categoriesAndItems"
  // );
  const [modal, setModal] = useState<boolean>(false);
  const hasTransitionedIn = useMountTransition(modal, 1000);
  const [categories, setCategories] = useState<SelectI[] | null>(null);
  const [defaultCategory, setDefaultCategory] = useState<SelectI | null>(null);
  const [items, setItems] = useState<SelectI[] | null>(null);
  const [displayedItems, setDisplayedItems] = useState<SelectI[] | null>(null);
  const [defaultItem, setDefaultItem] = useState<SelectI | null>(null);
  const [displayedCategories, setDisplayedCategories] = useState<
    SelectI[] | null
  >(null);
  const ref = useRef<HTMLSelectElement>(null);
  console.log(ref);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          "/category.php?request=categoriesAndItems",
          { withCredentials: true }
        );
        console.log(response.data);
        const categoryArray = response.data.map((item: apiData) => ({
          id: item.category_id,
          name: item.category_name,
        }));
        setCategories([...categoryArray]);
        setDisplayedCategories([...categoryArray]);
        console.log("categories:", categories);
        const itemArray = response.data.flatMap((category: apiData) => {
          const items = category.items.map((item) => ({
            id: item.item_id,
            name: item.item_name,
            unit: item.unit,
            links: category.category_id,
          }));
          return items;
          // id:
          // name: item.category_name,
          // links:
        });
        console.log(itemArray);
        setItems(itemArray);
        setDisplayedItems(itemArray);
        console.log("items:", items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const selectedOption = ref.current?.options[ref.current.selectedIndex];
    const category = selectedOption?.dataset.category;
    console.log(category);
  };
  const handleChangeCategory = (item: Select) => {
    const newArray = items?.filter((value) => Number(value.links) === item.id);
    setDisplayedItems(newArray ?? null);
    setDefaultItem({
      id: null,
      name: "",
      links: null,
    });
    console.log(newArray);
  };
  const handleChangeItem = (item: Select) => {
    const newArray = categories?.filter(
      (category) => Number(category.id) === Number(item.links)
    );
    if (newArray) {
      setDefaultCategory({
        id: newArray[0].id,
        name: newArray[0].name,
        links: newArray[0]?.links,
      });
    }

    //setDisplayedCategories(newArray ?? null);
    console.log("newArray:", newArray);
  };
  const showAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisplayedItems(items);
  };
  const createNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModal(true);
  };
  return (
    <div>
      {(modal || hasTransitionedIn) && (
        <AddItemModal
          visible={modal && hasTransitionedIn}
          setVisible={setModal}
          // changedField={changedField}
          // value={selectedUserField}
          inputFields={newItem}
        />
      )}
      <form>
        <Select
          options={categories}
          displayedOptions={displayedCategories}
          handleCallback={handleChangeCategory}
          defaultValue={defaultCategory}
          setDisplayedOptions={setDisplayedCategories}
          z_index={4}
        />
        <div>
          <Select
            options={items}
            displayedOptions={displayedItems}
            setDisplayedOptions={setDisplayedItems}
            defaultValue={defaultItem}
            handleCallback={handleChangeItem}
          />
          <button onClick={showAll}>All</button>
          <button onClick={createNewItem}>New</button>
        </div>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          id=""
          defaultValue={new Date().toISOString().slice(0, 10)}
        />
        <label htmlFor="category">Category:</label>
        <select name="category" id="category" defaultValue="">
          <option value={1}>---</option>
        </select>
        <label htmlFor="item">Item:</label>
        <select
          name="item"
          id="item"
          defaultValue=""
          ref={ref}
          onChange={handleSelectChange}
        >
          <option value="" data-category="1">
            ---
          </option>
          <option value={1} data-category="1">
            Option 1
          </option>
          <option value="2" data-category="2">
            Option 2
          </option>
          <option value="3" data-category="xcxcxc">
            Option 3
          </option>
        </select>
      </form>
    </div>
  );
};

export default InvoiceForm;
