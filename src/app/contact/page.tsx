'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-darkbg text-white">
      <motion.form
        className="bg-darkbg/70 border border-gray-800 rounded-xl p-8 w-full max-w-lg"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Contact Me
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          value={form.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          rows={4}
          placeholder="Your message"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-2 bg-primary text-darkbg rounded-md hover:bg-blue-500 transition"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>

        {status === 'sent' && (
          <p className="mt-4 text-green-400 text-center">
            Your message has been sent!
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-400 text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </motion.form>
    </section>
  );
}
