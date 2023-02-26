import { Client } from "@notionhq/client";
import {
  QueryDatabaseResponse,
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Block, Cell, RawChildBlock } from "../utils/blockTypes";
import setBlockTypes from "../utils/getChildBlocks";
import setBlockTypesAndAddToPage from "../utils/setBlockTypesAndAddToPage";

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

export const queryDatabase = async (notion: Client) =>
  await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
  });

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
    .filter((post: any) => post !== undefined) as any[];

export const getTableRowCells = (tableRow: any) => {
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
};

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
    const typedChildBlock = setBlockTypes(childToBlock);
    blocksToReuturn.push(typedChildBlock);
  }
  return blocksToReuturn;
}

export const getPageBlocks = async (notion: Client, pageId: string) => {
  const pageFromNotion = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
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
