import { getAllPostIds, getPostData } from "../../utils/blogPages";
import { InferGetStaticPropsType } from "next";
import Paragraph from "../../components/paragraph";
import HeadingOne from "../../components/headingOne";
import HeadingTwo from "../../components/headingTwo";
import HeadingThree from "../../components/headingThree";
import BulletedListItem from "../../components/bulletedListItem";
import NumberedListItem from "../../components/numberedListItem";
import Table from "../../components/table";
import Header from "../../components/siteHeader";
import PageBodyHeader from "../../components/pageBodyHeader";
import PageBodyFooter from "../../components/pageBodyFooter";
import Image from "../../components/image";
import Video from "../../components/video";
import Bookmark from "../../components/bookmark";
import File from "../../components/file";
import Quote from "../../components/quote";
import Divider from "../../components/divider";
import Callout from "../../components/callout";
import ColumnSet from "../../components/columnSet";
import Embed from "../../components/embed";

import {
  ParagraphBlock,
  BulletedListItemBlock,
  HeadingOneBlock,
  HeadingTwoBlock,
  HeadingThreeBlock,
  NumberedListItemBlock,
  TableBlock,
  ImageBlock,
  VideoBlock,
  BookmarkBlock,
  FileBlock,
  QuoteBlock,
  DividerBlock,
  CalloutBlock,
  ColumnBlock,
  EmbedBlock,
  Block,
} from "../../utils/notionAPI";

interface blockTypeProps {
  blockData: Block;
}
let itemNo = 0;

const BlockType = (props: blockTypeProps, itemNo: number) => {
  itemNo = itemNo + 1;

  return (
    <div>
      {props.blockData.type === "paragraph" ? (
        <div style={{ display: "flex" }}>
          <Paragraph paragraphData={props.blockData as ParagraphBlock} />
        </div>
      ) : props.blockData.type === "heading_1" ? (
        <div style={{ display: "flex" }}>
          <HeadingOne headingData={props.blockData as HeadingOneBlock} />
        </div>
      ) : props.blockData.type === "heading_2" ? (
        <div style={{ display: "flex" }}>
          <HeadingTwo headingData={props.blockData as HeadingTwoBlock} />
        </div>
      ) : props.blockData.type === "heading_3" ? (
        <div style={{ display: "flex" }}>
          <HeadingThree headingData={props.blockData as HeadingThreeBlock} />
        </div>
      ) : props.blockData.type === "bulleted_list_item" ? (
        <div style={{ display: "flex" }}>
          <BulletedListItem
            listDataItem={props.blockData as BulletedListItemBlock}
          />{" "}
        </div>
      ) : props.blockData.type === "numbered_list_item" ? (
        <div style={{ display: "flex" }}>
          <NumberedListItem
            listDataItem={props.blockData as NumberedListItemBlock}
            numberedListItemNum={itemNo}
          />
        </div>
      ) : props.blockData.type === "table" ? (
        <div style={{ display: "flex" }}>
          <Table tableData={props.blockData as TableBlock} />
        </div>
      ) : props.blockData.type === "image" ? (
        <div style={{ display: "flex" }}>
          <Image imageData={props.blockData as ImageBlock} />
        </div>
      ) : props.blockData.type === "video" ? (
        <div style={{ display: "flex" }}>
          <Video videoData={props.blockData as VideoBlock} />
        </div>
      ) : props.blockData.type === "bookmark" ? (
        <div style={{ display: "flex" }}>
          <Bookmark bookmarkData={props.blockData as BookmarkBlock} />
        </div>
      ) : props.blockData.type === "file" ? (
        <div style={{ display: "flex" }}>
          <File fileData={props.blockData as FileBlock} />
        </div>
      ) : props.blockData.type === "quote" ? (
        <div style={{ display: "flex" }}>
          <Quote quoteData={props.blockData as QuoteBlock} />
        </div>
      ) : props.blockData.type === "divider" ? (
        <div style={{ display: "flex" }}>
          <Divider dividerData={props.blockData as DividerBlock} />
        </div>
      ) : props.blockData.type === "callout" ? (
        <div style={{ display: "flex" }}>
          <Callout calloutData={props.blockData as CalloutBlock} />
        </div>
      ) : props.blockData.type === "column_list" ? (
        <div style={{ display: "flex" }}>
          <ColumnSet columnData={props.blockData as ColumnBlock} />
        </div>
      ) : props.blockData.type === "embed" ? (
        <div style={{ display: "flex" }}>
          <Embed embedData={props.blockData as EmbedBlock} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BlockType;
