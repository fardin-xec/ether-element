'use client';
import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="relative py-32 px-8 lg:px-20 bg-black overflow-hidden">
      {/* Horizontal line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Large background text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-cormorant text-[20vw] leading-none text-white/[0.02] select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-cormorant)' }}>
        ETHEREAL
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left — brand statement */}
        <div>
          <p data-reveal className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-[#c9a96e] mb-6"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s ease' }}>
            Experience the Ethereal
          </p>

          <h2 data-reveal className="font-cormorant text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-light text-white mb-8"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s ease', fontFamily: 'var(--font-cormorant)' }}>
            A fragrance<br />
            <em>felt before</em><br />
            it is seen.
          </h2>

          <div data-reveal className="w-12 h-px bg-[#c9a96e] mb-8"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s ease' }} />

          <p data-reveal className="font-montserrat text-sm leading-[1.9] text-white/45 font-light max-w-md"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s ease' }}>
            At Ether Element, we believe a truly exceptional fragrance is not merely worn — it is felt. Every accord in our collection is built with deliberate intention. Layered with depth. Refined to linger.
          </p>
        </div>

        {/* Right — 3 pillars */}
        <div className="flex flex-col gap-1">
          {[
            { num: '01', title: 'Deliberate', desc: 'Every accord built with intention. No note is accidental.' },
            { num: '02', title: 'Layered', desc: 'Depth that unfolds — from first spritz to lasting echo.' },
            { num: '03', title: 'Eternal', desc: 'Between the darkest hour and the softest morning.' },
          ].map((item, i) => (
            <div key={item.num} data-reveal
              className="group flex gap-6 p-6 border-b border-white/5 hover:border-[#c9a96e]/20 transition-all duration-500 cursor-default"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s ease' }}>
              <span className="font-montserrat text-xs text-[#c9a96e]/40 group-hover:text-[#c9a96e] transition-colors pt-1">{item.num}</span>
              <div>
                <h3 className="font-cormorant text-2xl text-white/80 group-hover:text-white transition-colors mb-1"
                  style={{ fontFamily: 'var(--font-cormorant)' }}>{item.title}</h3>
                <p className="font-montserrat text-xs text-white/30 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
