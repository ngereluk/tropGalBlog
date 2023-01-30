import React from "react";
import ArticlePreviewCard from "./articlePreviewCard";
import { Post } from "../utils/notionAPI";

interface articleListProps {
  postMetaData: any;
}
const ArticleList = (props: articleListProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {props.postMetaData.map((post: any) => {
            return <ArticlePreviewCard postMetaData={post.params as Post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
