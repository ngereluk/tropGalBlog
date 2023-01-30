import React from "react";
import { TableBlock, TableRowBlock } from "../utils/notionAPI";

interface tableProps {
  tableData: TableBlock;
}
const Table = (props: tableProps) => {
  const tableRows = props.tableData.children as TableRowBlock[];
  console.log("tableData ", props.tableData);
  //console.log("tableRows ", tableRows);
  //  tableRows.map((row) => console.log("row num ", row.rowNum));
  return (
    <div>
      <div
        style={{
          maxWidth: "100%",
          width: "100%",
          padding: "3px 2px",
          lineHeight: "1.3",
          marginTop: "1em",
          marginBottom: "1px",
        }}
      >
        <table
          style={{
            borderSpacing: "0px !important",
            border: "0.25px solid grey",
          }}
        >
          {" "}
          <tbody>
            {tableRows.map((row) => (
              <tr
                style={{
                  backgroundColor:
                    row.rowNum === 1 &&
                    props.tableData.has_column_header === true
                      ? "rgb(247, 246, 243)"
                      : "inherit",
                }}
              >
                {row.cells.map((cell) => (
                  <td
                    className={cell.code ? "code" : ""}
                    style={{
                      padding: "7px",
                      border: "0.25px solid grey",
                      fontWeight: cell.bold === true ? "bold" : "inherit",
                      fontStyle: cell.italic === true ? "italic" : "inherit",
                      textDecoration:
                        cell.underline === true && cell.strikethrough === true
                          ? "underline line-through"
                          : cell.underline === true &&
                            cell.strikethrough !== true
                          ? "underline"
                          : cell.underline !== true &&
                            cell.strikethrough === true
                          ? "line-through"
                          : "inherit",
                      color: cell.color,
                      backgroundColor:
                        cell.cellNum === 0 &&
                        props.tableData.has_row_header === true
                          ? "rgb(247, 246, 243)"
                          : "inherit",
                    }}
                  >
                    {cell.content}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
{
}
export default Table;
