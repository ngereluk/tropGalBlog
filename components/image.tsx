import React, { useEffect, useState } from "react";
import { ImageBlock } from "../utils/notionAPI";

interface imageProps {
  imageData: ImageBlock;
}
const Image = (props: imageProps) => {
  const [styleClasses, setStyleClasses] = useState("caption");
  useEffect(() => {
    if (props.imageData.code === true) {
      setStyleClasses("caption code");
    }
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          maxWidth: "660px",
          padding: "3px 2px",
          marginTop: "4px",
          marginBottom: "4px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <img
          src={props.imageData.url}
          alt="SVG as an image"
          style={{ height: "15vh" }}
        />
        <div style={{ paddingTop: "5px" }}>
          <div
            className={styleClasses}
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              fontWeight: props.imageData.bold === true ? "bold" : "inherit",
              fontStyle: props.imageData.italic === true ? "italic" : "inherit",
              textDecoration:
                props.imageData.underline === true &&
                props.imageData.strikethrough === true
                  ? "underline line-through"
                  : props.imageData.underline === true &&
                    props.imageData.strikethrough !== true
                  ? "underline"
                  : props.imageData.underline !== true &&
                    props.imageData.strikethrough === true
                  ? "line-through"
                  : "inherit",
              color: props.imageData.color,
            }}
          >
            {" "}
            {props.imageData.caption}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
