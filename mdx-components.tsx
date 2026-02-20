import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 text-slate-900 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-12 mb-4 text-slate-900 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-8 mb-3 text-slate-900 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-6 mb-2 text-slate-900">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-bold mt-4 mb-2 text-slate-900">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-bold mt-4 mb-2 text-slate-900">
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p className="text-base leading-7 text-slate-700 mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-700">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-slate-600 bg-slate-50">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    hr: () => <hr className="my-8 border-t border-slate-200" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-slate-200">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-slate-50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-white divide-y divide-slate-200">{children}</tbody>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
        {children}
      </td>
    ),
    ...components,
  };
}
