// src/app/services/page.tsx
'use client';                         // <‑‑ MARK THIS FILE AS A CLIENT COMPONENT

import { motion } from 'framer-motion';
import { useLinkedIn } from '@/lib/useLinkedIn';

export default function ServicesPage() {
  const data = useLinkedIn();          // ← safe now – hooks can be used

  if (!data) {
    return <p className="text-center text-white">Loading…</p>;
  }

  // In the JSON the array is called `data_delivery`
  const services = data.services?.data_delivery ?? [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-darkbg text-white">
      <motion.h1
        className="text-4xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Services
      </motion.h1>

      <ul className="list-disc list-inside space-y-2">
        {services.map((s, i) => (
          <li key={i} className="text-lg">
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
