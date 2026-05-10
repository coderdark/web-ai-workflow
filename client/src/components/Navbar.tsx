import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/classes', label: 'Classes' },
  { to: '/progress', label: 'My Progress' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(to: string) {
    return pathname === to || (to !== '/' && pathname.startsWith(to));
  }

  const linkClass = (to: string) =>
    `text-sm font-medium transition-colors ${
      isActive(to)
        ? 'text-indigo-400 border-b-2 border-indigo-500 pb-0.5'
        : 'text-slate-400 hover:text-indigo-400'
    }`;

  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-indigo-400 tracking-tight">
            ApexTuts
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={linkClass(l.to)}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="sm:hidden p-2 rounded text-slate-400 hover:text-indigo-400"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={linkClass(l.to)}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
