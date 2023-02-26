import React, { useState, useEffect } from "react";
import Button from "../components/button";
import ArticleList from "../components/articleList";
import { getAllPostIds } from "../utils/blogPages";
import { InferGetStaticPropsType } from "next";
import MainPageRHMenu from "../components/mainPageRHMenu";
import Header from "../components/siteHeader";
import SiteFooter from "../components/siteFooter";
import { useDetectIsMobile } from "../hooks/useDetectIsMobile";
import Link from "next/link";

export default function Home({
  postMetaData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isMobile = useDetectIsMobile();
  const [randomArticleId, setRandomArticleId] = useState("");

  useEffect(() => {
    const randId = Math.floor(Math.random() * (postMetaData.length - 1));
    console.log("randId ", randId);
    console.log("postMetaData ", postMetaData);

    const randomArticleObj = postMetaData[randId];
    setRandomArticleId(randomArticleObj.params.id);
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 6px,rgba(255, 255, 255, 0.4) 2px,rgba(255, 255, 255, 0.4) 7px),linear-gradient(#321cb0, #6049a6, #c979bb) ",
          fontFamily: "Georgia",
          display: "flex",
          flexDirection: "row",
          justifyContent: isMobile ? "" : "center",
          paddingTop: "2%",
          paddingLeft: isMobile ? "10%" : "0%",
          paddingBottom: isMobile ? "8%" : "4%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "3%",
            justifyContent: isMobile ? "" : "center",
            width: isMobile ? "" : "40%",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                paddingTop: "3%",
                display: "flex",
                fontSize: isMobile ? "3.8rem" : "4erm",
                color: "white",
                paddingBottom: isMobile ? "0.5%" : "3%",
              }}
            >
              Rest your mind.
            </div>{" "}
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                padding: "3% 0% 3% 0%",
                display: "flex",
                justifyContent: "flex-start",
                fontSize: isMobile ? "1.2rem" : "1.5em",
                color: "white",
                width: isMobile ? "80%" : "50%",
              }}
            >
              You've been working hard, take a break and discover something new.
              Maybe a random article or two.
            </div>
          </div>
          <div
            style={{
              paddingTop: isMobile ? "8%" : "6%",
              display: "flex",
            }}
          >
            <Link href={`/posts/${randomArticleId}`}>
              <div
                style={{
                  border: "none",
                  backgroundColor: "#292827",
                  color: "white",
                  height: isMobile ? "40px" : "45px",
                  borderRadius: "25px",
                  width: isMobile ? "55%" : "290px",
                  borderColor: "#292827",
                  fontSize: isMobile ? "1.2em" : "1.7rem",
                  fontFamily: "Georgia",
                }}
              >
                {" "}
                I'm feeling lucky{" "}
              </div>
            </Link>
          </div>
        </div>
        {!isMobile && (
          <img
            src={"/subject.svg"}
            alt="tmp"
            style={{ height: isMobile ? "30vh" : "45vh" }}
          />
        )}{" "}
      </div>
      <main style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "3%",
            justifyContent: isMobile ? "center" : "'",
          }}
        >
          {" "}
          {!isMobile && (
            <div style={{ display: "flex", flexGrow: "1" }}></div>
          )}{" "}
          <div style={{ width: isMobile ? "90%" : "40%" }}>
            {" "}
            <ArticleList postMetaData={postMetaData} />
          </div>{" "}
          {!isMobile && (
            <div style={{ width: "40%" }}>
              {" "}
              <MainPageRHMenu />
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
export async function getStaticProps() {
  const postMetaData = await getAllPostIds();
  return {
    props: {
      postMetaData,
    },
  };
}
