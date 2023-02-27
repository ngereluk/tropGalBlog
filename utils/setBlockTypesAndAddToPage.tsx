import {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

import {
  Block,
  ParagraphBlock,
  HeadingOneBlock,
  HeadingTwoBlock,
  HeadingThreeBlock,
  BulletedListItemBlock,
  NumberedListItemBlock,
  EmbedBlock,
  ImageBlock,
  VideoBlock,
  FileBlock,
  CalloutBlock,
  QuoteBlock,
  DividerBlock,
  ColumnBlock,
  ColumnListBlock,
  LinkPreviewBlock,
  TableBlock,
  BookmarkBlock,
  SpecialCodeBlock,
} from "./blockTypes";
import { Page } from "./notionAPI";

export default function setBlockTypesAndAddToPage(
  blockParent: BlockObjectResponse,
  children: Block[],
  Page: Page
) {
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
    Page.children.push(block);
  }
  if (blockParent.type == "embed") {
    const embedATypePart = blockParent.embed.url.substring(
      blockParent.embed.url.indexOf("/") + 2
    );
    const embedType = embedATypePart.substring(0, embedATypePart.indexOf("."));
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
        url: imageBlockParent.file.url,
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
    };
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

  if (blockParent.type == "code") {
    const block = {
      object: "block",
      id: blockParent.id,
      has_children: blockParent.has_children,
      archived: blockParent.archived,
      type: blockParent.type,
      children: children,
      content: blockParent.code.rich_text[0].plain_text,
      language: blockParent.code.language,
      captions: blockParent.code.caption,
      color: blockParent.code.rich_text[0].annotations.color,
      bold: blockParent.code.rich_text[0].annotations.bold,
      italic: blockParent.code.rich_text[0].annotations.italic,
      strikethrough: blockParent.code.rich_text[0].annotations.strikethrough,
      underline: blockParent.code.rich_text[0].annotations.underline,
      code: blockParent.code.rich_text[0].annotations.code,
    } as SpecialCodeBlock;
    Page.children.push(block);
  }
}
