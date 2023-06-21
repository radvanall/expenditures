import { useEffect, useReducer, useRef, useState } from "react";
import { SelectI } from "../../Interfaces/SelectI";
import { useCloseDropDown } from "../../services/hooks/useCloseDropDown";
import { useKeyPress } from "../../services/hooks/useKeyPress";
import { reducer, TYPE, initState } from "./reducer";

const useSelect = (
  options: SelectI[] | null,
  setDisplayedOptions: React.Dispatch<React.SetStateAction<SelectI[] | null>>,
  displayedOptions: SelectI[] | null | undefined,
  defaultValue?: SelectI | null,
  handleCallback?: (id: SelectI) => void
) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterPressed = useKeyPress("Enter");
  useCloseDropDown("drop_down_list", setVisible);
  useEffect(() => {
    if (enterPressed && visible) {
      const option = liRefs.current[state.selected];
      const object = {
        id: Number(option?.getAttribute("data-id")),
        name: (option as HTMLLIElement).innerText,
        links: Number(option?.getAttribute("data-links")),
      };
      dispatch({ type: TYPE.SET_VALUE, payload: object });
      if (handleCallback) {
        handleCallback(object);
      }
    }
  }, [enterPressed]);

  useEffect(() => {
    dispatch({ type: TYPE.RESET });
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [visible]);
  useEffect(() => {
    if (arrowUpPressed && displayedOptions) {
      visible && dispatch({ type: TYPE.MOVE_UP });
      if (listRef.current) {
        listRef.current.scrollTop -= 25;
      }
    }
  }, [arrowUpPressed]);
  useEffect(() => {
    if (arrowDownPressed && displayedOptions) {
      if (state.selected < displayedOptions?.length - 1) {
        visible && dispatch({ type: TYPE.MOVE_DOWN });
        if (listRef.current) {
          listRef.current.scrollTop += 25;
        }
      }
    }
  }, [arrowDownPressed]);
  useEffect(() => {
    if (defaultValue) dispatch({ type: TYPE.SET_VALUE, payload: defaultValue });
  }, [defaultValue]);

  const toggleOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible((prev) => !prev);
  };
  const handleSelect = (e: React.MouseEvent<HTMLUListElement>) => {
    setVisible(false);
    if (e.target instanceof HTMLLIElement) {
      const object = {
        id: Number(e.target.getAttribute("data-id")),
        name: (e.target as HTMLLIElement).innerText,
        links: Number(e.target.getAttribute("data-links")),
      };
      dispatch({ type: TYPE.SET_VALUE, payload: object });
      if (handleCallback) {
        handleCallback(object);
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(true);
    dispatch({
      type: TYPE.SET_VALUE,
      payload: {
        id: "new",
        name: e.target.value,
        links: null,
      },
    });
    const newArray = options?.filter(
      (item) =>
        item.name !== null &&
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedOptions(newArray ?? null);
    newArray?.length ? setVisible(true) : setVisible(false);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const firstMatch = options
      ?.filter((item) => item.name !== null)
      .find(
        (option) => option.name.toLowerCase() === state.value.name.toLowerCase()
      );
    const persistedData: SelectI = {
      id: null,
      name: "",
      links: null,
    };
    if (firstMatch) {
      persistedData.id = firstMatch.id;
      persistedData.name = firstMatch.name;
      persistedData.links = firstMatch.links ?? null;
    }
    dispatch({ type: TYPE.SET_VALUE, payload: persistedData });
    if (handleCallback) {
      handleCallback(persistedData);
    }
  };

  return {
    toggleOptions,
    handleBlur,
    handleInputChange,
    handleSelect,
    liRefs,
    listRef,
    visible,
    state,
  };
};
export default useSelect;
