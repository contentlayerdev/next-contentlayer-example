import { allPosts, Post } from "contentlayer/generated";
import { unique } from "typescript-array-utils";
import { compareDesc, format, parseISO } from "date-fns";

// All tags used by blog posts
const allTags: string[] = unique(allPosts.flatMap((post) => post.tags));

// All tags except "this" one
const allOtherTags = (tag: string): string[] =>
  allTags.filter((t) => !t.includes(tag));

// Fetch post by slug (use only when all slugs are known in advance)
const getPostBySlug = (slug: string): Post =>
  allPosts.find((post) => post._raw.flattenedPath === slug);

// All posts marked with a specific tag
const postsWithTag = (tag: string): Post[] | undefined =>
  allPosts.filter((post) => post.tags.includes(tag));

// Paths for all posts
const allPostPaths: string[] = allPosts.map((post) => post.url);

// All posts sorted by date
const allPostsByDate: Post[] = allPosts.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
});

// Paths for all tags
const allTagPaths: string[] = allTags.map((tag) => `/tags/${tag}`);

// Formatters
const formatDate = (date: string): string =>
  format(parseISO(date), "LLLL d, yyyy");

export {
  allTags,
  allOtherTags,
  getPostBySlug,
  postsWithTag,
  allPostPaths,
  allPostsByDate,
  allTagPaths,
  formatDate,
};
