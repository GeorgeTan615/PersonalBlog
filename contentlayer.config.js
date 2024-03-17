import { defineDocumentType, makeSource } from "contentlayer/source-files"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const calculateReadingTime = (text) => {
  // Step 2: Determine the average reading speed (words per minute)
  const wordsPerMinute = 200;
  // Step 3: Calculate the word count
  const noOfWords = text.split(/\s/g).length;
  // Step 4: Calculate the estimated reading time (in minutes)
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  // Step 5: Format the output
  return `${readTime} minute${readTime > 1 ? "s" : ""} read`;
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    readTimeMinutes: {
      type: "string",
      resolve: (doc) => calculateReadingTime(doc.body.raw)
    },
    ...computedFields
  },
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
})
