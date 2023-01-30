// import { config } from "dotenv";
import { Client } from "@notionhq/client";
import {
  QueryDatabaseResponse,
  PageObjectResponse,
  ListBlockChildrenResponse,
  PartialBlockObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface person {
  email: string;
}

export interface people {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  person: person;
}

export interface Post {
  id: string;
  title: string;
  tagArray: string[];
  author: string;
  lastUpdated: string;
  readTime: number;
  coverImage: string;
  people: people;
  authorProfilePic: string;
}

export interface Page {
  object: string;
  children: Block[];
}

export interface Block {
  object: string;
  id: string;
  has_children: boolean;
  archived: boolean;
  type: string;
  children: Block[];
}

export interface RawChildBlock {
  object: string;
  id: string;
  //parentId: string;
  has_children: boolean;
  archived: boolean;
  type: string;
  children: Block[];
  blockTyping: any;
}

export interface ParagraphBlock extends Block {
  type: "paragraph";
  plain_text: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
}

export interface HeadingOneBlock extends Block {
  type: "heading_1";
  content: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
}

export interface HeadingTwoBlock extends Block {
  type: "heading_2";
  content: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
}

export interface HeadingThreeBlock extends Block {
  type: "heading_3";
  content: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
}

export interface BulletedListItemBlock extends Block {
  type: "bulleted_list_item";
  content: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
}

export interface NumberedListItemBlock extends Block {
  type: "numbered_list_item";
  content: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
}

export interface EmbedBlock extends Block {
  type: "embed";
  caption: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  url: string;
  embedType: string;
}

export interface ImageBlock extends Block {
  type: "image";
  caption: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  url: string;
}

export interface VideoBlock extends Block {
  type: "video";
  caption: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  url: string;
}

export interface FileBlock extends Block {
  type: "file";
  url: string;
  caption: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
}

export interface CalloutBlock extends Block {
  type: "callout";
  content: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  icon: any;
  iconType: string;
}

export interface QuoteBlock extends Block {
  type: "quote";
  content: string;
  color: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
}

export interface DividerBlock extends Block {
  type: "divider";
}

export interface ColumnBlock extends Block {
  type: "column";
}

export interface ColumnListBlock extends Block {
  type: "column_list";
}

export interface PDFBlock extends Block {
  type: "pdf";
  url: string;
}

export interface LinkPreviewBlock extends Block {
  type: "link_preview";
  url: string;
}

export interface TableBlock extends Block {
  type: "table";
  table_width: number;
  has_column_header: boolean;
  has_row_header: boolean;
}

export interface TableRowBlock extends Block {
  type: "table_row";
  rowNum: number;
  cells: Cell[];
}

export interface BookmarkBlock extends Block {
  type: "bookmark";
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
  caption: string;
  url: string;
}

export interface Cell {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
  content: string;
  cellNum: number;
}

export const queryDatabase = async (notion: Client) =>
  await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
  });

const fs = require("fs");
fs.readFile(
  "../utils/authorDetails.json",
  "utf8",
  (err: any, jsonString: string) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    console.log("File data:", jsonString);
  }
);

