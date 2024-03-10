import { Post, allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  const sortFunction = (post1: Post, post2: Post) => {
    const post1Date = post1.date
    const post2Date = post2.date

    return post1Date >= post2Date ? -1 : 1
  }

  return (
    <div className="prose dark:prose-invert">
      {/* {allPosts.map((post) => (
        <article key={post._id} className="flex justify-between items-center">
          <Link href={post.slug} style={{ textDecoration: 'none' }}>
            <div className="font-bold text-md">{post.title}</div>
          </Link>
          {post.date && <p className="text-xs text-right">{new Date(post.date).toDateString()}</p>}
        </article>
      ))} */}
      {
        allPosts.sort(sortFunction).map((post) => (
          <article key={post._id} className="flex justify-between items-center">
            <Link href={post.slug} style={{ textDecoration: 'none' }}>
              <div className="font-bold text-md">{post.title}</div>
            </Link>
            {post.date && <p className="text-xs text-right">{new Date(post.date).toDateString()}</p>}
          </article>
        ))
      }
    </div>
  )
}
