import React, { useEffect } from "react";

type useCloseDropDownType = (
  datAtribute: string,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) => void;
export const useCloseDropDown: useCloseDropDownType = (
  dataAtribute,
  setVisible
) => {
  useEffect(() => {
    const checkParentDataId = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      let iterations = 0;
      let isTrue = false;
      while (target && target !== document.body && iterations < 5) {
        const dataIndex = target.getAttribute("data-list");
        if (dataIndex === dataAtribute) {
          isTrue = true;
          break;
        }
        target = target.parentElement;
        iterations++;
      }
      if (!isTrue) setVisible(false);
    };

    window.addEventListener("mousedown", checkParentDataId);
    return () => {
      window.removeEventListener("mousedown", checkParentDataId);
    };
  }, []);
};
