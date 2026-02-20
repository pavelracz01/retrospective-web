import { getCaseStudy, getCaseStudies } from '@/lib/mdx';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locales } from '@/i18n/config';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    const caseStudies = await getCaseStudies(locale);
    for (const caseStudy of caseStudies) {
      params.push({ locale, slug: caseStudy.slug });
    }
  }
  return params;
}

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const caseStudy = await getCaseStudy(locale, slug);
  if (!caseStudy) {
    notFound();
  }

  const t = await getTranslations('caseStudies');

  return (
    <article className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/case-studies`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          {t('backToCaseStudies')}
        </Link>

        <header className="mb-12 border-b border-slate-200 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {caseStudy.frontmatter.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-slate-600 mt-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M1 2.75A.75.75 0 011.75 2h10.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 3.5a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H1.75A.75.75 0 011 6.25zm0 3.5a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H1.75A.75.75 0 011 9.75zm0 3.5a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H1.75a.75.75 0 01-.75-.75zM15.5 2a.75.75 0 00-.75.75v11.5a.75.75 0 001.5 0V2.75A.75.75 0 0015.5 2zm2.75.75a.75.75 0 011.5 0v11.5a.75.75 0 01-1.5 0V2.75z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Client
                </div>
                <div className="text-slate-900 font-medium">
                  {caseStudy.frontmatter.client}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-slate-600 mt-0.5"
              >
                <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Industry
                </div>
                <div className="text-slate-900 font-medium">
                  {caseStudy.frontmatter.industry}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-slate-600 mt-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Date
                </div>
                <time
                  dateTime={caseStudy.frontmatter.date}
                  className="text-slate-900 font-medium"
                >
                  {formatDate(caseStudy.frontmatter.date, locale)}
                </time>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {caseStudy.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {caseStudy.frontmatter.results.length > 0 && (
          <div className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Key Results
            </h2>
            <ul className="space-y-4">
              {caseStudy.frontmatter.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg text-slate-800 font-medium">
                    {result}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose prose-slate prose-lg max-w-none">
          <MDXRemote source={caseStudy.content} />
        </div>
      </div>
    </article>
  );
}
