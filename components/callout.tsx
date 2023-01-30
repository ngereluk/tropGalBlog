import React, { useEffect, useState } from "react";
import { CalloutBlock } from "../utils/notionAPI";

interface calloutProps {
  calloutData: CalloutBlock;
}
const Callout = (props: calloutProps) => {
  console.log("calloutData ", props.calloutData);
  const [styleClasses, setStyleClasses] = useState("");
  useEffect(() => {
    if (props.calloutData.code === true) {
      setStyleClasses("code");
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "536px",
        marginTop: "4px",
        marginBottom: "4px",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderRadius: "3px",
          background: "rgb(241, 241, 239)",
          padding: "16px 16px 16px 12px",
        }}
      >
        <div
          id="calloutIcon"
          style={{
            userSelect: "none",
            transition: "background 20ms ease-in 0s",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "24px",
            width: "24px",
            borderRadius: "0.25em",
            flexShrink: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "24px",
              width: "24px",
            }}
          >
            <div
              className={styleClasses}
              style={{
                height: "21.6px",
                width: "21.6px",
                fontSize: "21.6px",
                marginLeft: "0px",
                fontFamily:
                  "'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols",
                lineHeight: "1em",
                whiteSpace: "nowrap",
              }}
            >
              {" "}
              {props.calloutData.icon}
            </div>{" "}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            minWidth: "0px",
            marginLeft: "8px",
            width: "100%",
            maxWidth: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            caretColor: "rgb(55, 53, 47)",
            paddingLeft: "2px",
            paddingRight: "2px",
            fontWeight: props.calloutData.bold === true ? "bold" : "inherit",
            fontStyle: props.calloutData.italic === true ? "italic" : "inherit",
            textDecoration:
              props.calloutData.underline === true &&
              props.calloutData.strikethrough === true
                ? "underline line-through"
                : props.calloutData.underline === true &&
                  props.calloutData.strikethrough !== true
                ? "underline"
                : props.calloutData.underline !== true &&
                  props.calloutData.strikethrough === true
                ? "line-through"
                : "inherit",
            color: props.calloutData.color,
          }}
        >
          {props.calloutData.content}
        </div>
      </div>
    </div>
  );
};

export default Callout;
