// components/HomeServices.tsx
'use client';

import React from 'react';
import type { HomeServicesContentType } from '../../types/content/homeTypes';

interface HomeServicesProps {
  content: HomeServicesContentType;
  className?: string;
}

const HomeServices: React.FC<HomeServicesProps> = ({ content, className = '' }) => {
  const { heading, cta, items } = content;

  return (
    <section id="servicios" className={`py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-bold">{heading}</h2>
          <a href={cta.url} className="text-sm text-primary-300 hover:text-primary-50">
            {cta.title}
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <article
              key={s.title}
              className="group overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-900 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={s.img.src}
                  alt={s.img.alt || s.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {/* Precio en badge acento (rojo) */}
                {s.price &&
                  <span className="absolute left-3 top-3 rounded-full bg-accent-600/90 px-3 py-1 text-xs font-bold text-neutral-50 shadow">
                    {s.price}
                  </span>
                }
              </div>

              <div className="space-y-2 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-neutral-50">{s.title}</h3>
                  {/* Precio secundario (opcional) visible en desktop */}
                  {s.price &&
                    <span className="hidden rounded-full border border-accent-600 px-2 py-0.5 text-xs font-semibold text-neutral-100 md:inline">
                      {s.price}
                    </span>
                  }
                </div>
                <p className="text-sm text-neutral-300">{s.desc}</p>
              </div>

              {/* Línea decorativa estilo barber pole */}
              <div
                aria-hidden
                className="h-1 opacity-60"
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-primary-700), var(--color-accent-600), var(--color-neutral-800))',
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
