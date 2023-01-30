import React, { useEffect, useState } from "react";
import { useDetectIsMobile } from "../hooks/useDetectIsMobile";

interface pageBodyHeaderProps {
  articleMetaData: any;
}
const PageBodyHeader = (props: pageBodyHeaderProps) => {
  const isMobile = useDetectIsMobile();
  const [profilePic, setProfilePic] = useState("/defaultProfilePic.png");

  useEffect(() => {
    if (props.articleMetaData.authorProfilePic !== null) {
      setProfilePic(props.articleMetaData.authorProfilePic);
    }
  }, []);

  const twitter = (
    <img src="/twitter.svg" alt="SVG as an image" style={{ height: "3vh" }} />
  );
  return (
    <div>
      <div
        style={{
          maxWidth: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "60px",
          paddingTop: "20px",
          color: "inherit",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            display: "flex",
            flexDirection: "column",
            paddingTop: isMobile ? "2%" : "70px",
            paddingBottom: "10px",
          }}
        >
          {props.articleMetaData.title}{" "}
        </div>
        <div
          id="authorSection"
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "10px",
            width: "100%",
          }}
        >
          <div id="authorProfilePic" style={{ display: "flex" }}>
            {
              <img
                src={profilePic}
                alt="new"
                style={{
                  maxHeight: "6vh",
                  maxWidth: "6.8vh",
                  paddingRight: "10px",
                }}
              />
            }
          </div>
          <div
            id="authorNameDateReadtime"
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div
              id="authorName"
              style={{ display: "flex", paddingBottom: "5px" }}
            >
              {props.articleMetaData.author}
            </div>
            <div
              id="dateUpdatedReadTime"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {" "}
              <div id="dateUpdated" style={{ display: "flex" }}>
                {props.articleMetaData.lastUpdated}&nbsp;•
              </div>
              <div id="readTime" style={{ display: "flex" }}>
                &nbsp;{props.articleMetaData.readTime} min read
              </div>{" "}
              <div
                id="spacerDiv"
                style={{ display: "flex", flexGrow: "1" }}
              ></div>{" "}
              <div
                id="socialMediaLinks"
                style={{
                  display: isMobile ? "none" : "flex",
                  flexDirection: "row",
                }}
              >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBodyHeader;
