import Head from "next/head";
import { format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post: Post = allPosts.find(
    (post) => post._raw.flattenedPath === params.slug
  );
  return {
    props: {
      post,
    },
  };
}

const PostLayout = ({ post }: { post: Post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-xl mx-auto py-8">
        <div className="text-center mb-8">
          <time dateTime={post.date} className="text-xs text-gray-600 mb-1">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <h1>{post.title}</h1>
          <div className="space-x-1 mt-3">
            {post.tags.map(tag => (
              <span className="text-xs bg-gray-200 rounded py-0.5 px-1.5 hover:bg-gray-300">
                <Link href={`/tags/${tag}`}>
                  {tag}
                </Link>
              </span>
            ))}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article>
    </>
  );
};

export default PostLayout;
