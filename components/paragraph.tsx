import React, { useEffect, useState } from "react";
import { ParagraphBlock } from "../utils/blockTypes";

interface paragraphProps {
  paragraphData: ParagraphBlock;
}
const Paragraph = (props: paragraphProps) => {
  //console.log("props.paragraphData ", props.paragraphData.plain_text);
  const [styleClasses, setStyleClasses] = useState("");
  useEffect(() => {
    if (props.paragraphData.code === true) {
      setStyleClasses("code");
    }
  }, []);
  return (
    <div
      className={styleClasses}
      style={{
        fontSize: "16px",
        lineHeight: "1.5",
        display: "flex",
        fontWeight: props.paragraphData.bold == true ? "bold" : "normal",
        fontStyle: props.paragraphData.italic == true ? "italic" : "normal",
        textDecoration:
          props.paragraphData.underline === true &&
          props.paragraphData.strikethrough === true
            ? "underline line-through"
            : props.paragraphData.underline === true &&
              props.paragraphData.strikethrough !== true
            ? "underline"
            : props.paragraphData.underline !== true &&
              props.paragraphData.strikethrough === true
            ? "line-through"
            : "inherit",
        width: "100%",
        maxWidth: "100%",
        marginTop: "2px",
        marginBottom: "1px",
        color: props.paragraphData.color,
      }}
    >
      {props.paragraphData.plain_text}
    </div>
  );
};

export default Paragraph;
