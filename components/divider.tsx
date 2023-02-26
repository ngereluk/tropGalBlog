import React from "react";
import { DividerBlock } from "../utils/blockTypes";

interface dividerProps {
  dividerData: DividerBlock;
}
const Divider = (props: dividerProps) => {
  return (
    <div style={{ width: "100%", paddingTop: "12px", paddingBottom: "12px" }}>
      <div
        style={{
          width: "100%",
          height: "1px",
          visibility: "visible",
          borderBottom: "1px solid rgba(55, 53, 47, 0.16)",
        }}
      ></div>
    </div>
  );
};

export default Divider;
