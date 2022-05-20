import Head from "next/head";
import { format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

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
          {post.tags != [] && (
            <div className="mt-2 inline-flex space-x-2">
              {post.tags.map(tag => (
                <span className="text-xs bg-gray-100 py-0.5 px-1.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article>
    </>
  );
};

export default PostLayout;
