import Link from "next/link";
import { Post } from "contentlayer/generated";
import { Tags } from "components/Tags";
import { allPostsByDate, formatDate } from "lib/content";

export async function getStaticProps() {
  return { props: { posts: allPostsByDate } };
}

export function PostCard(post: Post) {
  const formattedDate: string = formatDate(post.date);

  return (
    <div>
      <h2 className="text-xl">
        <Link href={post.url}>
          <a className="text-blue-700 hover:text-blue-900">{post.title}</a>
        </Link>
      </h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <time dateTime={post.date} className="text-xs text-gray-600">
            {formattedDate}
          </time>
        </div>

        <Tags tags={post.tags} />
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
