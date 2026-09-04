import type { Post } from "contentlayer/generated"

/** Newest first. Contentlayer hands dates over as ISO strings. */
export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function formatMonthYear(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  })
}

export function formatLongDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getYear(date: string): number {
  return new Date(date).getFullYear()
}

/** Groups posts into year buckets, newest year first. */
export function groupPostsByYear(posts: Post[]): [number, Post[]][] {
  const buckets: Record<number, Post[]> = {}

  sortPostsByDate(posts).forEach((post) => {
    const year = getYear(post.date)
    if (!buckets[year]) buckets[year] = []
    buckets[year].push(post)
  })

  return Object.keys(buckets)
    .map((year): [number, Post[]] => [Number(year), buckets[Number(year)]])
    .sort((a, b) => b[0] - a[0])
}
