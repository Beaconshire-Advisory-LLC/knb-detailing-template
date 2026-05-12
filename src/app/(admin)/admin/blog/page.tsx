import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/formatting";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Posts are MDX files in <code>src/content/blog/</code>. New posts
          land via a pull request (filename = slug).
        </p>
      </header>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="mx-auto size-10 text-muted-foreground" aria-hidden />
            <p className="mt-3 text-sm text-muted-foreground">
              No posts found in <code>src/content/blog/</code>.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {posts.map((p) => (
            <li key={p.frontmatter.slug}>
              <Card>
                <CardContent className="flex items-start justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <p className="text-sm font-bold">{p.frontmatter.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(p.frontmatter.date, {
                        weekday: undefined,
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {p.frontmatter.author ? ` · ${p.frontmatter.author}` : ""}
                    </p>
                    <Badge variant="secondary" className="mt-2 font-mono text-[10px]">
                      {p.frontmatter.slug}.mdx
                    </Badge>
                  </div>
                  <Link
                    href={`/blog/${p.frontmatter.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View <ExternalLink className="size-3.5" aria-hidden />
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-6 text-sm">
        <h2 className="font-semibold">How to add a post</h2>
        <ol className="mt-3 list-inside list-decimal space-y-1.5 text-muted-foreground">
          <li>
            Create a new <code>.mdx</code> file in <code>src/content/blog/</code>{" "}
            named after the URL slug.
          </li>
          <li>
            Add frontmatter: <code>title</code>, <code>slug</code>,{" "}
            <code>date</code>, <code>excerpt</code>, <code>author</code>,
            optional <code>tags</code>.
          </li>
          <li>Write the post in MDX.</li>
          <li>Commit and push. Vercel rebuilds and the post goes live.</li>
        </ol>
      </div>
    </div>
  );
}
