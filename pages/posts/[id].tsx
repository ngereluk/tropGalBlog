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
import SiteFooter from "../../components/siteFooter";
import { useDetectIsMobile } from "../../hooks/useDetectIsMobile";

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
} from "../../utils/notionAPI";

export default function Post({
  postData,
  articlePostMetaData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let numberedListItemNum = 0;
  const isMobile = useDetectIsMobile();

  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexGrow: "1" }}></div>
        <div
          id="pageBody"
          style={{
            width: isMobile === false ? "50%" : "85%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <PageBodyHeader articleMetaData={articlePostMetaData} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {postData.page.children.map((block) => {
              if (block.type === "paragraph") {
                return (
                  <div style={{ display: "flex" }}>
                    <Paragraph paragraphData={block as ParagraphBlock} />
                  </div>
                );
              }
              if (block.type === "heading_1") {
                return (
                  <div style={{ display: "flex" }}>
                    <HeadingOne headingData={block as HeadingOneBlock} />
                  </div>
                );
              }
              if (block.type === "heading_2") {
                return (
                  <div style={{ display: "flex" }}>
                    <HeadingTwo headingData={block as HeadingTwoBlock} />
                  </div>
                );
              }
              if (block.type === "heading_3") {
                return (
                  <div style={{ display: "flex" }}>
                    <HeadingThree headingData={block as HeadingThreeBlock} />
                  </div>
                );
              }
              if (block.type === "bulleted_list_item") {
                return (
                  <div style={{ display: "flex" }}>
                    <BulletedListItem
                      listDataItem={block as BulletedListItemBlock}
                    />
                  </div>
                );
              }
              if (block.type === "numbered_list_item") {
                numberedListItemNum = numberedListItemNum + 1;

                return (
                  <div style={{ display: "flex" }}>
                    <NumberedListItem
                      listDataItem={block as NumberedListItemBlock}
                      numberedListItemNum={numberedListItemNum}
                    />
                  </div>
                );
              }
              if (block.type === "table") {
                return (
                  <div style={{ display: "flex" }}>
                    <Table tableData={block as TableBlock} />
                  </div>
                );
              }
              if (block.type === "image") {
                return (
                  <div style={{ display: "flex" }}>
                    <Image imageData={block as ImageBlock} />
                  </div>
                );
              }
              if (block.type === "video") {
                return (
                  <div style={{ display: "flex" }}>
                    <Video videoData={block as VideoBlock} />
                  </div>
                );
              }
              if (block.type === "bookmark") {
                return (
                  <div style={{ display: "flex" }}>
                    <Bookmark bookmarkData={block as BookmarkBlock} />
                  </div>
                );
              }
              if (block.type === "file") {
                return (
                  <div style={{ display: "flex" }}>
                    <File fileData={block as FileBlock} />
                  </div>
                );
              }
              if (block.type === "quote") {
                return (
                  <div style={{ display: "flex" }}>
                    <Quote quoteData={block as QuoteBlock} />
                  </div>
                );
              }
              if (block.type === "divider") {
                return (
                  <div style={{ display: "flex" }}>
                    <Divider dividerData={block as DividerBlock} />
                  </div>
                );
              }
              if (block.type === "callout") {
                return (
                  <div style={{ display: "flex" }}>
                    <Callout calloutData={block as CalloutBlock} />
                  </div>
                );
              }
              if (block.type === "column_list") {
                return (
                  <div style={{ display: "flex" }}>
                    <ColumnSet columnData={block as ColumnBlock} />
                  </div>
                );
              }
              if (block.type === "embed") {
                return (
                  <div style={{ display: "flex", width: "100%" }}>
                    <Embed embedData={block as EmbedBlock} />
                  </div>
                );
              }
            })}
          </div>
        </div>{" "}
        <div style={{ display: "flex", flexGrow: "1" }}></div>
      </div>{" "}
      <div style={{ paddingBottom: "100px" }}>
        {" "}
        <PageBodyFooter articleMetaData={articlePostMetaData} />
      </div>
      <SiteFooter />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  // console.log("paths ", paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const postData = await getPostData(params.id);
  const allPostMetaData = await getAllPostIds();
  const articlePostMetaData = allPostMetaData
    .map((metaData) => metaData.params)
    .find(({ id }) => id == params.id);
  //console.log("postData ", postData);
  return {
    props: {
      postData,
      articlePostMetaData,
    },
  };
}
