'use client';
import Hero from '../components/Hero';
import Collection from '../components/Collection';
import About from '../components/About';
import Scent from '../components/Scent';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="bg-[#06060a] text-white overflow-x-hidden">
      <Hero />
      <Collection />
      <About />
      <Scent />
      <Footer />
    </main>
  );
}
