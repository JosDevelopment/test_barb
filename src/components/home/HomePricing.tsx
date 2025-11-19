// HomePricing.tsx
'use client';

import React from 'react';
import type { HomePricingContentType } from '../../types/content/homeTypes';


interface HomePricingProps {
  content: HomePricingContentType;
  className?: string;
}

const HomePricing: React.FC<HomePricingProps> = ({ content, className = '' }) => {
  const { heading, plans, cta } = content;

  return (
    <section id="precios" className={`py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-10 text-3xl font-bold">{heading}</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border border-primary-700 p-6 ${
                p.highlight ? 'bg-primary-100 text-primary-950 shadow-2xl' : 'bg-primary-900'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 right-4 rounded-full bg-primary-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-50">
                  Más popular
                </span>
              )}

              <h3 className={`text-2xl font-bold ${p.highlight ? '' : 'text-primary-50'}`}>{p.name}</h3>
              <p className={`mt-2 text-4xl font-extrabold ${p.highlight ? '' : 'text-primary-50'}`}>{p.price}</p>

              <ul className={`mt-6 space-y-2 text-sm ${p.highlight ? 'text-primary-800' : 'text-primary-200'}`}>
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-current/60" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={cta.url}
                className={`mt-6 inline-block w-full rounded-xl px-4 py-2 text-center font-semibold transition ${
                  p.highlight
                    ? 'bg-primary-950 text-primary-50 hover:opacity-90'
                    : 'bg-primary-100 text-primary-900 hover:opacity-90'
                }`}
              >
                {cta.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePricing;
