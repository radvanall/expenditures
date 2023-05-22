import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import styles from "./Table.module.css";
import BasicButton from "../Buttons/BasicButton/BasicButton";

// console.log(Object.keys(data[0]).length);
// console.log(95 / 5);
// interface tableField {
//   id: number;
//   category: string;
//   item: string;
//   price: number;
//   quantity: number;
//   total: number;
// }
// interface Props<T> {
//   tableFields: tableField[] | undefined;
//   handleEdit: (id: number) => void;
//   handleDelete: (id: number) => void;
//   tableTitle: string;
// }
interface Props<T> {
  tableFields: T[] | undefined;
  tableTitle: string;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  handleDetails?: (id: number) => void;
}
// const Table: FC<Props<T>> = ({
//   tableFields,
//   handleEdit,
//   handleDelete,
//   tableTitle,
function Table<T extends { id: number }>({
  tableFields,
  tableTitle,
  handleDelete,
  handleEdit,
  handleDetails,
}: PropsWithChildren<Props<T>>) {
  const tableHeader = tableFields?.length ? Object.keys(tableFields[0]) : null;
  const [columnWidth, setColumnWidth] = useState(0);
  useEffect(() => {
    if (tableHeader !== null) setColumnWidth(95 / tableHeader?.length);
  }, [tableFields]);

  return (
    <table className={styles.table}>
      <caption>{tableTitle}</caption>
      <thead>
        {tableFields?.length && (
          <tr>
            {tableHeader &&
              tableHeader.map((columnName) => (
                <th
                  style={
                    columnName === "id"
                      ? { width: "5%" }
                      : { width: `${columnWidth}%` }
                  }
                >
                  {columnName}
                </th>
              ))}
            <th style={{ width: `${columnWidth}%` }}>Actions</th>
          </tr>
        )}
      </thead>
      <tbody>
        {tableFields?.length &&
          tableFields.map((row) => (
            <tr>
              {Object.keys(row).map((cell) => (
                <td
                  style={
                    cell === "id"
                      ? { width: "5%" }
                      : { width: `${columnWidth}%` }
                  }
                >
                  {row[cell as keyof typeof row] as unknown as ReactNode}
                </td>
              ))}
              <td
                className={styles.actions__cell}
                style={{ width: `${columnWidth}%` }}
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
