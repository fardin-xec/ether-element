'use client';
import { useEffect, useRef, useState } from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: 'SHEHENSHAH',
    sub: 'King of Kings',
    tagline: 'For those who enter a room before they arrive.',
    price: 1200,
    ml: 50,
    accent: '#c9a96e',
    notes: ['Oud', 'Black Amber', 'Vetiver'],
    mood: 'Bold · Dominant · Eternal',
    bottleColor: ['#1a1a1a','#2e2e2e','#111'],
    labelColor: '#c9a96e',
  },
  {
    id: 2,
    name: 'MOHABBAT',
    sub: 'Unconditional Love',
    tagline: 'Soft as a whisper, unforgettable as a dream.',
    price: 1350,
    ml: 50,
    accent: '#d4a0a0',
    notes: ['Rose Taif', 'Musk', 'Sandalwood'],
    mood: 'Romantic · Tender · Dreamy',
    bottleColor: ['#1e1515','#2e1e1e','#120e0e'],
    labelColor: '#d4a0a0',
  },
  {
    id: 3,
    name: 'JALWA',
    sub: 'The Spectacle',
    tagline: 'Walk in. Watch them stare.',
    price: 1100,
    ml: 50,
    accent: '#aac9d4',
    notes: ['Sea Salt', 'Bergamot', 'Cedar'],
    mood: 'Fresh · Confident · Sharp',
    bottleColor: ['#101618','#1a2428','#0a1012'],
    labelColor: '#aac9d4',
  },
  {
    id: 4,
    name: 'ISHTIYAQ',
    sub: 'Burning Desire',
    tagline: 'The scent of longing at 2 AM.',
    price: 1450,
    ml: 50,
    accent: '#c4966a',
    notes: ['Saffron', 'Dark Vanilla', 'Benzoin'],
    mood: 'Sensual · Warm · Mysterious',
    bottleColor: ['#1a1208','#2e2010','#110e08'],
    labelColor: '#c4966a',
  },
  {
    id: 5,
    name: 'PARWAAZ',
    sub: 'The Flight',
    tagline: 'Light enough to forget you\'re wearing it. Until they ask.',
    price: 999,
    ml: 50,
    accent: '#b0c4a8',
    notes: ['White Tea', 'Violet', 'Muslin'],
    mood: 'Airy · Pure · Serene',
    bottleColor: ['#111814','#1a241e','#0c1210'],
    labelColor: '#b0c4a8',
  },
  {
    id: 6,
    name: 'SHAITAAN',
    sub: 'The Devil',
    tagline: 'Darkness has never smelled this divine.',
    price: 1599,
    ml: 50,
    accent: '#8c6c9a',
    notes: ['Smoky Iris', 'Black Pepper', 'Leather'],
    mood: 'Dark · Provocative · Raw',
    bottleColor: ['#120d18','#1e1428','#0d0912'],
    labelColor: '#8c6c9a',
  },
];

