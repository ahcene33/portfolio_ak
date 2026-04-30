'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const json = await res.json();
      setAnswer(json.answer ?? 'No answer');
    } catch (e) {
      console.error(e);
      setAnswer('Error contacting the AI service');
    } finally {
      setLoading(false);
    }
  };

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

      {/* Modal */}
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

              <textarea
                rows={4}
                className="w-full p-2 mb-2 text-gray-800 rounded"
                placeholder="Ask me anything about my profile…"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
              />

              <button
                className="w-full py-2 bg-primary text-darkbg rounded-md hover:bg-blue-500 transition"
                onClick={sendMessage}
                disabled={loading}
              >
                {loading ? 'Thinking…' : 'Send'}
              </button>

              {answer && (
                <div className="mt-4 p-3 bg-gray-800 text-white rounded">
                  <p>{answer}</p>
                </div>
              )}

              <button
                className="mt-4 w-full py-1 text-sm text-gray-400 underline"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
