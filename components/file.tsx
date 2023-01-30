import React, { useEffect, useState } from "react";
import { FileBlock } from "../utils/notionAPI";
import { FileSize } from "../pages/api/scrapeURL";
import Link from "next/link";

interface fileProps {
  fileData: FileBlock;
}
const File = (props: fileProps) => {
  const [error, setError] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [styleClasses, setStyleClasses] = useState("caption");

  async function fetchFileSize(url: string, blockType: string) {
    try {
      const res = await fetch("/api/scrapeURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          blockType: blockType,
        }),
      });

      const fileSizeDataReturned = (await res.json()) as FileSize;
      setFileSize(fileSizeDataReturned.fileSize);
    } catch (e: any) {
      setError(e.toString());
    }
  }

  useEffect(() => {
    fetchFileSize(props.fileData.url, "file");
    var filenamePart = props.fileData.url.substring(
      props.fileData.url.lastIndexOf("/") + 1
    );
    setFileName(filenamePart.substring(0, filenamePart.indexOf(".")));
    if (props.fileData.code === true) {
      setStyleClasses("caption code");
    }
  }, []);

  return (
    <div>
      <Link href={props.fileData.url} target="_blank">
        <div
          style={{
            width: "100%",
            maxWidth: "728px",
            marginTop: "1px",
            marginBottom: "1px",
            display: "flex",
            userSelect: "none",
            transition: "background 20ms ease-in 0s",
            flexGrow: "",
            borderRadius: "3px",
            alignItems: "center",
            paddingTop: "7px",
            paddingBottom: "3px",
            paddingLeft: "2px",
          }}
        >
          <div style={{ display: "flex", padding: "0px 5px 0px 5px" }}>
            {" "}
            <img
              src="/upload-file.svg"
              alt="SVG as an image"
              style={{ width: "20px", height: "25px" }}
            />{" "}
          </div>
          <div
            style={{
              flex: "1 1 0px",
              minWidth: "1px",
              display: "flex",
              alignItems: "baseline",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {" "}
            {fileName}
          </div>
          <div
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              color: "rgba(55, 53, 47, 0.65)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginLeft: "6px",
            }}
          >
            {fileSize}
          </div>
        </div>
      </Link>
      <div style={{ paddingTop: "8px" }}>
        <div
          className={styleClasses}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            fontWeight: props.fileData.bold === true ? "bold" : "inherit",
            fontStyle: props.fileData.italic === true ? "italic" : "inherit",
            textDecoration:
              props.fileData.underline === true &&
              props.fileData.strikethrough === true
                ? "underline line-through"
                : props.fileData.underline === true &&
                  props.fileData.strikethrough !== true
                ? "underline"
                : props.fileData.underline !== true &&
                  props.fileData.strikethrough === true
                ? "line-through"
                : "inherit",
            color: props.fileData.color,
          }}
        >
          {" "}
          {props.fileData.caption}
        </div>
      </div>
    </div>
  );
};

export default File;