export const parseProperties = (database: QueryDatabaseResponse): Post[] =>
  database.results
    .map((row: any) => {
      const id = row.id;
      if (row.object === "page") {
        const page = row as PageObjectResponse;

        // get article title
        const titleCell = page.properties[
          "Name"
        ] as PageObjectResponse["properties"]["Name"];
        if (titleCell.type !== "title")
          throw new Error("title cell is not a title");
        const title = titleCell.title[0].plain_text;

        // get first tag as tag for article
        const tagCell = page.properties[
          "Tags"
        ] as PageObjectResponse["properties"]["Tags"];
        if (tagCell.type !== "multi_select")
          throw new Error("tag cell is not a multiselect");
        let tagArray: string[] = []; //tagCell.multi_select[0].name;
        tagCell.multi_select.forEach((tag) => tagArray.push(tag.name));
        // console.log("tagCell ", tagCell);
        //get article author and author profile pic
        const peopleCell = page.properties[
          "Person"
        ] as PageObjectResponse["properties"]["Person"];
        if (peopleCell.type !== "people")
          throw new Error("person cell is not a Person type");
        const people = peopleCell.people[0];
        const authorProfilePic = JSON.parse(
          JSON.stringify(peopleCell.people[0])
        )["avatar_url"];

        //get date last updated
        const dateUpdatedCell = JSON.stringify(
          page.properties[
            "Created time"
          ] as PageObjectResponse["properties"]["Created time"]
        );
        const lastUpdated = JSON.parse(dateUpdatedCell)["created_time"];

        //get readtime
        const readTimeCell = JSON.stringify(
          page.properties[
            "Read Time"
          ] as PageObjectResponse["properties"]["Read Time"]
        );
        const readTime = JSON.parse(readTimeCell)["number"];

        //get cover image
        let coverImage = null;
        const coverImageObj = row.cover;
        if (coverImageObj !== null) {
          const coverImageType = row.cover.type;
          if (coverImageType == "external") {
            coverImage = row.cover.external.url;
          }
          if (coverImageType == "file") {
            coverImage = row.cover.file.url;
          }
        }

        return {
          id,
          title,
          tagArray,
          people,
          lastUpdated,
          readTime,
          coverImage,
          authorProfilePic,
        };
      }
    })
    //  .filter((post: any) => post !== undefined) as Post[];
    .filter((post: any) => post !== undefined) as any[];
