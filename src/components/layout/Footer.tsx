import type { FooterContentType } from "../../types/content/globalTypes";



interface FooterProps {
  content: FooterContentType;
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="border-t border-primary-700">
      <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-primary-300">
          <Logo />
          <span>© {content.year} {content.brand}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-primary-200">
          {content.social.map((link, i) => (
            <a key={i} href={link.url} className="hover:text-primary-50">
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

function Logo() {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <rect x="5" y="5" width="90" height="90" rx="18" className="fill-primary-800" />
      <path d="M25 60 L40 35 L50 55 L60 35 L75 60" className="stroke-primary-50" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="72" r="4" className="fill-primary-100" />
    </svg>
  );
}
