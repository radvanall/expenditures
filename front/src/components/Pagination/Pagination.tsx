import React, { FC, useState } from "react";
import PaginButton from "../Buttons/PaginButton/PaginButton";
import styles from "./Pagination.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
interface PaginationI {
  goToStart: () => void;
  goToEnd: () => void;
  changeFirstRow: (nr: number) => void;
  nr_of_pages: number;
  selected: number;
}
const Pagination: FC<PaginationI> = ({
  goToStart,
  goToEnd,
  changeFirstRow,
  nr_of_pages,
  selected,
}) => {
  //   const [selected, setSelected] = useState(1);
  //   const handlePangeSelect = (index: number) => {
  //     changeFirstRow(index + 1);
  //     setSelected(index + 1);
  //   };
  return (
    <div className={styles.pagination__container}>
      <PaginButton onClick={goToStart}>
        <AiOutlineLeft />
      </PaginButton>
      {Array.from({ length: nr_of_pages }, (_, index) => (
        <PaginButton
          key={index + 1}
          onClick={() => changeFirstRow(index + 1)}
          className={selected === index + 1 ? styles.active__button : ""}
        >
          {index + 1}
        </PaginButton>
      ))}
      <PaginButton onClick={goToEnd}>
        <AiOutlineRight />
      </PaginButton>
    </div>
  );
};

export default Pagination;
