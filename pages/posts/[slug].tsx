import Head from "next/head";
import { format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { useMDXComponent } from 'next-contentlayer/hooks'
import Form from "../../components/Form"

// Const that passes custom components to all MDX files in the posts directory
const MDXcomponents = {
  Form,
};

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
  // Rendering MDX
  const MDXComponent = useMDXComponent(post.body.code)
  //
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
        </div>

        {/* Switch from MD to MDX */}
        {/* <div dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
        <MDXComponent components={MDXcomponents}/>
        {/*  */}

      </article>
    </>
  );
};

export default PostLayout;
