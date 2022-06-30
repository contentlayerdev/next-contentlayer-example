import { Tags } from "components/Tags";
import { Post } from "contentlayer/generated";
import { allOtherTags, allTagPaths, postsWithTag } from "lib/content";
import Head from "next/head";
import { PostCard } from "pages";

export async function getStaticPaths() {
  return {
    paths: allTagPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts: Post[] | undefined = postsWithTag(params.tag);

  return {
    props: {
      posts,
      tag: params.tag,
    },
  };
}

const TagLayout = ({ posts, tag }: { posts: Post[]; tag: string }) => {
  const otherTags: string[] = allOtherTags(tag);

  return (
    <>
      <Head>
        <title>Posts with the tag {tag}</title>
      </Head>
      <div className="max-w-xl mx-auto py-8">
        <h1 className="text-3xl font-light mb-8 text-center">
          Posts with the tag <strong>{tag}</strong>
        </h1>

        <div>
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-12">
          <h2 className="text-xl font-light">Other available tags</h2>

          <Tags tags={otherTags} />
        </div>
      </div>
    </>
  );
};

export default TagLayout;
