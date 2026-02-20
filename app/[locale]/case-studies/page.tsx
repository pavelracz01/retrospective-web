import { getCaseStudies } from '@/lib/mdx';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('caseStudies');
  const caseStudies = await getCaseStudies(locale);

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-600">{t('subtitle')}</p>
        </div>

        {caseStudies.length === 0 ? (
          <p className="text-center text-slate-600">No case studies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.slug}
                href={`/${locale}/case-studies/${caseStudy.slug}`}
                className="block h-full group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {caseStudy.title}
                    </CardTitle>
                    <CardDescription>{caseStudy.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{formatDate(caseStudy.date)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 2.75A.75.75 0 011.75 2h10.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 3.5a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H1.75A.75.75 0 011 6.25zm0 3.5a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H1.75A.75.75 0 011 9.75zm0 3.5a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H1.75a.75.75 0 01-.75-.75zM15.5 2a.75.75 0 00-.75.75v11.5a.75.75 0 001.5 0V2.75A.75.75 0 0015.5 2zm2.75.75a.75.75 0 011.5 0v11.5a.75.75 0 01-1.5 0V2.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{caseStudy.client}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{caseStudy.industry}</span>
                      </div>

                      <div className="pt-2">
                        <div className="text-sm font-medium text-slate-700 mb-2">
                          {caseStudy.results.length}{' '}
                          {caseStudy.results.length === 1 ? 'result' : 'results'}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
