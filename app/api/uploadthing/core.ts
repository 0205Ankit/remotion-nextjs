import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const customFileRouter = {
  videoUploader: f({
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
  ///////////////////////////////////////////////////
  imageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
} satisfies FileRouter;

export type CustomFileRouter = typeof customFileRouter;
