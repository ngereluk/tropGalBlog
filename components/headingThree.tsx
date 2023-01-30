import React, { useEffect, useState } from "react";
import { HeadingThreeBlock } from "../utils/notionAPI";

interface headingThreeProps {
  headingData: HeadingThreeBlock;
}
const HeadingThree = (props: headingThreeProps) => {
  const [styleClasses, setStyleClasses] = useState("");
  useEffect(() => {
    if (props.headingData.code === true) {
      setStyleClasses("code");
    }
  }, []);
  return (
    <div>
      <div
        className={styleClasses}
        style={{
          maxWidth: "100%",
          width: "100%",
          padding: "3px 2px",
          fontWeight: "600",
          fontSize: "1.25em",
          lineHeight: "1.3",
          marginTop: "1em",
          marginBottom: "1px",
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

export default HeadingThree;