export default function Collection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="collection" ref={sectionRef} className="relative bg-black py-28 px-6 lg:px-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{background:'linear-gradient(90deg,transparent,#c9a96e44,transparent)'}} />

      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16 flex items-end justify-between">
        <div>
          <p className={`font-montserrat text-[10px] tracking-[0.5em] uppercase mb-3 transition-all duration-700 ${revealed?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}
            style={{color:'#c9a96e',transitionDelay:'0.1s'}}>
            The Collection
          </p>
          <h2 className={`font-cormorant text-[clamp(2.2rem,5vw,4rem)] font-light text-white leading-tight transition-all duration-700 ${revealed?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}
            style={{fontFamily:'var(--font-cormorant)',transitionDelay:'0.2s'}}>
            Six Accords.<br/>One Universe.
          </h2>
        </div>
        <p className={`hidden lg:block font-montserrat text-xs text-white/25 max-w-[200px] text-right leading-relaxed transition-all duration-700 ${revealed?'opacity-100':'opacity-0'}`}
          style={{transitionDelay:'0.35s'}}>
          Each fragrance is a world of its own — crafted for a different soul.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} revealed={revealed}
            isActive={active===p.id} onHover={setActive} />
        ))}
      </div>

      {/* Ticker */}
      <div className="mt-20 overflow-hidden border-t border-b border-white/5 py-4">
        <div className="ticker-wrap">
          {[...Array(2)].map((_,j)=>(
            <span key={j} className="flex">
              {PRODUCTS.map(p=>(
                <span key={p.id} className="font-cormorant text-[2.5rem] font-light mx-8 whitespace-nowrap"
                  style={{color:'rgba(255,255,255,0.06)',fontFamily:'var(--font-cormorant)'}}>
                  {p.name} <span style={{color:'rgba(201,169,110,0.12)'}}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product: p, index, revealed, isActive, onHover }) {
  const delay = `${0.1 + index * 0.1}s`;
  return (
    <div
      onMouseEnter={() => onHover(p.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative cursor-none overflow-hidden transition-all duration-500"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
        transition: `opacity 0.7s ease ${delay}, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}`,
        background: '#0d0d0d',
        border: `1px solid ${isActive ? p.accent+'55' : 'rgba(255,255,255,0.05)'}`,
      }}>

      {/* Top card content */}
      <div className="p-6 pb-4">
        {/* Bottle preview */}
        <div className="flex justify-center mb-6 relative" style={{height:200}}>
          {/* Glow */}
          <div className="absolute inset-0 rounded-full transition-opacity duration-700"
            style={{
              background:`radial-gradient(circle at 50% 60%, ${p.accent}22 0%, transparent 70%)`,
              opacity: isActive ? 1 : 0.4,
            }} />
          <MiniBottle p={p} active={isActive} />
        </div>

        {/* Name */}
        <div className="mb-3">
          <h3 className="font-cormorant text-3xl font-light text-white leading-none mb-1"
            style={{fontFamily:'var(--font-cormorant)',letterSpacing:'0.08em'}}>
            {p.name}
          </h3>
          <p className="font-montserrat text-[9px] tracking-[0.4em] uppercase" style={{color:p.accent}}>{p.sub}</p>
        </div>

        <p className="font-montserrat text-xs text-white/35 leading-relaxed mb-4 italic">"{p.tagline}"</p>

        {/* Notes */}
        <div className="flex gap-2 flex-wrap mb-4">
          {p.notes.map(n=>(
            <span key={n} className="font-montserrat text-[9px] tracking-[0.2em] uppercase px-2 py-1 border"
              style={{color:p.accent+'cc',borderColor:p.accent+'22',background:p.accent+'0a'}}>
              {n}
            </span>
          ))}
        </div>

        <p className="font-montserrat text-[9px] tracking-[0.25em] text-white/20">{p.mood}</p>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
        <div>
          <p className="font-cormorant text-xl text-white" style={{fontFamily:'var(--font-cormorant)',color:p.accent}}>
            ₹ {p.price.toLocaleString()}
          </p>
          <p className="font-montserrat text-[8px] text-white/20 tracking-widest">{p.ml} ML · EAU DE PARFUM</p>
        </div>
        <button className="font-montserrat text-[9px] tracking-[0.3em] uppercase px-4 py-2.5 transition-all duration-400"
          style={{
            background: isActive ? p.accent : 'transparent',
            color: isActive ? '#000' : p.accent,
            border: `1px solid ${p.accent}55`,
          }}>
          Inquire
        </button>
      </div>

      {/* Hover reveal bar */}
      <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
        style={{background:`linear-gradient(90deg,transparent,${p.accent},transparent)`,width:isActive?'100%':'0%'}} />
    </div>
  );
}

function MiniBottle({ p, active }) {
  const [bc1, bc2, bc3] = p.bottleColor;
  return (
    <svg width="80" height="180" viewBox="0 0 100 220" fill="none"
      style={{
        filter:`drop-shadow(0 0 ${active?20:8}px ${p.accent}55) drop-shadow(0 12px 24px rgba(0,0,0,0.8))`,
        transition:'filter 0.5s ease',
        transform: active ? 'scale(1.05)' : 'scale(1)',
        transitionProperty:'transform,filter',
        transitionDuration:'0.5s',
      }}>
      <defs>
        <linearGradient id={`mb${p.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={bc3}/>
          <stop offset="35%"  stopColor={bc2}/>
          <stop offset="50%"  stopColor={bc1}/>
          <stop offset="65%"  stopColor={bc2}/>
          <stop offset="100%" stopColor={bc3}/>
        </linearGradient>
        <linearGradient id={`mgs${p.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="transparent"/>
          <stop offset="50%"  stopColor={p.accent}/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id={`msh${p.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="transparent"/>
          <stop offset="48%"  stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="54%"  stopColor="rgba(255,255,255,0.15)"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      {/* nozzle */}
      <rect x="46" y="1" width="8" height="5" rx="1" fill="#1a1a1a"/>
      {/* cap */}
      <rect x="34" y="8" width="32" height="32" rx="3" fill={bc2}/>
      <rect x="34" y="8" width="32" height="32" rx="3" fill={`url(#msh${p.id})`}/>
      <rect x="30" y="37" width="40" height="6" rx="2" fill={bc3}/>
      {/* neck */}
      <rect x="38" y="43" width="24" height="18" fill={bc2}/>
      {/* body */}
      <rect x="20" y="60" width="60" height="130" rx="4" fill={`url(#mb${p.id})`}/>
      <rect x="20" y="60" width="60" height="130" rx="4" fill={`url(#msh${p.id})`}/>
      {/* gold stripe */}
      <rect x="20" y="60" width="60" height="2.5" fill={`url(#mgs${p.id})`} opacity="0.7"/>
      <rect x="20" y="187" width="60" height="2" fill={`url(#mgs${p.id})`} opacity="0.35"/>
      {/* label */}
      <rect x="26" y="78" width="48" height="80" rx="1.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
      <text x="50" y="114" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="Georgia,serif" letterSpacing="3" opacity="0.9">{p.name}</text>
      <line x1="32" y1="120" x2="68" y2="120" stroke={p.accent} strokeWidth="0.5" opacity="0.5"/>
      <text x="50" y="130" textAnchor="middle" fill="white" fontSize="3.5" fontFamily="sans-serif" letterSpacing="3" opacity="0.35">ELEMENT</text>
      {/* base */}
      <rect x="20" y="187" width="60" height="5" rx="2" fill={bc3}/>
      {/* highlight */}
      <rect x="24" y="63" width="5" height="122" rx="2.5" fill="rgba(255,255,255,0.04)"/>
    </svg>
  );
}
