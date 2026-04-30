// src/app/blog/page.tsx
'use client';   // optional – keeps consistency; no impact if left out

import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-darkbg text-white">
      <motion.h1
        className="text-4xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Blog
      </motion.h1>

      <p className="text-lg">
        Coming soon – stay tuned for articles about data engineering,
        machine‑learning, energy analytics, and more.
      </p>
    </section>
  );
}
