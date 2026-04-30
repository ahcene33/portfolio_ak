'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLinkedIn } from '@/lib/useLinkedIn';

export default function Hero() {
  const data = useLinkedIn();

  // fallback values if JSON still loading
  const profilePic = data?.media?.profile_picture ?? '/assets/profile.png';
  const headline = data?.identity?.headline ?? 'Data Analyst';
  const location = data?.identity?.location ?? '';
  const summary = data?.profile_summary ?? '';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT – Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-wider text-gray-400">
            HELLO, I&apos;M
          </p>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight">
            {data?.identity?.name ?? 'Ahcene'}
          </h1>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-300">
            {headline}{' '}
            <span className="text-primary">Insights</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-lg">{summary}</p>

          <div className="flex gap-4 pt-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-500 text-darkbg font-medium rounded-md hover:from-blue-500 hover:to-primary transition-colors"
            >
              View My Work
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-darkbg transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>

        {/* RIGHT – Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={profilePic}
            alt="Profile picture"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl ring-1 ring-primary/30"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
