import React, { useEffect, useState } from "react";
import { EmbedBlock } from "../utils/notionAPI";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface tweetProps {
  tweetData: EmbedBlock;
}
const Tweet = (props: tweetProps) => {
  const tweetId = props.tweetData.url.substr(
    props.tweetData.url.lastIndexOf("/") + 1,
    props.tweetData.url.length
  );
  const [styleClasses, setStyleClasses] = useState("caption");
  useEffect(() => {
    if (props.tweetData.code === true) {
      setStyleClasses("caption code");
    }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <TwitterTweetEmbed tweetId={tweetId} />
      <div
        className={styleClasses}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontWeight: props.tweetData.bold === true ? "bold" : "inherit",
          fontStyle: props.tweetData.italic === true ? "italic" : "inherit",
          textDecoration:
            props.tweetData.underline === true &&
            props.tweetData.strikethrough === true
              ? "underline line-through"
              : props.tweetData.underline === true &&
                props.tweetData.strikethrough !== true
              ? "underline"
              : props.tweetData.underline !== true &&
                props.tweetData.strikethrough === true
              ? "line-through"
              : "inherit",
          color: props.tweetData.color,
        }}
      >
        {props.tweetData.caption}
      </div>
    </div>
  );
};

export default Tweet;
