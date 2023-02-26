import React from "react";
import { Block } from "../utils/blockTypes";
import ColumnCell from "../components/columnCell";
interface columnProps {
  indivColumnData: Block;
}
const Column = (props: columnProps) => {
  return (
    <div
      id="col"
      style={{ display: "flex", flexDirection: "column", flexBasis: "content" }}
    >
      {" "}
      {props.indivColumnData.children.map((child) => {
        return <ColumnCell columnCellData={child} />;
      })}
    </div>
  );
};
export default Column;
