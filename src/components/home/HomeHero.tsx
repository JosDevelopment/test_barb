// HomeHero.tsx
'use client';

import React from 'react';
import type { HomeHeroContentType } from '../../types/content/homeTypes';

interface HomeHeroProps {
  content: HomeHeroContentType;
  className?: string;
}

/**
 * Hero con estética de barbería:
 * - Fondo oscuro (neutral) con brillos sutiles.
 * - Acentos rojo/azul (accent/primary) tipo “barber pole”.
 * - Botón primario azul (brand), secundario con borde rojo.
 * - Todo el copy e imagen provienen de `content`.
 */
const HomeHero: React.FC<HomeHeroProps> = ({ content, className = '' }) => {
  return (
    <section
      className={`relative overflow-hidden py-20 md:py-28 ${className}`}
    >
      {/* Fondos decorativos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-20"
        style={{
          background:
            // halo suave al centro-izquierda
            `radial-gradient(600px 300px at 15% 20%, var(--color-primary-800), transparent 70%)`,
        }}
      />
      {/* Franja “barber pole” detrás de la imagen */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[140%] w-[38%] translate-y-[-12%] opacity-30"
        style={{
          backgroundImage:
            `repeating-linear-gradient(45deg,
              var(--color-primary-700) 0 14px,
              var(--color-accent-600) 14px 28px,
              var(--color-neutral-900) 28px 42px
            )`,
          filter: 'blur(2px)',
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        {/* Columna de texto */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-700 bg-neutral-900/60 px-3 py-1 text-xs text-primary-200">
            {/* chip superior discreto con acento azul */}
            <span className="inline-block h-2 w-2 rounded-full bg-primary-500" />
            <span>Barbería de autor</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-neutral-50 md:text-6xl">
            {content.title}{' '}
            <span className="text-accent-400">{content.highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-neutral-200">
            {content.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={content.ctaPrimary.url}
              className="rounded-2xl bg-primary-600 px-6 py-3 font-semibold text-neutral-50 shadow-lg shadow-primary-900/30 transition hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              {content.ctaPrimary.title}
            </a>

            <a
              href={content.ctaSecondary.url}
              className="rounded-2xl border border-accent-600 px-6 py-3 font-semibold text-neutral-50 transition hover:bg-accent-600/10 focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              {content.ctaSecondary.title}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            {content.badges.map((badge, i) => (
              <span
                key={i}
                className="rounded-full border border-neutral-700 bg-neutral-900/50 px-3 py-1 text-neutral-300"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Columna de imagen */}
        <div className="relative">
          {/* marco con doble borde azul/rojo */}
          <div className="absolute -inset-2 -z-10 rounded-[1.75rem]"
               style={{
                 background:
                   `linear-gradient(135deg, var(--color-primary-600), var(--color-accent-600))`,
                 filter: 'blur(12px)',
                 opacity: 0.35,
               }}
          />
          <div className="overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-900 shadow-2xl">
            <img
              src={content.image.src}
              alt={content.image.alt || ''}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          {/* sello/medalla opcional */}
          <div className="absolute -left-4 -top-4 rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-xs font-semibold text-neutral-200 backdrop-blur">
            Since • 2015
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
