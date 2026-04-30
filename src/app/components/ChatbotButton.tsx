'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed right-4 bottom-4 z-50 flex items-center justify-center w-14 h-14 bg-primary text-darkbg rounded-full shadow-lg hover:shadow-2xl focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open AI Chatbot"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Simple modal wrapper – you can replace with a full‑blown chat UI later */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-darkbg rounded-xl p-6 w-11/12 max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-primary mb-4">
                IA Assistant
              </h3>
              <p className="text-sm text-gray-400">
                Ce chatbot est alimenté par votre CV et votre profil LinkedIn. Il
                répondra uniquement à des questions liées à votre expérience
                professionnelle.
              </p>
              <button
                className="mt-6 w-full py-2 bg-primary text-darkbg rounded-md hover:bg-blue-500 transition"
                onClick={() => setOpen(false)}
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
