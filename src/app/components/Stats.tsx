'use client';

import { useEffect, useState } from 'react';
import {
  BarChart2,
  Briefcase,
  Zap,
  Award,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

type StatsData = {
  label: string;
  value: string;
  icon: JSX.Element;
  description: string;
};

export default function Stats() {
  const [stats, setStats] = useState<StatsData[]>([]);

  // Charge les stats depuis le JSON LinkedIn (public/assets/linkedin.json)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/assets/linkedin.json');
        const data = await res.json();

        // Exemple de structure simplifiée – ajustez selon votre JSON réel
        const projects = data.projects?.length ?? 0;
        const yearsData = data.years_experience?.data ?? 0;
        const yearsEnergy = data.years_experience?.energy ?? 0;

        const newStats: StatsData[] = [
          {
            label: `${projects}+`,
            value: 'Projects',
            icon: <BarChart2 className="h-8 w-8 text-primary" />,
            description: 'Projects Completed',
          },
          {
            label: `${yearsData}+`,
            value: 'Years',
            icon: <Calendar className="h-8 w-8 text-cyan-400" />,
            description: 'Experience in Data',
          },
          {
            label: `${yearsEnergy}+`,
            value: 'Years',
            icon: <Zap className="h-8 w-8 text-purple-400" />,
            description: 'Energy & Env. Expertise',
          },
          {
            label: '5+',
            value: 'Certificates',
            icon: <Award className="h-8 w-8 text-blue-400" />,
            description: 'Professional Certifications',
          },
        ];
        setStats(newStats);
      } catch (err) {
        console.error('Failed to load LinkedIn JSON', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-4 p-5 rounded-xl bg-darkbg/70 border border-gray-800 hover:border-primary transition-colors"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <p className="text-2xl font-bold text-primary">{item.label}</p>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
