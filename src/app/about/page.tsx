// src/app/about/page.tsx
'use client';                         // ←⚡️  THIS MAKES THE PAGE A CLIENT COMPONENT

import { motion } from 'framer-motion';
import { useLinkedIn } from '@/lib/useLinkedIn';

export default function AboutPage() {
  const data = useLinkedIn();

  if (!data) {
    return <p className="text-center text-white">Loading…</p>;
  }

  const { identity, profile_summary, education, languages, keywords } = data;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-darkbg text-white">
      <motion.h1
        className="text-4xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About {identity?.name}
      </motion.h1>

      <p className="mb-6 text-lg">{profile_summary}</p>

      {/* ── Education ── */}
      <h2 className="text-2xl font-semibold mb-3 text-primary">
        Education
      </h2>
      <ul className="list-disc list-inside mb-6">
        {education?.map((e, i) => (
          <li key={i}>
            {e.degree} – {e.school} ({e.year})
          </li>
        ))}
      </ul>

      {/* ── Languages ── */}
      <h2 className="text-2xl font-semibold mb-3 text-primary">
        Languages
      </h2>
      <ul className="list-disc list-inside mb-6">
        {Object.entries(languages ?? {}).map(([lang, level]) => (
          <li key={lang}>
            {lang}: {level}
          </li>
        ))}
      </ul>

      {/* ── Keywords ── */}
      <h2 className="text-2xl font-semibold mb-3 text-primary">
        Keywords
      </h2>
      <p className="flex flex-wrap gap-2">
        {keywords?.map((kw, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-primary/20 text-primary rounded text-sm"
          >
            {kw}
          </span>
        ))}
      </p>
    </section>
  );
}
