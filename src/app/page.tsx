import Hero from '@/app/components/Hero';
import Stats from '@/app/components/Stats';
import Skills from '@/app/components/Skills';
import ChatbotButton from '@/app/components/ChatbotButton';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Hero />
      </section>

      {/* Stats */}
      <section className="py-16 bg-darkbg">
        <Stats />
      </section>

      {/* Skills */}
      <section className="py-20 bg-darkbg">
        <Skills />
      </section>

      {/* Chat‑bot button */}
      <ChatbotButton />
    </>
  );
}
