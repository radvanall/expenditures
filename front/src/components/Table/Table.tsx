import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import styles from "./Table.module.css";
import BasicButton from "../Buttons/BasicButton/BasicButton";
import { useTranslation } from "react-i18next";
interface Props<T> {
  tableFields: T[] | undefined;
  tableTitle?: string;
  customColumnWidth?: { columnName: string; width: number };
  buttonPading?: string;
  bodyHeight?: string;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  handleDetails?: (id: number) => void;
}
function Table<T extends { id: number }>({
  tableFields,
  tableTitle,
  customColumnWidth,
  buttonPading,
  bodyHeight,
  handleDelete,
  handleEdit,
  handleDetails,
}: PropsWithChildren<Props<T>>) {
  const { t } = useTranslation(["table"]);
  const tableHeader = tableFields?.length ? Object.keys(tableFields[0]) : null;
  const [columnWidth, setColumnWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasTableId, setHasTableId] = useState(false);
  useEffect(() => {
    const restWidth = customColumnWidth ? 95 - customColumnWidth.width : 95;
    const lenghtMin = customColumnWidth ? 1 : 0;
    if (tableFields && tableHeader !== null) {
      if (tableFields[0]?.hasOwnProperty("table_id")) {
        setColumnWidth(restWidth / (tableHeader?.length - lenghtMin - 1));
        setHasTableId(true);
      } else {
        setColumnWidth(restWidth / (tableHeader?.length - lenghtMin));
        setHasTableId(false);
      }
      tableFields?.length ? setLoading(false) : setLoading(true);
    }
  }, [tableFields]);

  if (loading) {
    return <div style={{ textAlign: "center" }}>XXXX</div>;
  }
  return (
    <table className={styles.table}>
      {tableTitle && <caption>{tableTitle}</caption>}
      <thead>
        <tr>
          {tableHeader &&
            tableHeader.map((columnName) =>
              columnName === "table_id" ? null : (
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
              )
            )}
          <th style={{ width: `${columnWidth}%` }}>{t("actions")}</th>
        </tr>
      </thead>
      <tbody
        style={bodyHeight ? { maxHeight: bodyHeight } : { maxHeight: "420px" }}
      >
        {tableFields?.map((row, index = 1) => (
          <tr key={row.id}>
            {Object.keys(row).map((cell) =>
              cell === "table_id" ? null : (
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
                    ? hasTableId
                      ? (row[
                          "table_id" as keyof typeof row
                        ] as unknown as ReactNode)
                      : index + 1
                    : (row[cell as keyof typeof row] as unknown as ReactNode)}
                </td>
              )
            )}
            <td
              className={styles.actions__cell}
              style={{
                width: `${columnWidth}%`,
                paddingLeft: buttonPading ?? "4px",
              }}
            >
              {handleDetails && (
                <BasicButton
                  text={t("details")}
                  handleClick={() => handleDetails(row["id"])}
                  height="26px"
                />
              )}
              {handleEdit && (
                <BasicButton
                  text={t("edit")}
                  handleClick={() => handleEdit(row["id"])}
                  height="26px"
                />
              )}
              {handleDelete && (
                <BasicButton
                  text={t("delete")}
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
