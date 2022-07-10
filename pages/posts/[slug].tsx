import Head from "next/head";
import { Post } from "contentlayer/generated";
import { Tags } from "components/Tags";
import { allPostPaths, formatDate, getPostBySlug } from "lib/content";

export async function getStaticPaths() {
  return {
    paths: allPostPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post: Post = getPostBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
}

const PostLayout = ({ post }: { post: Post }) => {
  const formattedDate: string = formatDate(post.date);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-xl mx-auto py-8">
        <div className="text-center mb-8">
          <time dateTime={post.date} className="text-xs text-gray-600 mb-1">
            {formattedDate}
          </time>
          <h1>{post.title}</h1>
          <div className="mt-3">
            <Tags tags={post.tags} />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article>
    </>
  );
};

export default PostLayout;
