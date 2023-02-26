import React, { useEffect, useState } from "react";
import { Post } from "../utils/notionAPI";
import Link from "next/link";
import { useDetectIsMobile } from "../hooks/useDetectIsMobile";

interface articlePreviewCardProps {
  postMetaData: Post;
}
const ArticlePreviewCard = (props: articlePreviewCardProps) => {
  const [profilePic, setProfilePic] = useState("/defaultProfilePic.png");
  const isMobile = useDetectIsMobile();
  useEffect(() => {
    if (props.postMetaData.authorProfilePic !== null) {
      setProfilePic(props.postMetaData.authorProfilePic);
    }
  }, []);

  return (
    <div
      id="articleCardMainDiv"
      style={{
        display: "flex",
        flexDirection: "row",
        padding: isMobile ? "25px 0px 10px 0px" : "25px 10px 10px 0px",
        fontFamily: "inter, sans-serif",
        height: "100%",
      }}
    >
      <div
        id="articleCardLHS"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "5px",
          fontSize: "13px",
          width: "100%",
        }}
      >
        <div
          id="authorInfoSection"
          style={{
            display: "flex",
            flexDirection: "row",
            color: "#292929",
            alignItems: "center",
          }}
        >
          <img
            src={profilePic}
            alt="new"
            style={{
              maxHeight: "5vh",
              paddingRight: "2%",
            }}
          />

          <div style={{ display: "flex" }}>{props.postMetaData.author}</div>
          <div style={{ color: "#757575" }}>&nbsp;in&nbsp;</div>
          <div style={{ display: "flex" }}>
            {props.postMetaData.tagArray[0]}
          </div>
        </div>
        <div
          id="articleTitle"
          style={{
            color: "#292929",
            display: "flex",
            padding: "12px 10px 0px 0px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {" "}
          <Link href={`/posts/${props.postMetaData.id}`}>
            {props.postMetaData.title}
          </Link>
        </div>
        {!isMobile && (
          <div style={{ display: "flex", flexGrow: "1", height: "7vh" }}></div>
        )}{" "}
        <div
          id="articleDateReadTime"
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: isMobile ? "0px" : "15px",
            color: "#757575",
            fontSize: "13px",
          }}
        >
          <div id="title" style={{ paddingRight: "5px", display: "flex" }}>
            {props.postMetaData.lastUpdated}&nbsp;&#x2022;
          </div>
          <div id="title" style={{ display: "flex" }}>
            {props.postMetaData.readTime}&nbsp;min read
          </div>
          <div style={{}}>
            <img
              src="/purpleRocket.png"
              alt="new"
              style={{
                maxHeight: "4vh",
                maxWidth: "3.5vh",
                paddingLeft: "10px",
              }}
            />
          </div>{" "}
        </div>
      </div>
      <div style={{ display: "flex", flexGrow: "1" }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          width: isMobile ? "40%" : "100%",
        }}
      >
        <div style={{ paddingRight: "8px" }}>
          {" "}
          <img
            src="/bookmark-white.svg"
            alt="new"
            style={{
              maxHeight: "3vh",
              maxWidth: "2vh",
            }}
          />
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          {props.postMetaData.coverImage != null && (
            <img
              src={props.postMetaData.coverImage}
              alt="new"
              style={{
                height: isMobile ? "70%" : "18vh",
                width: isMobile ? "100%" : "28vh",
                paddingRight: isMobile ? "0px" : "40px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlePreviewCard;
