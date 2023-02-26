import { Client } from "@notionhq/client";
import { getPageBlocks, parseProperties, queryDatabase } from "./notionAPI";

export interface PostMetaData {
  id: string;
  title: string;
  tagArray: string[];
  author: string;
  lastUpdated: string;
  readTime: number;
  coverImage: string;
  authorProfilePic: string;
}

export async function getAllPostIds() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await queryDatabase(notion);
  const blogArticles = parseProperties(response);

  return blogArticles.map((article) => {
    const formatedDate = new Date(article.lastUpdated).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return {
      params: {
        id: article.id,
        title: article.title,
        tagArray: article.tagArray,
        author: article.people.name,
        lastUpdated: formatedDate,
        readTime: article.readTime,
        coverImage: article.coverImage,
        authorProfilePic: article.authorProfilePic,
      } as PostMetaData,
    };
  });
}

export async function getPostData(id: string) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const page = await getPageBlocks(notion, id);
  return {
    id,
    page,
  };
}
