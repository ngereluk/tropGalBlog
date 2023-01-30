import React from "react";
import { ColumnBlock } from "../utils/notionAPI";
import Column from "../components/column";

interface columnSetProps {
  columnData: ColumnBlock;
}
const ColumnSet = (props: columnSetProps) => {
  // console.log("columnData ", props.columnData.children.length);
  const numberChildColumns = props.columnData.children.length;
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      {props.columnData.children.map((child) => {
        return (
          <div
            style={{
              paddingLeft: 10,
              display: "flex",
              width:
                numberChildColumns === 2
                  ? "50%"
                  : numberChildColumns === 3
                  ? "33%"
                  : numberChildColumns === 4
                  ? "25%"
                  : "20%",
            }}
          >
            <Column indivColumnData={child} />
          </div>
        );
      })}
    </div>
  );
};
export default ColumnSet;
