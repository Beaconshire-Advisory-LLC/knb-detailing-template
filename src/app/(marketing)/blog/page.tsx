import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/formatting";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Notes from the rig — how to take care of your vehicle, lake-area detailing tips, the why behind what we do.",
  path: "/blog",
});

export default async function BlogIndex() {
  const posts = await getAllBlogPosts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Blog
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Notes from the rig
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            How to take care of your vehicle, the why behind what we do, and
            lake-area specifics you can&apos;t find on a national detailing
            blog.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">
              No posts yet — check back soon.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <li key={p.frontmatter.slug}>
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col p-6">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {formatDate(p.frontmatter.date, {
                          weekday: undefined,
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h2 className="mt-2 text-xl font-bold">
                        <Link
                          href={`/blog/${p.frontmatter.slug}`}
                          className="hover:underline"
                        >
                          {p.frontmatter.title}
                        </Link>
                      </h2>
                      <p className="mt-3 flex-1 text-sm text-muted-foreground">
                        {p.frontmatter.excerpt}
                      </p>
                      <Link
                        href={`/blog/${p.frontmatter.slug}`}
                        className="mt-4 text-sm font-medium text-primary hover:underline"
                      >
                        Read post →
                      </Link>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
