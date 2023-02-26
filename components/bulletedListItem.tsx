import React, { useEffect, useState } from "react";
import { BulletedListItemBlock } from "../utils/blockTypes";

interface bulletedListProps {
  listDataItem: BulletedListItemBlock;
}
const BulletedListItem = (props: bulletedListProps) => {
  const [styleClasses, setStyleClasses] = useState("");
  useEffect(() => {
    if (props.listDataItem.code === true) {
      setStyleClasses("code");
    }
  }, []);
  return (
    <div style={{ paddingTop: "5px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "591px",
          marginTop: "1px",
          marginBottom: "1px",
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
                fontSize: "1.5em",
                lineHeight: "1",
                display: "flex",
                color: props.listDataItem.color,
              }}
            >
              •
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
                className={styleClasses}
                style={{
                  maxWidth: "100%",
                  width: "100%",
                  padding: "3px 2px",
                  textAlign: "left",
                  display: "flex",
                  fontWeight:
                    props.listDataItem.bold === true ? "bold" : "inherit",
                  fontStyle:
                    props.listDataItem.italic === true ? "italic" : "inherit",
                  textDecoration:
                    props.listDataItem.underline === true &&
                    props.listDataItem.strikethrough === true
                      ? "underline line-through"
                      : props.listDataItem.underline === true &&
                        props.listDataItem.strikethrough !== true
                      ? "underline"
                      : props.listDataItem.underline !== true &&
                        props.listDataItem.strikethrough === true
                      ? "line-through"
                      : "inherit",
                  color: props.listDataItem.color,
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

export default BulletedListItem;
