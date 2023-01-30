import React, { useEffect, useState } from "react";
import { HeadingTwoBlock } from "../utils/notionAPI";

interface headingTwoProps {
  headingData: HeadingTwoBlock;
}
const HeadingTwo = (props: headingTwoProps) => {
  const [styleClasses, setStyleClasses] = useState("");
  useEffect(() => {
    if (props.headingData.code === true) {
      setStyleClasses("code");
    }
  }, []);
  return (
    <div style={{ paddingTop: "2.2em" }}>
      <div
        className={styleClasses}
        style={{
          maxWidth: "100%",
          width: "100%",
          fontWeight: "600",
          fontSize: "1.5em",
          lineHeight: "1.3",
          display: "flex",
          fontStyle: props.headingData.italic === true ? "italic" : "inherit",
          textDecoration:
            props.headingData.underline === true &&
            props.headingData.strikethrough === true
              ? "underline line-through"
              : props.headingData.underline === true &&
                props.headingData.strikethrough !== true
              ? "underline"
              : props.headingData.underline !== true &&
                props.headingData.strikethrough === true
              ? "line-through"
              : "inherit",
          color: props.headingData.color,
        }}
      >
        {props.headingData.content}
      </div>
    </div>
  );
};

export default HeadingTwo;
