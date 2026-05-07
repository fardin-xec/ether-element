'use client';
import { useEffect, useState } from 'react';

const SCENTS = [
  { label:'Top Notes',    desc:'The first breath — sharp, immediate, unforgettable. Citrus, herbs, and spice.' },
  { label:'Heart Notes',  desc:'The soul. Warm, deliberate, complex. Florals and woods that define the character.' },
  { label:'Base Notes',   desc:'What lingers for hours. Amber, musks, resins — the memory you leave behind.' },
];

export default function Scent() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="scent" className="bg-[#07070b] py-32 px-8 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="reveal d1 font-['Montserrat'] text-[9px] tracking-[0.55em] uppercase text-[#c9a96e] mb-3">How to Wear</p>
          <h2 className="reveal d2 font-light text-[clamp(2.2rem,5vw,4rem)] text-white" style={{ fontFamily:'Georgia,serif' }}>Design Your Accord</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Notes selector — VELUNE menu style */}
          <div className="reveal-left">
            {SCENTS.map((s, i) => (
              <button key={s.label} onClick={() => setActive(i)}
                className="w-full text-left py-6 border-b transition-all duration-400 group"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <span className="font-['Montserrat'] text-[9px] tracking-[0.4em]"
                      style={{ color: active === i ? '#c9a96e' : 'rgba(255,255,255,0.2)' }}>
                      0{i+1}
                    </span>
                    <span className="font-light text-lg transition-colors duration-300"
                      style={{ fontFamily:'Georgia,serif', color: active === i ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                      {s.label}
                    </span>
                  </div>
                  <span style={{ color: active===i ? '#c9a96e' : 'rgba(255,255,255,0.1)', transition:'color 0.3s' }}>→</span>
                </div>
                <p className="font-['Montserrat'] text-xs text-white/30 leading-relaxed mt-3 pl-10 transition-all duration-500 overflow-hidden"
                  style={{ maxHeight: active===i ? '60px' : '0px', opacity: active===i ? 1 : 0 }}>
                  {s.desc}
                </p>
                {/* gold underline */}
                <div className="h-px mt-0 transition-all duration-500"
                  style={{ background:'linear-gradient(90deg,#c9a96e,transparent)', width: active===i ? '100%' : '0%' }} />
              </button>
            ))}

            <div className="mt-10 p-6 border border-white/[0.05] bg-white/[0.02]">
              <p className="font-['Montserrat'] text-[9px] tracking-[0.45em] uppercase text-[#c9a96e] mb-3">Application</p>
              <p className="font-['Montserrat'] text-xs text-white/40 leading-relaxed">
                Apply to pulse points — wrists, neck, behind the ears. Layer over moisturised skin for a deeper, longer-lasting impression. Never rub. Let the accord settle and reveal itself naturally.
              </p>
            </div>
          </div>

          {/* Right — product info card VELUNE style */}
          <div className="reveal-right">
            <div className="relative p-10 overflow-hidden" style={{ background:'#0d0d12', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-48 pointer-events-none"
                style={{ background:'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(201,169,110,0.1) 0%, transparent 80%)' }} />
              <div className="relative z-10 text-center">
                <p className="font-['Montserrat'] text-[9px] tracking-[0.5em] uppercase text-[#c9a96e] mb-6">Signature Fragrance</p>
                <p className="font-light text-5xl text-white mb-1" style={{ fontFamily:'Georgia,serif', letterSpacing:'0.1em' }}>ETHER</p>
                <p className="font-['Montserrat'] text-[9px] tracking-[0.5em] text-white/30 mb-8">ELEMENT</p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[['50 ML','Volume'],['1.7 FL.OZ','US Size'],['₹1,200','MRP']].map(([v,l])=>(
                    <div key={l}>
                      <p className="font-light text-lg text-[#c9a96e]" style={{ fontFamily:'Georgia,serif' }}>{v}</p>
                      <p className="font-['Montserrat'] text-[8px] tracking-[0.3em] uppercase text-white/25">{l}</p>
                    </div>
                  ))}
                </div>

                <div className="w-full h-px mb-8" style={{ background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.3),transparent)' }} />
                <p className="font-['Montserrat'] text-[9px] text-white/25 leading-relaxed">
                  Denat. Alcohol · Parfum · Aqua<br/>
                  Use Before 36 Months from Packaging
                </p>

                <a href="mailto:ether.element03@gmail.com"
                  className="mt-8 inline-block font-['Montserrat'] text-[10px] tracking-[0.35em] uppercase px-8 py-4 bg-[#c9a96e] text-black hover:bg-white transition-colors duration-400">
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
