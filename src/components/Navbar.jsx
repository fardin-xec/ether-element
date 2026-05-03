'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled?'bg-black/85 backdrop-blur-xl border-b border-white/[0.04]':''}`}>
      <div className="flex items-center justify-between px-8 lg:px-16 py-5">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p style={{fontFamily:'var(--font-cormorant)',letterSpacing:'0.2em'}} className="text-lg leading-none text-white">ETHER</p>
            <p className="font-montserrat text-[8px] tracking-[0.55em] uppercase" style={{color:'#c9a96e'}}>Element</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[['Collection','#collection'],['Story','#story'],['Scent','#scent'],['Contact','#contact']].map(([l,h])=>(
            <a key={l} href={h}
              className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-white/35 hover:text-[#c9a96e] transition-colors duration-300">
              {l}
            </a>
          ))}
        </div>
        <a href="mailto:ether.element03@gmail.com"
          className="hidden md:block font-montserrat text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] border border-[#c9a96e]/30 px-5 py-2.5 hover:bg-[#c9a96e]/10 transition-all duration-300">
          Inquire
        </a>
      </div>
    </nav>
  );
}

function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15"  stroke="#c9a96e" strokeWidth="0.5" opacity="0.6"/>
      <circle cx="16" cy="16" r="9"   stroke="#c9a96e" strokeWidth="0.3" opacity="0.3"/>
      <path d="M8 16h16M16 8v16"      stroke="#c9a96e" strokeWidth="0.5" opacity="0.45"/>
      <path d="M10 10l4 4M18 18l4 4M22 10l-4 4M14 18l-4 4" stroke="#c9a96e" strokeWidth="0.3" opacity="0.3"/>
      <circle cx="16" cy="16" r="2.5" stroke="white"   strokeWidth="0.5"/>
      <circle cx="16" cy="16" r="1"   fill="#c9a96e"/>
    </svg>
  );
}
