import { allPosts, Post } from "contentlayer/generated";
import Head from "next/head";
import Link from "next/link";
import { PostCard } from "pages";
import { unique, without } from "typescript-array-utils";

type Tagged = { tags?: string[] };

const tags = <T extends Tagged>(item: T): string[] => {
  return item.tags ?? [];
}

const allTags = <T extends Tagged>(items: T[]): string[] => {
  return unique(items.flatMap(tags));
}

const knownTags: string[] = allTags(allPosts);

export async function getStaticPaths() {
  const paths = knownTags.map(tag => `/tags/${tag}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts: Post[] | undefined = allPosts.filter(post => post.tags.includes(params.tag));

  return {
    props: {
      posts,
      tag: params.tag,
    },
  };
}

const TagLayout = ({ posts, tag }: { posts: Post[], tag: string }) => {
  // Determine all tags used by the posts with this tag
  const tagsUsedInListedPosts: string[] = unique(posts.flatMap(post => post.tags));
  // Determine which tags are used by none of these posts
  const otherTags: string[] = knownTags.filter(tag => !tagsUsedInListedPosts.includes(tag));

  return (
    <>
      <Head>
        <title>Posts with the tag {tag}</title>
      </Head>
      <div className="max-w-xl mx-auto py-8">
        <h1 className="text-3xl font-light text-center">
          Posts with the tag <span className="font-bold">{tag}</span>
        </h1>

        <div className="py-8">
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-light">
            Other available tags
          </h2>

          <div className="flex space-x-2">
            {otherTags.map(tag => (
              <span className="text-xs bg-gray-200 rounded py-0.5 px-1.5 hover:bg-gray-300">
                <Link href={`/tags/${tag}`}>
                  {tag}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TagLayout;