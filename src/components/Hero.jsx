'use client';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

export default function Hero() {
  const cursorRef   = useRef(null);
  const followerRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const sprayRef    = useRef(null);
  const mouseRef    = useRef({ x: -999, y: -999, moving: false });
  const timerRef    = useRef(null);

  /* ── Custom cursor ── */
  useEffect(() => {
    const cursor   = cursorRef.current;
    const follower = followerRef.current;
    let fx = 0, fy = 0, mx = 0, my = 0, rafId;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      mouseRef.current.moving = true;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { mouseRef.current.moving = false; }, 80);
    };
    const loop = () => {
      fx += (mx - fx - 18) * 0.1;
      fy += (my - fy - 18) * 0.1;
      follower.style.transform = `translate(${fx}px,${fy}px)`;
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    loop();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId); };
  }, []);

  /* ── Background ambient particles ── */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let W, H, raf;
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const makeP = (rand) => ({
      x: W * 0.5 + (Math.random() - 0.5) * 120,
      y: H * 0.52 + (Math.random() - 0.5) * 70,
      vx: (Math.random() - 0.5) * 0.9,
      vy: -(Math.random() * 1.6 + 0.3),
      life: rand ? Math.random() : 1,
      decay: Math.random() * 0.008 + 0.004,
      size: Math.random() * 2.5 + 0.4,
      gold: Math.random() > 0.45,
    });

    const ps = Array.from({ length: 55 }, () => makeP(true));
    const rings = [0, 40, 90].map(r => ({
      r, life: 1 - r / 120, decay: 0.004 + Math.random() * 0.003,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      rings.forEach(ring => {
        ring.r += 0.85; ring.life -= ring.decay;
        if (ring.life <= 0) { ring.r = 0; ring.life = 1; }
        ctx.save(); ctx.globalAlpha = ring.life * 0.07;
        ctx.strokeStyle = '#c9a96e'; ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.arc(W * 0.5, H * 0.52, ring.r, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      });
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy -= 0.014; p.life -= p.decay;
        if (p.life <= 0) Object.assign(p, makeP(false));
        const col = p.gold ? '#c9a96e' : '#ffffff';
        ctx.save(); ctx.globalAlpha = Math.max(0, p.life) * 0.65;
        ctx.shadowBlur = 8; ctx.shadowColor = col; ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  /* ── Cursor spray canvas ── */
  useEffect(() => {
    const canvas = sprayRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let W, H, raf;
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Each drop bursts from the cursor and flies outward */
    class Drop {
      constructor() { this.alive = false; }
      spawn(x, y, vx, vy) {
        this.x    = x; this.y = y;
        this.vx   = vx; this.vy = vy;
        this.life = 1;
        this.decay= Math.random() * 0.04 + 0.025;
        this.size = Math.random() * 3.5 + 1;
        this.gold = Math.random() > 0.4;
        this.trail= [];
        this.alive= true;
      }
      update() {
        if (!this.alive) return;
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 7) this.trail.shift();
        this.vy  += 0.08;        // gravity
        this.vx  *= 0.97;        // air drag
        this.x   += this.vx;
        this.y   += this.vy;
        this.life-= this.decay;
        if (this.life <= 0) this.alive = false;
      }
      draw() {
        if (!this.alive) return;
        const col = this.gold ? '#c9a96e' : '#e8ddd0';
        // trail
        this.trail.forEach((t, i) => {
          ctx.save();
          ctx.globalAlpha = (i / this.trail.length) * this.life * 0.25;
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(t.x, t.y, this.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        // main drop
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life) * 0.9;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = col;
        ctx.fillStyle   = col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * Math.max(0.1, this.life), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    /* Pool of drops */
    const POOL = 120;
    const drops = Array.from({ length: POOL }, () => new Drop());
    let poolIdx  = 0;
    let lastX    = -999, lastY = -999;
    let spawnAcc = 0;

    const spawnBurst = (x, y, dx, dy) => {
      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(Math.floor(speed * 0.6 + 2), 8);
      for (let i = 0; i < count; i++) {
        const drop = drops[poolIdx % POOL];
        poolIdx++;
        // angle: mostly forward (cursor direction) with a cone spread
        const baseAngle = Math.atan2(dy, dx);
        const spread    = (Math.random() - 0.5) * 1.4;   // ±40° cone
        const spd       = Math.random() * 5 + 2;
        drop.spawn(
          x + (Math.random() - 0.5) * 4,
          y + (Math.random() - 0.5) * 4,
          Math.cos(baseAngle + spread) * spd,
          Math.sin(baseAngle + spread) * spd - Math.random() * 1.5,
        );
      }
      // occasional mist puff
      if (Math.random() > 0.65) {
        const puff = drops[poolIdx % POOL];
        poolIdx++;
        puff.spawn(x, y,
          (Math.random() - 0.5) * 2,
          -Math.random() * 1.5,
        );
        puff.size  = Math.random() * 6 + 4;
        puff.decay = 0.015;
        puff.gold  = true;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const m = mouseRef.current;

      if (m.moving && m.x > 0) {
        const dx = m.x - lastX;
        const dy = m.y - lastY;
        spawnAcc += Math.sqrt(dx * dx + dy * dy);
        if (spawnAcc > 6) {
          spawnBurst(m.x, m.y, dx, dy);
          spawnAcc = 0;
        }
        lastX = m.x; lastY = m.y;
      }

      drops.forEach(d => { d.update(); d.draw(); });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* cursor dots */}
      <div ref={cursorRef}   className="cursor" />
      <div ref={followerRef} className="cursor-follower" />

      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 55%, rgba(201,169,110,0.07) 0%, transparent 70%)' }} />
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* bg particles */}
      <canvas ref={bgCanvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

      {/* cursor spray — full screen fixed */}
      <canvas ref={sprayRef}
        className="pointer-events-none"
        style={{ position: 'fixed', inset: 0, zIndex: 9990, width: '100vw', height: '100vh' }} />

      <Navbar />

      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center flex-1 px-8 lg:px-20 pt-28 pb-12 gap-8 lg:gap-16">
        {/* Left text */}
        <div className="flex-1 max-w-lg">
          <p className="op0 animate-fadeInLeft d2 font-montserrat text-[10px] tracking-[0.45em] text-[#c9a96e] uppercase mb-5"
            style={{ animationFillMode: 'forwards' }}>
            Ahmedabad · Gujarat · India
          </p>
          <h1 className="op0 animate-fadeInUp d3 text-[clamp(5rem,11vw,9rem)] leading-[0.88] font-light mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', animationFillMode: 'forwards' }}>
            <span className="shimmer-text">ETHER</span>
          </h1>
          <p className="op0 animate-fadeInUp d4 font-montserrat text-[clamp(0.7rem,1.5vw,1rem)] tracking-[0.38em] text-white/40 mb-8"
            style={{ animationFillMode: 'forwards' }}>— ELEMENT —</p>
          <div className="op0 animate-fadeInUp d5 w-14 h-px mb-7"
            style={{ animationFillMode: 'forwards', background: 'linear-gradient(90deg,#c9a96e,transparent)' }} />
          <p className="op0 animate-fadeInUp d6 font-montserrat text-sm leading-[1.9] text-white/45 mb-10 max-w-sm"
            style={{ animationFillMode: 'forwards' }}>
            A truly exceptional fragrance is not merely worn — it is felt. By you. And by every person whose world you pass through.
          </p>
          <div className="op0 animate-fadeInUp d7 flex items-center gap-6" style={{ animationFillMode: 'forwards' }}>
            <a href="#collection"
              className="group relative font-montserrat text-[11px] tracking-[0.28em] uppercase px-8 py-4 border border-[#c9a96e]/50 text-[#c9a96e] overflow-hidden transition-colors duration-500 hover:text-black">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-[#c9a96e] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
            <span className="font-montserrat text-xs text-white/20 tracking-widest">₹ 1,200</span>
          </div>
        </div>

        {/* Center Bottle */}
        <div className="flex-shrink-0 relative flex items-center justify-center" style={{ width: 260, height: 430 }}>
          {/* glow */}
          <div className="absolute rounded-full animate-glowPulse pointer-events-none"
            style={{ width: 200, height: 200, top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(circle,rgba(201,169,110,0.18),transparent 70%)' }} />
          {/* orbit ring outer */}
          <div className="absolute animate-rotateSlow pointer-events-none"
            style={{ width: 240, height: 240, top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              border: '1px solid rgba(201,169,110,0.1)', borderRadius: '50%' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%,-50%)',
              width: 6, height: 6, borderRadius: '50%', background: '#c9a96e', boxShadow: '0 0 10px #c9a96e' }} />
          </div>
          {/* orbit ring inner */}
          <div className="absolute pointer-events-none"
            style={{ width: 290, height: 290, top: '50%', left: '50%', animationDirection: 'reverse',
              transform: 'translate(-50%,-50%)', border: '0.5px solid rgba(255,255,255,0.04)', borderRadius: '50%',
              animation: 'rotateSlow 40s linear infinite reverse' }}>
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%,50%)',
              width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          </div>

          {/* Bottle */}
          <div className="op0 animate-bottleReveal d4 animate-float relative z-10"
            style={{ animationFillMode: 'forwards' }}>
            <BottleSVG />
          </div>
        </div>

        {/* Right stats */}
        <div className="hidden lg:flex flex-1 max-w-xs flex-col gap-7">
          {[['Volume','50 ML'],['Ingredients','Denat. Alcohol · Parfum · Aqua'],['Longevity','36 Months']].map(([label,val],i)=>(
            <div key={label} className="op0 animate-fadeInUp"
              style={{ animationDelay: `${0.5+i*0.15}s`, animationFillMode: 'forwards' }}>
              <p className="font-montserrat text-[9px] tracking-[0.45em] uppercase text-[#c9a96e] mb-1">{label}</p>
              <p className="text-white/65 text-lg" style={{ fontFamily: 'var(--font-cormorant)' }}>{val}</p>
              <div className="w-8 h-px bg-white/10 mt-2" />
            </div>
          ))}
          <div className="op0 animate-fadeInUp d10" style={{ animationFillMode: 'forwards' }}>
            <p className="font-montserrat text-[9px] tracking-[0.45em] uppercase text-white/25 mb-1">Instagram</p>
            <p className="font-montserrat text-sm text-white/45">@ETHER_ELEMENT</p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 op0 animate-fadeInUp d10"
        style={{ animationFillMode: 'forwards' }}>
        <p className="font-montserrat text-[8px] tracking-[0.5em] uppercase text-white/25">Scroll</p>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.3),transparent)' }} />
      </div>
    </section>
  );
}

function BottleSVG() {
  return (
    <svg width="155" height="350" viewBox="0 0 160 360" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 28px rgba(201,169,110,0.22)) drop-shadow(0 24px 50px rgba(0,0,0,0.9))' }}>
      <defs>
        <linearGradient id="bG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#151515"/>
          <stop offset="28%"  stopColor="#2c2c2c"/>
          <stop offset="50%"  stopColor="#404040"/>
          <stop offset="72%"  stopColor="#2c2c2c"/>
          <stop offset="100%" stopColor="#101010"/>
        </linearGradient>
        <linearGradient id="cG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#090909"/>
          <stop offset="40%"  stopColor="#1e1e1e"/>
          <stop offset="60%"  stopColor="#2a2a2a"/>
          <stop offset="100%" stopColor="#090909"/>
        </linearGradient>
        <linearGradient id="sG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="transparent"/>
          <stop offset="44%"  stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="54%"  stopColor="rgba(255,255,255,0.16)"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id="gL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="transparent"/>
          <stop offset="50%"  stopColor="#c9a96e"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id="lG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <rect x="76" y="0"   width="8"   height="6"   rx="1.5" fill="#1a1a1a"/>
      <rect x="52" y="10"  width="56"  height="58"  rx="4"   fill="url(#cG)"/>
      <rect x="56" y="14"  width="48"  height="50"  rx="2"   fill="url(#sG)"/>
      <rect x="48" y="62"  width="64"  height="8"   rx="2"   fill="#111"/>
      <rect x="48" y="62"  width="64"  height="8"   rx="2"   fill="url(#sG)"/>
      <rect x="62" y="70"  width="36"  height="28"       fill="#181818"/>
      <rect x="62" y="70"  width="36"  height="28"       fill="url(#sG)"/>
      <path d="M40 98 L62 98 L62 112 Q80 116 98 112 L98 98 L120 98 L120 115 Q80 126 40 115 Z" fill="#181818"/>
      <rect x="30" y="113" width="100" height="212" rx="6"   fill="url(#bG)"/>
      <rect x="30" y="113" width="100" height="212" rx="6"   fill="url(#sG)"/>
      <rect x="37" y="142" width="86"  height="132" rx="2"   fill="url(#lG)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
      <rect x="30" y="113" width="100" height="3.5"          fill="url(#gL)" opacity="0.7"/>
      <text x="80" y="192" textAnchor="middle" fill="white" fontSize="13" fontFamily="Georgia,serif" letterSpacing="5" fontWeight="300" opacity="0.92">ETHER</text>
      <line x1="50" y1="200" x2="110" y2="200" stroke="url(#gL)" strokeWidth="0.6"/>
      <text x="80" y="213" textAnchor="middle" fill="white" fontSize="5.5" fontFamily="sans-serif" letterSpacing="4.5" opacity="0.45">ELEMENT</text>
      <rect x="44" y="228" width="72" height="0.4" fill="rgba(255,255,255,0.07)"/>
      <text x="80" y="246" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="sans-serif" letterSpacing="2">EXPERIENCE THE ETHEREAL</text>
      <rect x="44" y="254" width="72" height="0.4" fill="rgba(255,255,255,0.07)"/>
      <rect x="30" y="321" width="100" height="3"            fill="url(#gL)" opacity="0.4"/>
      <rect x="30" y="321" width="100" height="7"   rx="3"   fill="#0c0c0c"/>
      <rect x="35" y="117" width="7"   height="202" rx="3.5" fill="rgba(255,255,255,0.04)"/>
      <rect x="117" y="126" width="4"  height="160" rx="2"   fill="rgba(255,255,255,0.03)"/>
    </svg>
  );
}