'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left – Text */}
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
            Data Analyst
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-300">
            Transforming Data Into{' '}
            <span className="text-primary">Insights</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-lg">
            I help companies in Energy, Aerospace and Environment turn raw data
            into actionable insights, using Python, SQL, Power BI and Machine
            Learning. Let’s turn your data into a competitive advantage.
          </p>

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

        {/* Right – Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Remplacez le src par votre mockup dashboard – ici on utilise un placeholder */}
          <Image
            src="/assets/profile.png"
            alt="Dashboard mockup"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl ring-1 ring-primary/30"
          />
        </motion.div>
      </div>
    </section>
  );
}
