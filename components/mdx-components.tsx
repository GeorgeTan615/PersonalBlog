import Image from "next/image"
import Link from "next/link"
import { useMDXComponent } from "next-contentlayer/hooks"

/**
 * Most element styling lives in `.prose-site` (app/globals.css). Overrides
 * here are only for behaviour the CSS can't express — internal links that
 * should route client-side, and wide tables that must scroll in place
 * rather than pushing the page sideways.
 */
const components = {
  Image,

  a: ({ href = "", ...props }: React.ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#")

    if (isInternal) {
      return <Link href={href} {...props} />
    }

    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
  },

  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
