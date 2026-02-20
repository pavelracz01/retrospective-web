import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, CaseStudy } from './types';

const contentDir = path.join(process.cwd(), 'content');

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const blogDir = path.join(contentDir, 'blog', locale);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    } as BlogPost;
  });

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(
  locale: string,
  slug: string
): Promise<{ frontmatter: BlogPost; content: string } | null> {
  const filePath = path.join(contentDir, 'blog', locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    frontmatter: { slug, ...data } as BlogPost,
    content,
  };
}

export async function getCaseStudies(locale: string): Promise<CaseStudy[]> {
  const caseStudiesDir = path.join(contentDir, 'case-studies', locale);

  if (!fs.existsSync(caseStudiesDir)) {
    return [];
  }

  const files = fs.readdirSync(caseStudiesDir).filter((file) => file.endsWith('.mdx'));

  const caseStudies = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(caseStudiesDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    } as CaseStudy;
  });

  return caseStudies
    .filter((cs) => cs.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getCaseStudy(
  locale: string,
  slug: string
): Promise<{ frontmatter: CaseStudy; content: string } | null> {
  const filePath = path.join(contentDir, 'case-studies', locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    frontmatter: { slug, ...data } as CaseStudy,
    content,
  };
}
