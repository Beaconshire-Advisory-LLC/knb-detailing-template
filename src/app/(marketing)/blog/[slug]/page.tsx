import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPost, getBlogPostSlugs } from "@/lib/content";
import { formatDate } from "@/lib/formatting";
import {
  pageMetadata,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { SITE } from "@/lib/constants";

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
) {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);
  if (!post)
    return pageMetadata({
      title: "Not found",
      description: "",
      noIndex: true,
    });
  return pageMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage(
  props: PageProps<"/blog/[slug]">,
) {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const { frontmatter, content } = post;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    author: { "@type": "Person", name: frontmatter.author ?? "KNB Detailing" },
    publisher: { "@id": `${SITE.url}/#business` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd,
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: frontmatter.title, path: `/blog/${slug}` },
            ]),
          ]),
        }}
      />

      <article className="bg-background">
        <header className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <Badge variant="secondary" className="mb-3">
              Blog
            </Badge>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              {frontmatter.title}
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground">
              {frontmatter.excerpt}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {formatDate(frontmatter.date, {
                weekday: undefined,
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {frontmatter.author ? ` · ${frontmatter.author}` : ""}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h2:font-bold prose-h3:mt-8 prose-h3:text-xl prose-h3:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold">
            <MDXRemote source={content} />
          </div>

          <div className="mt-16 rounded-xl border border-border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">Ready when you are.</p>
            <p className="mt-1 text-lg font-semibold">
              Book a detail in under three minutes.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
              <Button render={<Link href="/book" />}>Book now</Button>
              <Button variant="outline" render={<Link href="/blog" />}>
                More posts
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
