'use client';

import { motion } from 'framer-motion';
import { Database, Code, BarChart3, Cpu, BarChart2 } from 'lucide-react';

type Card = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const cards: Card[] = [
  {
    title: 'Data Analysis',
    description: 'Exploratory analysis, cleaning, transformation & statistical modeling.',
    icon: <BarChart2 className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Data Visualization',
    description: 'Power BI, Tableau, custom React charts (Recharts, D3).',
    icon: <BarChart3 className="h-10 w-10 text-cyan-400" />,
  },
  {
    title: 'SQL & Databases',
    description: 'PostgreSQL, MySQL, Snowflake, data‑warehousing & query optimisation.',
    icon: <Database className="h-10 w-10 text-purple-400" />,
  },
  {
    title: 'Python Programming',
    description: 'Pandas, NumPy, Scikit‑learn, FastAPI, automation & web‑scraping.',
    icon: <Code className="h-10 w-10 text-blue-400" />,
  },
  {
    title: 'Business Intelligence',
    description: 'KPI design, dashboards, storytelling & decision support.',
    icon: <Cpu className="h-10 w-10 text-green-400" />,
  },
];

export default function Skills() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.h2
        className="text-4xl font-extrabold text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What I Do <span className="text-primary">— Skills &amp; Expertise</span>
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.12 },
          },
        }}
      >
        {cards.map((c, i) => (
          <motion.div
            key={i}
            className="bg-darkbg/70 border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:border-primary transition-all transform hover:scale-[1.02]"
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 15px rgba(0,212,255,0.4)',
            }}
          >
            <div className="mb-4">{c.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{c.title}</h3>
            <p className="text-sm text-gray-400">{c.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
