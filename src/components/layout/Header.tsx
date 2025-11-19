'use client'

import React, { useState } from "react";
import type { HeaderContentType } from "../../types/content/globalTypes";

interface HeaderProps {
  content: HeaderContentType;
}

export const Header: React.FC<HeaderProps> = ({ content}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-primary-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <a href="#" className="flex items-center gap-3">
          <Logo />
          <span className="text-lg font-semibold tracking-wide text-primary-50">{content.brand}</span>
        </a>
        <nav className="hidden md:flex gap-6">
          {content.nav.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="text-primary-100 hover:text-primary-50 text-sm"
            >
              {link.title}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href={content.cta.url}
            className="rounded-xl bg-primary-100 px-4 py-2 text-primary-900 font-semibold hover:opacity-90"
          >
            {content.cta.title}
          </a>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <Burger open={mobileOpen} />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-primary-700 bg-primary-950/90">
          <nav className="px-4 py-4 space-y-2">
            {content.nav.map((link) => (
              <a
                key={link.url}
                href={link.url}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-primary-100 hover:bg-primary-800"
              >
                {link.title}
              </a>
            ))}
            <a
              href={content.cta.url}
              className="block mt-3 rounded-xl bg-primary-100 px-4 py-2 text-center text-primary-900 font-semibold"
            >
              {content.cta.title}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

function Logo() {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <rect x="5" y="5" width="90" height="90" rx="18" className="fill-primary-800" />
      <path
        d="M25 60 L40 35 L50 55 L60 35 L75 60"
        className="stroke-primary-50"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="72" r="4" className="fill-primary-100" />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={`absolute left-0 top-1 block h-0.5 w-6 bg-primary-50 transition ${
          open ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-2.5 block h-0.5 w-6 bg-primary-50 transition ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-4 block h-0.5 w-6 bg-primary-50 transition ${
          open ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </div>
  );
}
