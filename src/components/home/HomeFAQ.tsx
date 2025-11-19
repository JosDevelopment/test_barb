// HomeFaq.tsx
'use client';

import type { HomeFaqContentType } from "../../types/content/homeTypes";


interface HomeFaqProps {
  content: HomeFaqContentType;
  className?: string;
}

const HomeFaq: React.FC<HomeFaqProps> = ({ content, className = '' }) => {
  return (
    <section id="faq" className={`border-t border-primary-700 py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-3xl font-bold">{content.heading}</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {content.faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-primary-700 bg-primary-900 p-5 open:bg-primary-800"
            >
              <summary className="cursor-pointer select-none text-base font-semibold text-primary-100">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-primary-200">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;
