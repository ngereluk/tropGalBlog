import React, { useEffect, useState } from "react";
import { VideoBlock } from "../utils/blockTypes";
import { useDetectIsMobile } from "../hooks/useDetectIsMobile";

interface imageProps {
  videoData: VideoBlock;
}
const Video = (props: imageProps) => {
  const isMobile = useDetectIsMobile();
  const [videoURL, setVideoURL] = useState("");
  const [styleClasses, setStyleClasses] = useState("caption");
  useEffect(() => {
    if (props.videoData.code === true) {
      setStyleClasses("caption code");
    }
  }, []);

  const lastIndex = props.videoData.url.lastIndexOf("/") + 1;
  const videoId = props.videoData.url.substr(lastIndex);
  useEffect(() => {
    setVideoURL("https://www.youtube.com/embed/" + videoId);
  }, []);

  return (
    <div>
      <div
        style={{
          maxWidth: "100%",
          width: "100%",
          padding: "3px 2px",

          lineHeight: "1.3",
          marginTop: "1em",
          marginBottom: "1px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <iframe
          width={isMobile ? "100%" : "560"}
          height="315"
          src={videoURL}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div
          style={{
            paddingTop: "8px",
            fontWeight: props.videoData.bold === true ? "bold" : "inherit",
            fontStyle: props.videoData.italic === true ? "italic" : "inherit",
            textDecoration:
              props.videoData.underline === true &&
              props.videoData.strikethrough === true
                ? "underline line-through"
                : props.videoData.underline === true &&
                  props.videoData.strikethrough !== true
                ? "underline"
                : props.videoData.underline !== true &&
                  props.videoData.strikethrough === true
                ? "line-through"
                : "inherit",
            color: props.videoData.color,
          }}
        >
          {" "}
          {props.videoData.caption}
        </div>
      </div>
    </div>
  );
};

export default Video;
