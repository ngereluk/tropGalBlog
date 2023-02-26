import { SpecialCodeBlock } from "../utils/blockTypes";
import { CodeBlock } from "react-code-blocks";

interface codeProps {
  codeData: SpecialCodeBlock;
}

export const Code = (props: codeProps) => {
  return (
    <CodeBlock
      text={props.codeData.content}
      language={props.codeData.language}
      showLineNumbers={true}
      textColor="black"
      wrapLines
    />
  );
};

export default Code;
