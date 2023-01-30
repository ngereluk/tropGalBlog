import React, { useEffect, useState } from "react";
import { BookmarkBlock } from "../utils/notionAPI";
import { PreviewData } from "../pages/api/scrapeURL";
import Link from "next/link";

interface bookmarkProps {
  bookmarkData: BookmarkBlock;
}
const Bookmark = (props: bookmarkProps) => {
  const [previewDatadata, setPreviewData] = useState({
    images: "",
    title: "",
    favicons: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [styleClasses, setStyleClasses] = useState("caption");

  async function fetchPage(url: string, blockType: string) {
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
      const previewDataReturned = (await res.json()) as PreviewData;
      setPreviewData((prevState) => ({
        ...prevState,
        images: previewDataReturned.images[0],
        title: previewDataReturned.title,
        favicons: previewDataReturned.favicons[0],
        description: previewDataReturned.description,
      }));
      //  console.log({ previewDatadata });
    } catch (e: any) {
      setError(e.toString());
    }
  }

  useEffect(() => {
    fetchPage(props.bookmarkData.url, "bookmark");
    if (props.bookmarkData.code === true) {
      setStyleClasses("caption code");
    }
  }, []);

  return (
    <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
      <Link href={props.bookmarkData.url} target="_blank">
        <div
          style={{
            width: "100%",
            maxWidth: "530px",
            marginTop: "4px",
            marginBottom: "4px",
            display: "flex",
            userSelect: "none",
            transition: "background 20ms ease-in 0s",
            flexWrap: "wrap-reverse",
            alignItems: "stretch",
            textAlign: "left",
            overflow: "hidden",
            border: "1px solid rgba(55, 53, 47, 0.16)",
            borderRadius: "3px",
            position: "relative",
            color: "inherit",
            fill: "inherit",
          }}
          id="bookmarkBlock"
        >
          <div
            style={{
              flex: "4 1 180px",
              padding: "14px 14px 14px",
              overflow: "hidden",
              textAlign: "left",
            }}
            id="bookmarkRHS"
          >
            <div
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "rgb(55, 53, 47)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "24px",
                marginBottom: "2px",
              }}
              id="bookmarkTitle"
            >
              {" "}
              {previewDatadata.title}
            </div>
            <div
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                color: "rgba(55, 53, 47, 0.65)",
                height: "32px",
                overflow: "hidden",
                textAlign: "left",
              }}
              id="bookmarkDescription"
            >
              {" "}
              {previewDatadata.description}
            </div>
            <div
              style={{ display: "flex", marginTop: "6px" }}
              id="faviconAndUrl"
            >
              {" "}
              <img
                src={previewDatadata.favicons}
                alt="tmp"
                style={{
                  width: "16px",
                  height: "16px",
                  minWidth: "16px",
                  marginRight: "6px",
                }}
              />
              <div
                style={{
                  minWidth: "16px",
                  marginRight: "6px",
                  color: "rgb(55, 53, 47)",
                  fontSize: "12px",
                }}
                id="url"
              >
                {" "}
                {props.bookmarkData.url}
              </div>
            </div>
          </div>

          <div
            style={{
              flex: "1 1 180px",
              display: "block",
              position: "relative",
            }}
            id="bookmarkLHS"
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                inset: "0px",
              }}
            >
              {" "}
              <div style={{ width: "100%", height: "100%" }}>
                <img
                  src={previewDatadata.images}
                  alt="tmp"
                  style={{
                    display: "block",
                    objectFit: "cover",
                    borderRadius: "1px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={styleClasses}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            fontWeight: props.bookmarkData.bold === true ? "bold" : "inherit",
            fontStyle:
              props.bookmarkData.italic === true ? "italic" : "inherit",
            textDecoration:
              props.bookmarkData.underline === true &&
              props.bookmarkData.strikethrough === true
                ? "underline line-through"
                : props.bookmarkData.underline === true &&
                  props.bookmarkData.strikethrough !== true
                ? "underline"
                : props.bookmarkData.underline !== true &&
                  props.bookmarkData.strikethrough === true
                ? "line-through"
                : "inherit",
            color: props.bookmarkData.color,
          }}
        >
          {" "}
          {props.bookmarkData.caption}
        </div>
      </Link>
    </div>
  );
};

export default Bookmark;
