import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

export function PostCard(post: Post) {
  return (
    <div>
      <h2 className="text-xl">
        <Link href={post.url}>
          <a className="text-blue-700 hover:text-blue-900">{post.title}</a>
        </Link>
      </h2>
      <div className="flex justify-between items-center mb-4">
        <time dateTime={post.date} className="text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>

        <div className="flex space-x-1">
          {post.tags.map(tag => (
            <span className="text-xs bg-gray-200 rounded py-0.5 px-1.5 hover:bg-gray-300">
              <Link href={`/tags/${tag}`}>
                {tag}
              </Link>
            </span>
          ))}
        </div>
      </div>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
    </div>
  );
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Next.js Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
