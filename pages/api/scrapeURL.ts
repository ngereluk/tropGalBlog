// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { Console } from "console";

export type PreviewData = {
  images: string;
  title: string;
  favicons: string;
  description: string;
};

export type FileSize = {
  fileSize: number;
};

export type Codepen = {
  test: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PreviewData | FileSize | Codepen>
) {
  const url = req.body.url;
  const blockType = req.body.blockType;

  if (blockType === "file") {
    const websiteResponse = await fetch(url);
    const fileSizeInBytes = await websiteResponse.headers.get("content-length");
    let fileSizeInKB = 0;
    if (fileSizeInBytes != null) {
      fileSizeInKB = Math.round((parseInt(fileSizeInBytes) / 1000) * 10) / 10;
    }
    res.status(200).json({
      fileSize: fileSizeInKB,
    });
  }

  if (blockType === "bookmark") {
    const previewData = (await getLinkPreview(url)) as unknown as PreviewData;

    const imageURL = previewData.images;
    const title = previewData.title;
    const faviconURL = previewData.favicons;
    const siteDescription = previewData.description;

    res.status(200).json({
      images: imageURL,
      title: title,
      favicons: faviconURL,
      description: siteDescription,
    });
  }
}
