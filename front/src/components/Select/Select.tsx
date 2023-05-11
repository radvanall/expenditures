import React, { FC, useEffect, useState } from "react";
import styles from "./Select.module.css";
import { AiFillCaretDown } from "react-icons/ai";
interface Select {
  id: number | null | string;
  name: string;
  links?: number | null;
}
interface Props {
  //   options: { id: number; name: string; links?: string | number }[] | null;
  z_index?: number;
  defaultValue?: Select | null;
  options: Select[] | null;
  displayedOptions?: Select[] | null;
  setDisplayedOptions: React.Dispatch<React.SetStateAction<Select[] | null>>;
  handleCallback?: (id: Select) => void;
}
const Select: FC<Props> = ({
  z_index,
  defaultValue,
  options,
  displayedOptions,
  setDisplayedOptions,
  handleCallback,
}) => {
  //   const [displayedOptions, setDisplayedOptions] = useState(options);
  //   useEffect(() => {
  //     console.log("Selects select:", options);
  //     setDisplayedOptions(options);
  //   }, [options]);
  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<Select>({
    id: null,
    name: "",
    links: null,
  });
  const toggleOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible((prev) => !prev);
  };
  const handleSelect = (e: React.MouseEvent<HTMLUListElement>) => {
    setVisible(false);
    if (e.target instanceof HTMLLIElement) {
      //   console.log(e.target);
      // e.target.innerText
      console.log(e.target.getAttribute("links"));
      console.log(e.target.getAttribute("data-id"));
      //   setValue(e.target.innerText);
      const object = {
        id: Number(e.target.getAttribute("data-id")),
        name: (e.target as HTMLLIElement).innerText,
        links: Number(e.target.getAttribute("data-links")),
      };
      setValue(object);
      if (handleCallback) {
        handleCallback(object);
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(value);
    setVisible(true);
    setValue({
      id: "new",
      name: e.target.value,
      links: null,
    });
    const newArray = options?.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(newArray);
    setDisplayedOptions(newArray ?? null);
    newArray?.length ? setVisible(true) : setVisible(false);
  };
  const handleBlur = () => {
    console.log("name:", value.name);
    console.log(
      "some:",
      options?.some(
        (option) => option.name.toLowerCase() === value.name.toLowerCase()
      )
    );
    if (
      !options?.some(
        (option) => option.name.toLowerCase() === value.name.toLowerCase()
      )
    ) {
      setValue({
        id: null,
        name: "",
        links: null,
      });
      //   setDisplayedOptions(options);
      //   setVisible(false);
    }
    //setVisible(true);
    setTimeout(() => {
      setDisplayedOptions(options);
    }, 100);
  };
  return (
    <div className={styles.select__wrapper}>
      <label htmlFor="select">name</label>
      <div className={styles.input__wrapper}>
        <input
          onBlur={handleBlur}
          type="text"
          name="select"
          value={value.name}
          onChange={handleInputChange}
        />
        <button onClick={toggleOptions}>
          <AiFillCaretDown
            className={visible ? `${styles.icon} ${styles.up}` : styles.icon}
          />
        </button>
      </div>
      <ul
        style={{ zIndex: z_index ?? 3 }}
        className={visible ? styles.ul_visible : undefined}
        onMouseDown={handleSelect}
      >
        {displayedOptions &&
          displayedOptions.map((option) => (
            <li
              key={option.id}
              data-links={option?.links ?? ""}
              data-id={option?.id}
            >
              {option.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Select;
