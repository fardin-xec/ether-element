'use client';
import { useEffect, useRef } from 'react';

export default function Scent() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="scent" ref={sectionRef} className="relative py-32 px-8 lg:px-20 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p data-reveal className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-[#c9a96e] mb-4"
            style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}>
            The Collection
          </p>
          <h2 data-reveal className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-light text-white"
            style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease', fontFamily: 'var(--font-cormorant)' }}>
            Beauty Only the Night Wears
          </h2>
        </div>

        {/* Central showcase */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Notes wheel */}
          <div data-reveal className="relative w-72 h-72 flex-shrink-0"
            style={{ opacity: 0, transform: 'translateY(20px) scale(0.95)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}>
            <NotesWheel />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-8 max-w-sm">
            {[
              { phase: 'Top Notes', desc: 'The first breath — sharp, immediate, unforgettable.' },
              { phase: 'Heart Notes', desc: 'The soul of the fragrance. Warm, deliberate, complex.' },
              { phase: 'Base Notes', desc: 'What lingers on skin for hours. The lasting impression.' },
            ].map((item, i) => (
              <div key={item.phase} data-reveal
                className="flex gap-4 items-start"
                style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}>
                <div className="w-px h-12 bg-gradient-to-b from-[#c9a96e] to-transparent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-1">{item.phase}</p>
                  <p className="font-montserrat text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div data-reveal className="mt-4"
              style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}>
              <div className="border border-white/10 p-6 rounded-sm">
                <p className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-white/25 mb-3">How to wear</p>
                <p className="font-montserrat text-xs text-white/50 leading-relaxed">
                  Apply to pulse points — wrists, neck, and behind the ears. Layer over moisturised skin. Never rub. Let the accord settle and reveal itself naturally.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom price strip */}
        <div data-reveal className="mt-24 flex items-center justify-between border-t border-white/5 pt-10"
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}>
          <div>
            <p className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-white/25 mb-1">Retail Price</p>
            <p className="font-cormorant text-3xl text-[#c9a96e]" style={{ fontFamily: 'var(--font-cormorant)' }}>₹ 1,200</p>
            <p className="font-montserrat text-[9px] text-white/25 mt-1">Incl. all taxes · 50 ML · 1.7 FL.OZ</p>
          </div>
          <div className="text-right">
            <p className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-white/25 mb-1">Crafted by</p>
            <p className="font-cormorant text-xl text-white/60" style={{ fontFamily: 'var(--font-cormorant)' }}>Ether Element</p>
            <p className="font-montserrat text-[9px] text-white/25">Ahmedabad, Gujarat, India</p>
          </div>
          <a href="mailto:ether.element03@gmail.com"
            className="group font-montserrat text-[10px] tracking-[0.3em] uppercase px-8 py-4 bg-white text-black hover:bg-[#c9a96e] transition-colors duration-500">
            Get Yours
          </a>
        </div>
      </div>
    </section>
  );
}

function NotesWheel() {
  const notes = [
    { label: 'Parfum', angle: 0 },
    { label: 'Aqua', angle: 72 },
    { label: 'Alcohol', angle: 144 },
    { label: 'Depth', angle: 216 },
    { label: 'Accord', angle: 288 },
  ];
  const r = 110;
  const cx = 144;
  const cy = 144;

  return (
    <svg width="288" height="288" viewBox="0 0 288 288" fill="none">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r + 20} stroke="#c9a96e" strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="4 8" />
      {/* Mid ring */}
      <circle cx={cx} cy={cy} r={r} stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.25" />
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={r - 50} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      {/* Center */}
      <circle cx={cx} cy={cy} r="28" fill="url(#wg)" />
      <circle cx={cx} cy={cy} r="28" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.4" />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#c9a96e" fontSize="8" fontFamily="serif" letterSpacing="2" opacity="0.8">ETHER</text>
      <text x={cx} y={cy + 9} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="sans-serif" letterSpacing="3">ELEMENT</text>

      {/* Spokes and labels */}
      {notes.map((note) => {
        const rad = (note.angle - 90) * (Math.PI / 180);
        const x1 = cx + (r - 50) * Math.cos(rad);
        const y1 = cy + (r - 50) * Math.sin(rad);
        const x2 = cx + r * Math.cos(rad);
        const y2 = cy + r * Math.sin(rad);
        const lx = cx + (r + 28) * Math.cos(rad);
        const ly = cy + (r + 28) * Math.sin(rad);
        return (
          <g key={note.label}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx={x2} cy={y2} r="3" fill="#c9a96e" fillOpacity="0.6" />
            <circle cx={x2} cy={y2} r="6" stroke="#c9a96e" strokeWidth="0.3" strokeOpacity="0.2" />
            <text x={lx} y={ly + 3} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif" letterSpacing="1">
              {note.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
