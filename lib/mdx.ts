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

  const posts = files
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const filePath = path.join(blogDir, filename);

      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        return {
          slug,
          ...data,
        } as BlogPost;
      } catch (error) {
        console.error(`Error reading blog post file: ${filePath}`, {
          locale,
          slug,
          error: error instanceof Error ? error.message : String(error),
        });
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null);

  return posts
    .filter((post) => {
      if (!post.published) {
        return false;
      }

      const dateTime = new Date(post.date).getTime();
      if (isNaN(dateTime)) {
        console.warn(`Invalid date in blog post: ${post.slug}`, {
          locale,
          date: post.date,
        });
        return false;
      }

      return true;
    })
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

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: { slug, ...data } as BlogPost,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post file: ${filePath}`, {
      locale,
      slug,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

export async function getCaseStudies(locale: string): Promise<CaseStudy[]> {
  const caseStudiesDir = path.join(contentDir, 'case-studies', locale);

  if (!fs.existsSync(caseStudiesDir)) {
    return [];
  }

  const files = fs.readdirSync(caseStudiesDir).filter((file) => file.endsWith('.mdx'));

  const caseStudies = files
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const filePath = path.join(caseStudiesDir, filename);

      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        return {
          slug,
          ...data,
        } as CaseStudy;
      } catch (error) {
        console.error(`Error reading case study file: ${filePath}`, {
          locale,
          slug,
          error: error instanceof Error ? error.message : String(error),
        });
        return null;
      }
    })
    .filter((cs): cs is CaseStudy => cs !== null);

  return caseStudies
    .filter((cs) => {
      if (!cs.published) {
        return false;
      }

      const dateTime = new Date(cs.date).getTime();
      if (isNaN(dateTime)) {
        console.warn(`Invalid date in case study: ${cs.slug}`, {
          locale,
          date: cs.date,
        });
        return false;
      }

      return true;
    })
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

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: { slug, ...data } as CaseStudy,
      content,
    };
  } catch (error) {
    console.error(`Error reading case study file: ${filePath}`, {
      locale,
      slug,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}
