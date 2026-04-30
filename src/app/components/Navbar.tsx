'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-md bg-darkbg/70 border-b border-gray-800"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          <span className="text-white">Data</span>
          <span className="text-primary">Analyst</span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? 'text-primary underline underline-offset-4'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Download CV button */}
          <li>
            <a
              href="/assets/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-darkbg transition-colors rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Download CV
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-gray-300" />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-darkbg/95 border-t border-gray-800">
          <ul className="flex flex-col p-4 space-y-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium ${
                    pathname === item.href
                      ? 'text-primary underline underline-offset-4'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <a
                href="/assets/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-darkbg transition-colors rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
