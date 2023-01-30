import React from "react";
import { NumberedListItemBlock } from "../utils/notionAPI";

interface numberedListItemProps {
  listDataItem: NumberedListItemBlock;
  numberedListItemNum: number;
}
const NumberedListItem = (props: numberedListItemProps) => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          maxWidth: "591px",
          marginTop: "1px",
          marginBottom: "1px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flexStart",
            width: "100%",
            paddingLeft: "2px",
            color: "inherit",
            fill: "inherit",
          }}
        >
          <div
            style={{
              userSelect: "none",
              marginRight: "2px",
              width: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: "0",
              flexShrink: "0",
              minHeight: "calc(1.5em + 3px + 3px)",
            }}
          >
            <div
              style={{
                minHeight: "calc(1.5em + 3px + 3px)",
                lineHeight: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {props.numberedListItemNum}.
            </div>
          </div>
          <div
            style={{
              flex: "1 1 0px",
              minWidth: "1px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", paddingTop: "2px" }}>
              <div
                style={{
                  maxWidth: "100%",
                  width: "100%",
                  padding: "3px 2px",
                  textAlign: "left",
                  display: "flex",
                }}
              >
                {props.listDataItem.content}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberedListItem;
