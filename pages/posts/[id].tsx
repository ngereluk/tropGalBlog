import React, { useState, useEffect } from "react";
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
import Code from "../../components/code";
import { useDetectIsMobile } from "../../hooks/useDetectIsMobile";
import Head from "next/head";

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
  SpecialCodeBlock,
} from "../../utils/blockTypes";

export interface authorJsonData {
  name: string;
  position: string;
  employer: string;
  website: string;
}

export default function Post({
  postData,
  articlePostMetaData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let numberedListItemNum = 0;
  const isMobile = useDetectIsMobile();
  const [allAuthorData, setAllAuthorData] = useState<authorJsonData[]>();

  async function getAuthorStaticData() {
    const data = await fetch("/api/staticdata").then((res) => res.json());
    const parsedData = JSON.parse(data);
    setAllAuthorData(parsedData.authors);
  }

  useEffect(() => {
    getAuthorStaticData();
  }, []);

  return (
    <div>
      <Head>
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${articlePostMetaData?.id}`}
        />
        {/* <meta property="og:type" content="website" /> */}
        <meta property="og:title" content={articlePostMetaData?.title} />
        <meta
          property="og:description"
          content="Checkout this cool article from the Tropical Galaxy Blog!"
        />
        <meta property="og:image" content={articlePostMetaData?.coverImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={articlePostMetaData?.title} />
        <meta
          name="twitter:description"
          content="Checkout this article on the Tropical Galaxy Blog"
        />
        <meta name="twitter:image" content={articlePostMetaData?.coverImage} />
      </Head>
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
            {postData.page.children.map((block: Block) => {
              if (block.type !== null) {
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
                if (block.type === "code") {
                  return (
                    <div style={{ display: "flex", width: "100%" }}>
                      <Code codeData={block as SpecialCodeBlock} />
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>{" "}
        <div style={{ display: "flex", flexGrow: "1" }}></div>
      </div>{" "}
      <div style={{ paddingBottom: "100px" }}>
        {" "}
        <PageBodyFooter
          articleMetaData={articlePostMetaData}
          allAuthorData={allAuthorData}
        />
      </div>
      <SiteFooter />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const rawPostData = await getPostData(params.id);
  const postData = JSON.parse(JSON.stringify(rawPostData));

  const allPostMetaData = await getAllPostIds();
  const articlePostMetaData = allPostMetaData
    .map((metaData) => metaData.params)
    .find(({ id }) => id == params.id);
  return {
    props: {
      postData,
      articlePostMetaData,
    },
  };
}