let rowNum = 0;
function setBlockTypesAndAddToPage(
  blockParent: BlockObjectResponse,
  children: Block[],
  Page: Page
) {
  //console.log("blockParent.type ", blockParent.type);
  if (blockParent.type == "paragraph") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      plain_text:
        blockParent.paragraph.rich_text.length === 0
          ? null
          : blockParent.paragraph.rich_text[0].plain_text,
      color:
        blockParent.paragraph.rich_text.length === 0
          ? null
          : blockParent.paragraph.rich_text[0].annotations.color,
      bold:
        blockParent.paragraph.rich_text.length === 0
          ? null
          : blockParent.paragraph.rich_text[0].annotations.bold,
      italic:
        blockParent.paragraph.rich_text.length === 0
          ? null
          : blockParent.paragraph.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.paragraph.rich_text.length === 0
          ? null
          : blockParent.paragraph.rich_text[0].annotations.strikethrough,
      underline:
        blockParent.paragraph.rich_text.length === 0
          ? null
          : blockParent.paragraph.rich_text[0].annotations.underline,
      code:
        blockParent.paragraph.rich_text.length === 0
          ? null
          : blockParent.paragraph.rich_text[0].annotations.code,
    } as ParagraphBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "heading_1") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      content:
        blockParent.heading_1.rich_text.length === 0
          ? null
          : blockParent.heading_1.rich_text[0].plain_text,
      color:
        blockParent.heading_1.rich_text.length === 0
          ? null
          : blockParent.heading_1.rich_text[0].annotations.color,
      bold:
        blockParent.heading_1.rich_text.length === 0
          ? null
          : blockParent.heading_1.rich_text[0].annotations.bold,
      italic:
        blockParent.heading_1.rich_text.length === 0
          ? null
          : blockParent.heading_1.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.heading_1.rich_text.length === 0
          ? null
          : blockParent.heading_1.rich_text[0].annotations.strikethrough,
      underline:
        blockParent.heading_1.rich_text.length === 0
          ? null
          : blockParent.heading_1.rich_text[0].annotations.underline,
      code:
        blockParent.heading_1.rich_text.length === 0
          ? null
          : blockParent.heading_1.rich_text[0].annotations.code,
    } as HeadingOneBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "heading_2") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      content:
        blockParent.heading_2.rich_text.length === 0
          ? null
          : blockParent.heading_2.rich_text[0].plain_text,
      color:
        blockParent.heading_2.rich_text.length === 0
          ? null
          : blockParent.heading_2.rich_text[0].annotations.color,
      bold:
        blockParent.heading_2.rich_text.length === 0
          ? null
          : blockParent.heading_2.rich_text[0].annotations.bold,
      italic:
        blockParent.heading_2.rich_text.length === 0
          ? null
          : blockParent.heading_2.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.heading_2.rich_text.length === 0
          ? null
          : blockParent.heading_2.rich_text[0].annotations.strikethrough,
      underline:
        blockParent.heading_2.rich_text.length === 0
          ? null
          : blockParent.heading_2.rich_text[0].annotations.underline,
      code:
        blockParent.heading_2.rich_text.length === 0
          ? null
          : blockParent.heading_2.rich_text[0].annotations.code,
    } as HeadingTwoBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "heading_3") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      content:
        blockParent.heading_3.rich_text.length === 0
          ? null
          : blockParent.heading_3.rich_text[0].plain_text,
      color:
        blockParent.heading_3.rich_text.length === 0
          ? null
          : blockParent.heading_3.rich_text[0].annotations.color,
      bold:
        blockParent.heading_3.rich_text.length === 0
          ? null
          : blockParent.heading_3.rich_text[0].annotations.bold,
      italic:
        blockParent.heading_3.rich_text.length === 0
          ? null
          : blockParent.heading_3.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.heading_3.rich_text[0].annotations.strikethrough,
      underline:
        blockParent.heading_3.rich_text.length === 0
          ? null
          : blockParent.heading_3.rich_text[0].annotations.underline,
      code:
        blockParent.heading_3.rich_text.length === 0
          ? null
          : blockParent.heading_3.rich_text[0].annotations.code,
    } as HeadingThreeBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "bulleted_list_item") {
    //console.log("blockParent ", blockParent);
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      content:
        blockParent.bulleted_list_item.rich_text.length === 0
          ? null
          : blockParent.bulleted_list_item.rich_text[0].plain_text,
      color:
        blockParent.bulleted_list_item.rich_text.length === 0
          ? null
          : blockParent.bulleted_list_item.color,
      bold:
        blockParent.bulleted_list_item.rich_text.length === 0
          ? null
          : blockParent.bulleted_list_item.rich_text[0].annotations.bold,
      italic:
        blockParent.bulleted_list_item.rich_text.length === 0
          ? null
          : blockParent.bulleted_list_item.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.bulleted_list_item.rich_text.length === 0
          ? null
          : blockParent.bulleted_list_item.rich_text[0].annotations
              .strikethrough,
      underline:
        blockParent.bulleted_list_item.rich_text.length === 0
          ? null
          : blockParent.bulleted_list_item.rich_text[0].annotations.underline,
      code:
        blockParent.bulleted_list_item.rich_text.length === 0
          ? null
          : blockParent.bulleted_list_item.rich_text[0].annotations.code,
    } as BulletedListItemBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "numbered_list_item") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      content:
        blockParent.numbered_list_item.rich_text.length === 0
          ? null
          : blockParent.numbered_list_item.rich_text[0].plain_text,
      color:
        blockParent.numbered_list_item.rich_text.length === 0
          ? null
          : blockParent.numbered_list_item.rich_text[0].annotations.color,
      bold:
        blockParent.numbered_list_item.rich_text.length === 0
          ? null
          : blockParent.numbered_list_item.rich_text[0].annotations.bold,
      italic:
        blockParent.numbered_list_item.rich_text.length === 0
          ? null
          : blockParent.numbered_list_item.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.numbered_list_item.rich_text.length === 0
          ? null
          : blockParent.numbered_list_item.rich_text[0].annotations
              .strikethrough,
      underline:
        blockParent.numbered_list_item.rich_text.length === 0
          ? null
          : blockParent.numbered_list_item.rich_text[0].annotations.underline,
      code:
        blockParent.numbered_list_item.rich_text.length === 0
          ? null
          : blockParent.numbered_list_item.rich_text[0].annotations.code,
    } as NumberedListItemBlock;
    //console.log("number list item block ", block);
    Page.children.push(block);
  }
  if (blockParent.type == "embed") {
    const embedATypePart = blockParent.embed.url.substring(
      blockParent.embed.url.indexOf("/") + 2
    );
    const embedType = embedATypePart.substring(0, embedATypePart.indexOf("."));
    // console.log("embedType ", embedType);
    if (embedType === "twitter" || embedType === "codepen") {
      const block = {
        object: "block",
        id: blockParent.id,
        has_children: blockParent.has_children,
        archived: blockParent.archived,
        type: blockParent.type,
        children: children,
        url: blockParent.embed.url,
        embedType: embedType,
        caption:
          blockParent.embed.caption.length === 0
            ? null
            : blockParent.embed.caption[0].plain_text,
        color:
          blockParent.embed.caption.length === 0
            ? null
            : blockParent.embed.caption[0].annotations.color,
        bold:
          blockParent.embed.caption.length === 0
            ? null
            : blockParent.embed.caption[0].annotations.bold,
        italic:
          blockParent.embed.caption.length === 0
            ? null
            : blockParent.embed.caption[0].annotations.italic,
        strikethrough:
          blockParent.embed.caption.length === 0
            ? null
            : blockParent.embed.caption[0].annotations.strikethrough,
        underline:
          blockParent.embed.caption.length === 0
            ? null
            : blockParent.embed.caption[0].annotations.underline,
        code:
          blockParent.embed.caption.length === 0
            ? null
            : blockParent.embed.caption[0].annotations.code,
      } as EmbedBlock;
      Page.children.push(block);
    }
  }
  if (blockParent.type == "pdf") {
    const pdfFileBlockParent = blockParent.pdf as {
      type: "file";
      file: { url: string };
    };
    //console.log("pdf ", blockParent);
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      url: pdfFileBlockParent.file.url,
    } as PDFBlock;
    Page.children.push(block);
  }

  if (blockParent.type === "image") {
    if (blockParent.image.type === "file") {
      const imageBlockParent = blockParent.image as {
        type: "file";
        file: { url: string; expiry_time: string };
        caption: RichTextItemResponse[];
      };

      const block = {
        object: "block",
        id: blockParent.id,
        has_children: blockParent.has_children,
        archived: blockParent.archived,
        type: blockParent.type,
        children: children,
        caption:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].plain_text,
        color:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.color,
        bold:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.bold,
        italic:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.italic,
        strikethrough:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.strikethrough,
        underline:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.underline,
        code:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.code,
        url: imageBlockParent.file.url, //go back and check for type external versus file
      } as ImageBlock;
      Page.children.push(block);
    }
    if (blockParent.image.type === "external") {
      const imageBlockParent = blockParent.image as {
        type: "external";
        external: { url: string; expiry_time: string };
        caption: RichTextItemResponse[];
      };

      const block = {
        object: "block",
        id: blockParent.id,
        has_children: blockParent.has_children,
        archived: blockParent.archived,
        type: blockParent.type,
        children: children,
        caption:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].plain_text,
        color:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.color,
        bold:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.bold,
        italic:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.italic,
        strikethrough:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.strikethrough,
        underline:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.underline,
        code:
          blockParent.image.caption.length === 0
            ? null
            : blockParent.image.caption[0].annotations.code,
        url: imageBlockParent.external.url,
      } as ImageBlock;
      Page.children.push(block);
    }
  }

  if (blockParent.type === "video") {
    const videoBlockParent = blockParent.video as {
      type: "external";
      external: { url: string };
      caption: RichTextItemResponse[];
    }; //go back and check for type external versus file
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      caption:
        blockParent.video.caption.length === 0
          ? null
          : blockParent.video.caption[0].plain_text,
      color:
        blockParent.video.caption.length === 0
          ? null
          : blockParent.video.caption[0].annotations.color,
      bold:
        blockParent.video.caption.length === 0
          ? null
          : blockParent.video.caption[0].annotations.bold,
      italic:
        blockParent.video.caption.length === 0
          ? null
          : blockParent.video.caption[0].annotations.italic,
      strikethrough:
        blockParent.video.caption.length === 0
          ? null
          : blockParent.video.caption[0].annotations.strikethrough,
      underline:
        blockParent.video.caption.length === 0
          ? null
          : blockParent.video.caption[0].annotations.underline,
      code:
        blockParent.video.caption.length === 0
          ? null
          : blockParent.video.caption[0].annotations.code,
      url: videoBlockParent.external.url, //go back and check for type external versus file
    } as VideoBlock;
    Page.children.push(block);
  }
  if (blockParent.type === "bookmark") {
    //("embed blockParent ", blockParent);
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      url: blockParent.bookmark.url,
      caption:
        blockParent.bookmark.caption.length === 0
          ? null
          : blockParent.bookmark.caption[0].plain_text,
      bold:
        blockParent.bookmark.caption.length === 0
          ? null
          : blockParent.bookmark.caption[0].annotations.bold,
      italic:
        blockParent.bookmark.caption.length === 0
          ? null
          : blockParent.bookmark.caption[0].annotations.italic,
      strikethrough:
        blockParent.bookmark.caption.length === 0
          ? null
          : blockParent.bookmark.caption[0].annotations.strikethrough,
      underline:
        blockParent.bookmark.caption.length === 0
          ? null
          : blockParent.bookmark.caption[0].annotations.underline,
      code:
        blockParent.bookmark.caption.length === 0
          ? null
          : blockParent.bookmark.caption[0].annotations.code,
      color:
        blockParent.bookmark.caption.length === 0
          ? null
          : blockParent.bookmark.caption[0].annotations.color,
    } as BookmarkBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "callout") {
    // console.log(
    //   "callpout ",
    //   blockParent.callout.rich_text[0].annotations.color
    // );
    const emojiCallout = blockParent.callout.icon as {
      type: "emoji";
      emoji: any;
    };
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      content: blockParent.callout.rich_text[0].plain_text,
      color: blockParent.callout.rich_text[0].annotations.color,
      bold: blockParent.callout.rich_text[0].annotations.bold,
      italic: blockParent.callout.rich_text[0].annotations.italic,
      strikethrough: blockParent.callout.rich_text[0].annotations.strikethrough,
      underline: blockParent.callout.rich_text[0].annotations.underline,
      code: blockParent.callout.rich_text[0].annotations.code,
      iconType: blockParent.callout.icon?.type,
      icon: emojiCallout.emoji,
    } as CalloutBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "divider") {
    //console.log("divider ", blockParent);
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
    } as DividerBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "column") {
    //console.log("column ", blockParent);
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
    } as ColumnBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "column_list") {
    // console.log("column list ", blockParent);
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
    } as ColumnListBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "link_preview") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      url: blockParent.link_preview.url,
    } as LinkPreviewBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "table") {
    // console.log("table ", blockParent);
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      table_width: blockParent.table.table_width,
      has_column_header: blockParent.table.has_column_header,
      has_row_header: blockParent.table.has_row_header,
    } as TableBlock;
    Page.children.push(block);
  }
  if (blockParent.type == "file") {
    console.log("blockParent ", blockParent);
    if (blockParent.file.type === "file") {
      const uploadedFileBlockParent = blockParent.file as {
        type: "file";
        file: { url: string };
        caption: RichTextItemResponse[];
      };

      const block = {
        object: "block",
        id: blockParent.id,
        has_children: blockParent.has_children,
        archived: blockParent.archived,
        type: uploadedFileBlockParent.type,
        children: children,
        url: uploadedFileBlockParent.file.url,
        caption:
          uploadedFileBlockParent.caption[0] != undefined
            ? uploadedFileBlockParent.caption[0].plain_text
            : null,
        color:
          uploadedFileBlockParent.caption[0] != undefined
            ? uploadedFileBlockParent.caption[0].annotations.color
            : null,
        bold:
          uploadedFileBlockParent.caption[0] != undefined
            ? uploadedFileBlockParent.caption[0].annotations.bold
            : null,
        italic:
          uploadedFileBlockParent.caption[0] != undefined
            ? uploadedFileBlockParent.caption[0].annotations.italic
            : null,
        strikethrough:
          uploadedFileBlockParent.caption[0] != undefined
            ? uploadedFileBlockParent.caption[0].annotations.strikethrough
            : null,
        underline:
          uploadedFileBlockParent.caption[0] != undefined
            ? uploadedFileBlockParent.caption[0].annotations.underline
            : null,
        code:
          uploadedFileBlockParent.caption[0] != undefined
            ? uploadedFileBlockParent.caption[0].annotations.code
            : null,
      } as FileBlock;
      Page.children.push(block);
    }
    // if (blockParent.file.type === "external") {
    //   const externalLinkFileBlockParent = blockParent.file as {
    //     type: "external";
    //     external: { url: string };
    //     caption: RichTextItemResponse[];
    //   };

    //   const block = {
    //     object: "block",
    //     id: blockParent.id,
    //     has_children: blockParent.has_children,
    //     archived: blockParent.archived,
    //     type: externalLinkFileBlockParent.type,
    //     children: children,
    //     url: externalLinkFileBlockParent.file.url,
    //     caption:
    //       externalLinkFileBlockParent.caption[0] != undefined
    //         ? externalLinkFileBlockParent.caption[0].plain_text
    //         : null,
    //     color:
    //       externalLinkFileBlockParent.caption[0] != undefined
    //         ? externalLinkFileBlockParent.caption[0].annotations.color
    //         : null,
    //     bold:
    //       externalLinkFileBlockParent.caption[0] != undefined
    //         ? externalLinkFileBlockParent.caption[0].annotations.bold
    //         : null,
    //     italic:
    //       externalLinkFileBlockParent.caption[0] != undefined
    //         ? externalLinkFileBlockParent.caption[0].annotations.italic
    //         : null,
    //     strikethrough:
    //       externalLinkFileBlockParent.caption[0] != undefined
    //         ? externalLinkFileBlockParent.caption[0].annotations.strikethrough
    //         : null,
    //     underline:
    //       externalLinkFileBlockParent.caption[0] != undefined
    //         ? externalLinkFileBlockParent.caption[0].annotations.underline
    //         : null,
    //     code:
    //       externalLinkFileBlockParent.caption[0] != undefined
    //         ? externalLinkFileBlockParent.caption[0].annotations.code
    //         : null,
    //   } as FileBlock;
    //   Page.children.push(block);
    // }
  }
  if (blockParent.type == "quote") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      content: blockParent.quote.rich_text[0].plain_text,
      color: blockParent.quote.color,
      bold: blockParent.quote.rich_text[0].annotations.bold,
      italic: blockParent.quote.rich_text[0].annotations.italic,
      strikethrough: blockParent.quote.rich_text[0].annotations.strikethrough,
      underline: blockParent.quote.rich_text[0].annotations.underline,
      code: blockParent.quote.rich_text[0].annotations.code,
    } as QuoteBlock;
    Page.children.push(block);
  }
}
function setBlockTypes(blockParent: RawChildBlock) {
  if (blockParent.type == "paragraph") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      plain_text: blockParent.blockTyping.rich_text[0].plain_text,
      color: blockParent.blockTyping.rich_text[0].annotations.color,
      bold: blockParent.blockTyping.rich_text[0].annotations.bold,
      italic: blockParent.blockTyping.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.blockTyping.rich_text[0].annotations.strikethrough,
      underline: blockParent.blockTyping.rich_text[0].annotations.underline,
      code: blockParent.blockTyping.rich_text[0].annotations.code,
    } as ParagraphBlock;
    return block;
  }
  if (blockParent.type == "heading_1") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      content: blockParent.blockTyping.rich_text[0].plain_text,
      color: blockParent.blockTyping.rich_text[0].annotations.color,
      bold: blockParent.blockTyping.rich_text[0].annotations.bold,
      italic: blockParent.blockTyping.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.blockTyping.rich_text[0].annotations.strikethrough,
      underline: blockParent.blockTyping.rich_text[0].annotations.underline,
      code: blockParent.blockTyping.rich_text[0].annotations.code,
    } as HeadingOneBlock;
    return block;
  }
  if (blockParent.type == "heading_2") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      content: blockParent.blockTyping.rich_text[0].plain_text,
      color: blockParent.blockTyping.rich_text[0].annotations.color,
      bold: blockParent.blockTyping.rich_text[0].annotations.bold,
      italic: blockParent.blockTyping.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.blockTyping.rich_text[0].annotations.strikethrough,
      underline: blockParent.blockTyping.rich_text[0].annotations.underline,
      code: blockParent.blockTyping.rich_text[0].annotations.code,
    } as HeadingTwoBlock;
    return block;
  }
  if (blockParent.type == "heading_3") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      content: blockParent.blockTyping.rich_text[0].plain_text,
      color: blockParent.blockTyping.rich_text[0].annotations.color,
      bold: blockParent.blockTyping.rich_text[0].annotations.bold,
      italic: blockParent.blockTyping.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.blockTyping.rich_text[0].annotations.strikethrough,
      underline: blockParent.blockTyping.rich_text[0].annotations.underline,
      code: blockParent.blockTyping.rich_text[0].annotations.code,
    } as HeadingThreeBlock;
    return block;
  }
  if (blockParent.type == "bulleted_list_item") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      content: blockParent.blockTyping.rich_text[0].plain_text,
      color: blockParent.blockTyping.rich_text[0].annotations.color,
      bold: blockParent.blockTyping.rich_text[0].annotations.bold,
      italic: blockParent.blockTyping.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.blockTyping.rich_text[0].annotations.strikethrough,
      underline: blockParent.blockTyping.rich_text[0].annotations.underline,
      code: blockParent.blockTyping.rich_text[0].annotations.code,
    } as BulletedListItemBlock;
    return block;
  }
  if (blockParent.type == "numbered_list_item") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      content: blockParent.blockTyping.rich_text[0].plain_text,
      color: blockParent.blockTyping.rich_text[0].annotations.color,
      bold: blockParent.blockTyping.rich_text[0].annotations.bold,
      italic: blockParent.blockTyping.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.blockTyping.rich_text[0].annotations.strikethrough,
      underline: blockParent.blockTyping.rich_text[0].annotations.underline,
      code: blockParent.blockTyping.rich_text[0].annotations.code,
    } as NumberedListItemBlock;
    return block;
  }

  if (blockParent.type == "file") {
    const fileBlockParent = blockParent.blockTyping as {
      type: "file";
      file: { url: string };
      caption: RichTextItemResponse[];
    };

    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: fileBlockParent.type,
      children: blockParent.children,
      url: fileBlockParent.file.url,
      caption:
        fileBlockParent.caption[0] != undefined
          ? fileBlockParent.caption[0].plain_text
          : null,
      color:
        fileBlockParent.caption[0] != undefined
          ? fileBlockParent.caption[0].annotations.color
          : null,
      bold:
        fileBlockParent.caption[0] != undefined
          ? fileBlockParent.caption[0].annotations.bold
          : null,
      italic:
        fileBlockParent.caption[0] != undefined
          ? fileBlockParent.caption[0].annotations.italic
          : null,
      strikethrough:
        fileBlockParent.caption[0] != undefined
          ? fileBlockParent.caption[0].annotations.strikethrough
          : null,
      underline:
        fileBlockParent.caption[0] != undefined
          ? fileBlockParent.caption[0].annotations.underline
          : null,
      code:
        fileBlockParent.caption[0] != undefined
          ? fileBlockParent.caption[0].annotations.code
          : null,
    } as FileBlock;
    return block;
  }
  if (blockParent.type == "callout") {
    const emojiCallout = blockParent.blockTyping.icon as {
      type: "emoji";
      emoji: any;
    };
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      content: blockParent.blockTyping.rich_text[0].plain_text,
      color: blockParent.blockTyping.rich_text[0].annotations.color,
      bold: blockParent.blockTyping.rich_text[0].annotations.bold,
      italic: blockParent.blockTyping.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.blockTyping.rich_text[0].annotations.strikethrough,
      underline: blockParent.blockTyping.rich_text[0].annotations.underline,
      code: blockParent.blockTyping.rich_text[0].annotations.code,
      iconType: blockParent.blockTyping.icon?.type,
      icon: emojiCallout.emoji,
    } as CalloutBlock;
    return block;
  }
  if (blockParent.type == "quote") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      content: blockParent.blockTyping.rich_text[0].plain_text,
      color: blockParent.blockTyping.rich_text[0].annotations.color,
      bold: blockParent.blockTyping.rich_text[0].annotations.bold,
      italic: blockParent.blockTyping.rich_text[0].annotations.italic,
      strikethrough:
        blockParent.blockTyping.rich_text[0].annotations.strikethrough,
      underline: blockParent.blockTyping.rich_text[0].annotations.underline,
      code: blockParent.blockTyping.rich_text[0].annotations.code,
    } as QuoteBlock;
    return block;
  }
  if (blockParent.type == "divider") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
    } as DividerBlock;
    return block;
  }
  if (blockParent.type == "column") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
    } as ColumnBlock;
    return block;
  }
  if (blockParent.type == "column_list") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
    } as ColumnListBlock;
    return block;
  }
  if (blockParent.type == "link_preview") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      url: blockParent.blockTyping.url,
    } as LinkPreviewBlock;
    return block;
  }
  if (blockParent.type == "table") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: blockParent.children,
      table_width: blockParent.blockTyping.table_width,
      has_column_header: blockParent.blockTyping.has_column_header,
      has_row_header: blockParent.blockTyping.has_row_header,
    } as TableBlock;
    return block;
  }
  if (blockParent.type == "table_row") {
    let cellNum = 0;
    const typedCells = getTableRowCells(blockParent);
    typedCells.forEach((cell) => {
      cell.cellNum = cellNum;
      cellNum = cellNum + 1;
    });
    rowNum = rowNum + 1;
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      cells: typedCells,
      rowNum: rowNum,
    } as TableRowBlock;

    return block;
  }
}

