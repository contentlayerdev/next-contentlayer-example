// 'use client'

import Head from 'next/head'
import { format, parseISO } from 'date-fns'
// import { allPosts, Post } from '../../../.contentlayer/generated'
import { cache, use } from 'react'
import { Post } from 'contentlayer/generated'

// export async function getStaticPaths() {
//   const paths: string[] = allPosts.map((post) => post.url)
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export async function getStaticProps({ params }) {
//   const post: Post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
//   return {
//     props: {
//       post,
//     },
//   }
// }

const allPosts: Post[] = []

export async function generateStaticParams() {
  // console.log('generateStaticParams')

  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }))
}

// const getPost = cache((url: string) => Promise.resolve(allPosts.find((post) => post._raw.flattenedPath === url)))

const PostLayout = ({ params }: { params: { slug: string } }) => {
  console.log('PostLayout', params)

  // const post = use(getPost(params.slug))

  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-xl mx-auto py-8">
        <div className="text-center mb-8">
          <time dateTime={post.date} className="text-xs text-gray-600 mb-1">
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
