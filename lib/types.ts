export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  date: string;
  tags: string[];
  results: string[];
  image?: string;
  published: boolean;
}
