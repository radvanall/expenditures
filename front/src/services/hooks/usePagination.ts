import { useEffect, useState } from "react";

export const usePagination = () => {
  const [rowCount, setRowCount] = useState(0);
  const [offset, setOffset] = useState(10);
  const [firstRow, setFistRow] = useState(0);
  const [nrOfPages, setNrOfPages] = useState(0);
  const [selected, setSelected] = useState(1);
  const changeFirstRow = (nr: number) => {
    setFistRow(nr * offset - offset);
    setSelected(nr);
  };
  const goToStart = () => {
    setSelected(1);
    setFistRow(0);
  };
  const goToEnd = () => {
    if (rowCount) {
      setFistRow(Math.ceil(rowCount / offset) * offset - offset);
      setSelected(nrOfPages);
    }
  };
  useEffect(() => {
    if (rowCount) setNrOfPages(Math.ceil(rowCount / offset));
  }, [rowCount]);
  return {
    offset,
    firstRow,
    nrOfPages,
    selected,
    changeFirstRow,
    goToStart,
    goToEnd,
    setRowCount,
    setOffset,
  };
};
