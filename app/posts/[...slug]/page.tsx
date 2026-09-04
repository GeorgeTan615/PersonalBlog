import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"
import { formatLongDate, sortPostsByDate } from "@/lib/posts"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  return allPosts.find((post) => post.slugAsParams === slug)
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  // Next essay in reverse-chronological order, for the end-of-post handoff.
  const ordered = sortPostsByDate(allPosts)
  const index = ordered.findIndex((p) => p._id === post._id)
  const next = index >= 0 ? ordered[index + 1] : undefined

  return (
    <article>
      <header className="border-b border-rule">
        {/* max-w-site keeps the left edge on the same gutter as the nav;
            max-w-prose keeps the measure readable inside it. */}
        <div className="mx-auto max-w-site px-6 pb-12 pt-14 sm:px-8 sm:pt-20">
          <div className="max-w-prose">
            <Link
              href="/writing"
              className="mb-8 inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-label text-ink-3 transition-colors duration-300 hover:text-accent"
            >
              <span aria-hidden="true">←</span> Writing
            </Link>

            <h1
              className="mb-5 font-display text-[2.25rem] leading-[1.1] tracking-tight text-ink sm:text-5xl"
              data-reveal
            >
              {post.title}
            </h1>

            {post.description && (
              <p
                className="mb-7 text-[15px] leading-relaxed text-ink-2"
                data-reveal
              >
                {post.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-2xs text-ink-3 tnum">
              <time dateTime={post.date}>{formatLongDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTimeMinutes}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-site px-6 py-12 sm:px-8 sm:py-14">
        <div className="prose-site max-w-prose">
          <Mdx code={post.body.code} />
        </div>
      </div>

      {next && (
        <div className="border-t border-rule">
          <div className="mx-auto max-w-site px-6 py-10 sm:px-8">
            <div className="max-w-prose">
              <p className="mb-3 font-mono text-2xs uppercase tracking-label text-ink-3">
                Read next
              </p>
              <Link href={next.slug} className="group block">
                <h2 className="font-display text-2xl leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                  {next.title}
                </h2>
                {next.description && (
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
                    {next.description}
                  </p>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
