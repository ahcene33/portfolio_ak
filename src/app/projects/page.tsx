// src/app/projects/page.tsx
'use client';                         // <‑‑ CLIENT COMPONENT – allows hooks

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLinkedIn } from '@/lib/useLinkedIn';

type Project = {
  title: string;
  description: string;
  stack: string[];
  domain: string;
  pdf?: string;
  github?: string | null;
  streamlit?: string | null;
};

export default function ProjectsPage() {
  const linkedIn = useLinkedIn();                // custom hook – safe in client mode
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (linkedIn?.projects) {
      setProjects(linkedIn.projects);
    }
  }, [linkedIn]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-darkbg text-white">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
          <motion.div
            key={idx}
            className="bg-darkbg/70 border border-gray-800 rounded-xl p-6 hover:shadow-xl hover:border-primary transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">{p.title}</h3>
            <p className="mb-2">{p.description}</p>

            {/* Stack badges */}
            <div className="flex flex-wrap gap-1 mb-3">
              {p.stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-primary/20 text-primary rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 text-sm">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  GitHub
                </a>
              )}
              {p.streamlit && (
                <a
                  href={p.streamlit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  Demo
                </a>
              )}
              {p.pdf && (
                <a
                  href={p.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  PDF
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
