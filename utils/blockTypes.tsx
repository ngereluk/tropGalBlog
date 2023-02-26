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
