import React from "react";
import { Block } from "../utils/notionAPI";
import BlockType from "../pages/posts/findBlockType";

interface columnCellProps {
  columnCellData: Block;
}
const ColumnCell = (props: columnCellProps) => {
  return (
    <div>
      <BlockType blockData={props.columnCellData} />
    </div>
  );
};
export default ColumnCell;
