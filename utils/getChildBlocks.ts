import {
  RawChildBlock,
  ParagraphBlock,
  HeadingOneBlock,
  HeadingTwoBlock,
  HeadingThreeBlock,
  BulletedListItemBlock,
  NumberedListItemBlock,
  FileBlock,
  CalloutBlock,
  QuoteBlock,
  DividerBlock,
  ColumnBlock,
  ColumnListBlock,
  LinkPreviewBlock,
  TableBlock,
  TableRowBlock,
  Cell,
} from "../utils/blockTypes";

import { getTableRowCells } from "../utils/notionAPI";

import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function setBlockTypes(blockParent: RawChildBlock) {
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
    let rowNum = 0;
    const typedCells = getTableRowCells(blockParent);
    typedCells.forEach((cell: Cell) => {
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
