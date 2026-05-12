import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type BlogFrontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  cover?: string;
  author?: string;
  tags?: string[];
};

export type BlogPost = {
  frontmatter: BlogFrontmatter;
  content: string;
};

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const files = await readdir(BLOG_DIR);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const file = await readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(file);
    return {
      frontmatter: { ...(data as BlogFrontmatter), slug },
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await getBlogPostSlugs();
  const posts = await Promise.all(slugs.map((s) => getBlogPost(s)));
  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}
