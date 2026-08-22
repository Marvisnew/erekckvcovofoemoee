import { PortableText } from "@portabletext/react";

const components = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-brand-800">{children}</p>,
    h2: ({ children }) => <h2 className="mt-6 mb-3 text-xl font-bold text-brand-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-5 mb-2 text-lg font-semibold text-brand-900">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="my-4 border-l-4 border-brand-300 pl-4 italic text-brand-700">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc pl-6 text-brand-800">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal pl-6 text-brand-800">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
};

export default function PortableBody({ value }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
