'use client';
import Hero from '../components/Hero';
import About from '../components/About';
import Collection from '../components/Collection';
import Scent from '../components/Scent';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Hero />
      <Collection />
      <About />
      <Scent />
      <Footer />
    </main>
  );
}