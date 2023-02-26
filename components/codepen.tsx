import React, { useEffect, useState } from "react";
import { EmbedBlock } from "../utils/blockTypes";
import Codepen from "react-codepen-embed";

interface codepenProps {
  codepenData: EmbedBlock;
}
const CodePen = (props: codepenProps) => {
  const [styleClasses, setStyleClasses] = useState("caption");
  useEffect(() => {
    if (props.codepenData.code === true) {
      setStyleClasses("caption code");
    }
  }, []);
  const penHash = props.codepenData.url.substring(
    props.codepenData.url.lastIndexOf("/") + 1,
    props.codepenData.url.length
  );

  const penUser = props.codepenData.url.substring(
    props.codepenData.url.indexOf("io/") + 3,
    props.codepenData.url.indexOf("/pen")
  );

  return (
    <div>
      <Codepen hash={penHash} user={penUser} />
      <div style={{ paddingTop: "8px" }}>
        <div
          className={styleClasses}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            fontWeight: props.codepenData.bold === true ? "bold" : "inherit",
            fontStyle: props.codepenData.italic === true ? "italic" : "inherit",
            textDecoration:
              props.codepenData.underline === true &&
              props.codepenData.strikethrough === true
                ? "underline line-through"
                : props.codepenData.underline === true &&
                  props.codepenData.strikethrough !== true
                ? "underline"
                : props.codepenData.underline !== true &&
                  props.codepenData.strikethrough === true
                ? "line-through"
                : "inherit",
            color: props.codepenData.color,
          }}
        >
          {props.codepenData.caption}
        </div>
      </div>
    </div>
  );
};

export default CodePen;
