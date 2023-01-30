import React from "react";
import { useDetectIsMobile } from "../hooks/useDetectIsMobile";

interface pageBodyFooterProps {
  articleMetaData: any;
}
const PageBodyFooter = (props: pageBodyFooterProps) => {
  const isMobile = useDetectIsMobile();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        paddingTop: "100px",
        paddingBottom: "20px",
      }}
    >
      <div style={{ display: "flex", flexGrow: "1" }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "85%" : "50%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "30px",
          }}
        >
          {props.articleMetaData.tagArray.map((tag: string) => {
            return (
              <div
                style={{
                  padding: "10px 5px 10px 5px",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "rgba(135, 131, 120, 0.15)",
                    borderRadius: "5px",
                    color: "#757575",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tag}
                </div>{" "}
              </div>
            );
          })}
        </div>
        <div
          id="socialMediaLinks"
          style={{
            display: "flex",
            paddingBottom: "10px",
          }}
        >
          {" "}
          <img
            src="/rocket.svg"
            alt="SVG as an image"
            style={{ height: "3vh" }}
          />{" "}
          <div style={{ display: "flex", paddingLeft: "10px" }}>2 boosts</div>
          <div style={{ display: "flex", flexGrow: "1" }}></div>
          <div
            id="spacerDiv"
            style={{ display: "flex", flexGrow: "1" }}
          ></div>{" "}
          <div style={{ display: "flex", padding: "0px 5px 0px 5px" }}>
            {" "}
            <img
              src="/twitter.svg"
              alt="SVG as an image"
              style={{ height: "3vh" }}
            />{" "}
          </div>
          <div style={{ display: "flex", padding: "0px 5px 0px 5px" }}>
            {" "}
            <img
              src="/linkedin.svg"
              alt="SVG as an image"
              style={{ height: "3vh" }}
            />{" "}
          </div>
          <div style={{ display: "flex", padding: "0px 5px 0px 5px" }}>
            <img
              src="/facebook.svg"
              alt="SVG as an image"
              style={{ height: "3vh" }}
            />{" "}
          </div>
          <div style={{ display: "flex", padding: "0px 5px 0px 5px" }}>
            {" "}
            <img
              src="/bookmark-white.svg"
              alt="SVG as an image"
              style={{ height: "3vh" }}
            />{" "}
          </div>
          <div style={{ display: "flex", padding: "0px 5px 0px 5px" }}>
            {" "}
            <img
              src="/menu.svg"
              alt="SVG as an image"
              style={{ height: "3vh" }}
            />
          </div>
        </div>
        <hr
          style={{
            display: "flex",
            width: "100%",
            color: "rgba(135, 131, 120, 0.15)",
          }}
        />
        <div
          id="authorSection"
          style={{ display: "flex", padding: "30px 0px 30px 0px" }}
        >
          {" "}
          <div id="authorProfilePic" style={{ display: "flex", width: "100%" }}>
            {
              <img
                src={props.articleMetaData.authorProfilePic}
                alt="new"
                style={{
                  height: "10vh",
                  width: "18vh",
                  paddingRight: "40px",
                }}
              />
            }
            <div
              id="authorDetails"
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#757575",
              }}
            >
              <div style={{ paddingBottom: "5px" }}> WRITTEN BY</div>
              <div
                style={{ display: "flex", color: "black", fontSize: "1.8em" }}
              >
                {props.articleMetaData.author}
              </div>
              <div style={{ display: "flex", color: "#757575" }}>
                Engineer @ Yelp
              </div>
            </div>
          </div>
        </div>
        <hr
          style={{
            width: "100%",
            display: "flex",
            color: "rgba(135, 131, 120, 0.15)",
          }}
        />
      </div>{" "}
      <div style={{ display: "flex", flexGrow: "1" }}></div>
    </div>
  );
};

export default PageBodyFooter;
