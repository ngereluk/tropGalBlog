import React, { useEffect, useState } from "react";
import { useDetectIsMobile } from "../hooks/useDetectIsMobile";
import { FacebookShareButton, LinkedinShareButton } from "react-share";

interface pageBodyHeaderProps {
  articleMetaData: any;
}
const PageBodyHeader = (props: pageBodyHeaderProps) => {
  const isMobile = useDetectIsMobile();
  const [profilePic, setProfilePic] = useState("/defaultProfilePic.png");
  const [moreBUttonViz, setMoreButtonViz] = useState("none");

  useEffect(() => {
    if (props.articleMetaData.authorProfilePic !== null) {
      setProfilePic(props.articleMetaData.authorProfilePic);
    }
  }, []);

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
          <div
            id="authorProfilePic"
            style={{ display: "flex", paddingRight: "2%" }}
          >
            {
              <img
                src={profilePic}
                alt="new"
                style={{
                  maxHeight: "6vh",
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
                  <a
                    className="twitter-share-button"
                    href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}/posts/${props.articleMetaData.id}&text=Checkout%20this%20cool%20article%20on%20the%20tropical%20galaxy%20blog!`}
                    target="_blank"
                  >
                    <img
                      src="/twitter.svg"
                      alt="SVG as an image"
                      style={{ height: "3vh" }}
                    />{" "}
                  </a>
                </div>
                <div style={{ display: "flex", padding: "0px 5px 0px 5px" }}>
                  {" "}
                  <LinkedinShareButton
                    url={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${props.articleMetaData.id}`}
                  >
                    <img
                      src="/linkedin.svg"
                      alt="SVG as an image"
                      style={{ height: "3vh" }}
                    />{" "}
                  </LinkedinShareButton>
                </div>
                <div style={{ display: "flex", padding: "0px 5px 0px 5px" }}>
                  <FacebookShareButton
                    url={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${props.articleMetaData.id}`}
                  >
                    <img
                      src="/facebook.svg"
                      alt="SVG as an image"
                      style={{ height: "3vh" }}
                    />{" "}
                  </FacebookShareButton>
                </div>

                <div
                  style={{ display: "flex", padding: "0px 5px 0px 5px" }}
                  onClick={() => {
                    moreBUttonViz === "none"
                      ? setMoreButtonViz("block")
                      : setMoreButtonViz("none");
                  }}
                >
                  {" "}
                  <img
                    src="/menu.svg"
                    alt="SVG as an image"
                    style={{ height: "3vh" }}
                  />
                </div>
              </div>{" "}
            </div>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "pink",
                position: "absolute",
                right: "20%",
                display: moreBUttonViz,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBodyHeader;
