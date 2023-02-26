import React, { useEffect, useState } from "react";
import { QuoteBlock } from "../utils/blockTypes";

interface quoteProps {
  quoteData: QuoteBlock;
}
const Quote = (props: quoteProps) => {
  const [styleClasses, setStyleClasses] = useState("");
  useEffect(() => {
    if (props.quoteData.code === true) {
      setStyleClasses("code");
    }
  }, []);
  return (
    <div>
      <div
        style={{
          width: "100%",
          maxWidth: "536px",
          marginTop: "4px",
          marginBottom: "0px",
          fontSize: "1em",
          padding: "3px 2px",
          color: "inherit",
          fill: "inherit",
          display: "flex",
        }}
      >
        <div
          style={{
            borderLeft: "3px solid currentcolor",
            paddingLeft: "14px",
            paddingRight: "14px",
            width: "100%",
          }}
        >
          <div
            className={styleClasses}
            style={{
              maxWidth: "100%",
              width: "100%",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              paddingLeft: "2px",
              paddingRight: "2px",
              fontWeight: props.quoteData.bold === true ? "bold" : "inherit",
              fontStyle: props.quoteData.italic === true ? "italic" : "inherit",
              textDecoration:
                props.quoteData.underline === true &&
                props.quoteData.strikethrough === true
                  ? "underline line-through"
                  : props.quoteData.underline === true &&
                    props.quoteData.strikethrough !== true
                  ? "underline"
                  : props.quoteData.underline !== true &&
                    props.quoteData.strikethrough === true
                  ? "line-through"
                  : "inherit",
              color: props.quoteData.color,
            }}
          >
            {" "}
            {props.quoteData.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
