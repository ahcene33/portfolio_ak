'use client';

import { useEffect, useState } from 'react';
import {
  BarChart2,
  Calendar,
  Zap,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLinkedIn } from '@/lib/useLinkedIn';

type StatItem = {
  label: string;
  description: string;
  icon: JSX.Element;
};

export default function Stats() {
  const data = useLinkedIn();
  const [stats, setStats] = useState<StatItem[]>([]);

  // Helper – compute total years of experience from the "period" strings
  const computeYears = (exp: any[]) => {
    if (!exp?.length) return 0;
    const years = exp
      .map((e) => {
        const m = e.period?.match(/(\d{4})/g);
        // period can contain two years (start – end) – we keep the first one
        return m ? parseInt(m[0]) : null;
      })
      .filter(Boolean) as number[];
    if (!years.length) return 0;
    const min = Math.min(...years);
    const max = Math.max(...years);
    return max - min + 1;
  };

  useEffect(() => {
    if (!data) return;

    const projectCount = data.projects?.length ?? 0;
    const yearsExp = computeYears(data.professional_experience);
    const industryYears = data.industry_expertise?.length ?? 0; // a simple proxy for “energy & env.”

    const newStats: StatItem[] = [
      {
        label: `${projectCount}+`,
        description: 'Projects Completed',
        icon: <BarChart2 className="h-8 w-8 text-primary" />,
      },
      {
        label: `${yearsExp}+`,
        description: 'Years Experience',
        icon: <Calendar className="h-8 w-8 text-cyan-400" />,
      },
      {
        label: `${industryYears}+`,
        description: 'Industry Expertise',
        icon: <Zap className="h-8 w-8 text-purple-400" />,
      },
      {
        label: '5+',
        description: 'Certificates',
        icon: <Award className="h-8 w-8 text-blue-400" />,
      },
    ];
    setStats(newStats);
  }, [data]);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 p-5 rounded-xl bg-darkbg/70 border border-gray-800 hover:border-primary transition-colors"
          >
            <div>{s.icon}</div>
            <div>
              <p className="text-2xl font-bold text-primary">{s.label}</p>
              <p className="text-sm text-gray-400">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
