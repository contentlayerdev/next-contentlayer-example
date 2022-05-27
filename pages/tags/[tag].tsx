import { Tags } from "components/Tags";
import { allPosts, Post } from "contentlayer/generated";
import Head from "next/head";
import { PostCard } from "pages";
import { unique } from "typescript-array-utils";

const knownTags: string[] = unique(allPosts.flatMap(post => post.tags));

export async function getStaticPaths() {
  const paths: string[] = knownTags.map(tag => `/tags/${tag}`);

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
        <h1 className="text-3xl font-light mb-8 text-center">Posts with the tag <strong>{tag}</strong></h1>

        <div>
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-12">
          <h2 className="text-xl font-light">
            Other available tags
          </h2>

          <Tags tags={otherTags} />
        </div>
      </div>
    </>
  )
}

export default TagLayout;
