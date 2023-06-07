import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import styles from "./Table.module.css";
import BasicButton from "../Buttons/BasicButton/BasicButton";

interface Props<T> {
  tableFields: T[] | undefined;
  tableTitle?: string;
  customColumnWidth?: { columnName: string; width: number };
  buttonPading?: string;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  handleDetails?: (id: number) => void;
}
function Table<T extends { id: number }>({
  tableFields,
  tableTitle,
  customColumnWidth,
  buttonPading,
  handleDelete,
  handleEdit,
  handleDetails,
}: PropsWithChildren<Props<T>>) {
  const tableHeader = tableFields?.length ? Object.keys(tableFields[0]) : null;
  const [columnWidth, setColumnWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const restWidth = customColumnWidth ? 95 - customColumnWidth.width : 95;
    const lenghtMin = customColumnWidth ? 1 : 0;
    if (tableHeader !== null)
      setColumnWidth(restWidth / (tableHeader?.length - lenghtMin));
    tableFields?.length ? setLoading(false) : setLoading(true);
  }, [tableFields]);

  if (loading) {
    return <div style={{ textAlign: "center" }}>No data.</div>;
  }
  return (
    <table className={styles.table}>
      {tableTitle && <caption>{tableTitle}</caption>}
      <thead>
        <tr>
          {tableHeader &&
            tableHeader.map((columnName) => (
              <th
                key={columnName}
                style={
                  columnName === "id"
                    ? { width: "5%" }
                    : columnName === customColumnWidth?.columnName
                    ? {
                        width: `${customColumnWidth.width}%`,
                        textAlign: "center",
                      }
                    : { width: `${columnWidth}%` }
                }
              >
                {columnName}
              </th>
            ))}
          <th style={{ width: `${columnWidth}%` }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableFields?.map((row, index = 1) => (
          <tr key={row.id}>
            {Object.keys(row).map((cell) => (
              <td
                key={cell}
                style={
                  cell === "id"
                    ? { width: "5%" }
                    : cell === customColumnWidth?.columnName
                    ? { width: `${customColumnWidth.width}%` }
                    : { width: `${columnWidth}%` }
                }
              >
                {cell === "id"
                  ? index + 1
                  : (row[cell as keyof typeof row] as unknown as ReactNode)}
              </td>
            ))}
            <td
              className={styles.actions__cell}
              style={{
                width: `${columnWidth}%`,
                paddingLeft: buttonPading ?? "4px",
              }}
            >
              {handleDetails && (
                <BasicButton
                  text="Details"
                  handleClick={() => handleDetails(row["id"])}
                  height="26px"
                />
              )}

              {handleEdit && (
                <BasicButton
                  text="Edit"
                  handleClick={() => handleEdit(row["id"])}
                  height="26px"
                />
              )}
              {handleDelete && (
                <BasicButton
                  text="Delete"
                  height="26px"
                  color="pink"
                  handleClick={() => handleDelete(row["id"])}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
