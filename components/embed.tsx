import React from "react";
import { EmbedBlock } from "../utils/notionAPI";
import Tweet from "../components/tweet";
import Codepen from "../components/codepen";

interface embedProps {
  embedData: EmbedBlock;
}
const Embed = (props: embedProps) => {
  return (
    <div style={{ width: "100%" }}>
      {props.embedData.embedType === "twitter" && (
        <Tweet tweetData={props.embedData} />
      )}
      {props.embedData.embedType === "codepen" && (
        <Codepen codepenData={props.embedData} />
      )}
    </div>
  );
};

export default Embed;
