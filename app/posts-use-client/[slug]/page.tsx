'use client'

import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { cache, use } from 'react'

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }))
}

const getPost = cache((url: string) => Promise.resolve(allPosts.find((post) => post._raw.flattenedPath === url)))

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = use(getPost(params.slug))

  return (
    <>
      <head>
        <title>{post.title}</title>
      </head>
      <article className="py-8 mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <h1>{post.title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article>
    </>
  )
}

export default PostLayout