function getTableRowCells(tableRow: any) {
  const typedCellArray: Cell[] = [];
  for (const cell of tableRow.blockTyping.cells) {
    const typedCell = {
      bold: cell[0].annotations.bold,
      italic: cell[0].annotations.italic,
      strikethrough: cell[0].annotations.strikethrough,
      underline: cell[0].annotations.underline,
      code: cell[0].annotations.code,
      color: cell[0].annotations.color,
      content: cell[0].plain_text,
    } as Cell;
    typedCellArray.push(typedCell);
  }
  return typedCellArray;
}

async function recursivelyGetChildren(notion: Client, blockParentId: string) {
  const childrenResponse = await notion.blocks.children.list({
    block_id: blockParentId,
    page_size: 100,
  });

  const blocksToReuturn: any[] = [];
  for (const childBlock of childrenResponse.results) {
    const parsedChildBlock = JSON.parse(JSON.stringify(childBlock));

    const childBlockTyping =
      parsedChildBlock[
        Object.keys(parsedChildBlock)[Object.keys(parsedChildBlock).length - 1]
      ];
    const childToBlock = {
      object: "block",
      id: parsedChildBlock.id,
      has_children: parsedChildBlock.has_children,
      archived: parsedChildBlock.archived,
      type: parsedChildBlock.type,
      children: await recursivelyGetChildren(notion, parsedChildBlock.id),
      blockTyping: childBlockTyping,
    } as RawChildBlock;
    //  const children: any[] = [];
    const typedChildBlock = setBlockTypes(childToBlock);
    //console.log("typedChildBlock ", typedChildBlock);
    blocksToReuturn.push(typedChildBlock);
  }
  return blocksToReuturn;
}

export const getPageBlocks = async (notion: Client, pageId: string) => {
  const pageFromNotion = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  //console.log("pageFromNotion ", pageFromNotion);
  const Page = { object: "block", children: [] } as Page;
  const parentBlocks = pageFromNotion.results as BlockObjectResponse[];

  for (const blockParent of parentBlocks) {
    const children = await recursivelyGetChildren(notion, blockParent.id);

    setBlockTypesAndAddToPage(
      blockParent as BlockObjectResponse,
      children,
      Page
    );
  }

  return Page;
};
