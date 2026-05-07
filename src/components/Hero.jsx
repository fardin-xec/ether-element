'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Hero() {
  const curRef  = useRef(null);
  const ringRef = useRef(null);
  const bgRef   = useRef(null);
  const nameRef = useRef(null);
  const [ready, setReady] = useState(false);

  /* ── micro dot cursor + smooth ring ── */
  useEffect(() => {
    const cur = curRef.current, ring = ringRef.current;
    let rx=0,ry=0,mx=0,my=0,raf;
    const mv = (e) => {
      mx=e.clientX; my=e.clientY;
      cur.style.transform=`translate(${mx-4}px,${my-4}px)`;
    };
    const loop = () => {
      rx+=(mx-rx-16)*0.12; ry+=(my-ry-16)*0.12;
      ring.style.transform=`translate(${rx}px,${ry}px)`;
      raf=requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove',mv);
    loop();
    setTimeout(()=>setReady(true),100);
    return ()=>{ window.removeEventListener('mousemove',mv); cancelAnimationFrame(raf); };
  },[]);

  /* ── scroll: image zooms in, brand name scales up & fades ── */
  useEffect(()=>{
    const bg   = bgRef.current;
    const name = nameRef.current;
    const onScroll = () => {
      const pct = Math.min(window.scrollY / window.innerHeight, 1);
      // image zooms from 1.08 → 1.28 as you scroll
      if (bg)   bg.style.transform   = `scale(${1.08 + pct * 0.20})`;
      // brand name scales UP and fades out (just like VELUNE)
      if (name) {
        name.style.transform = `scale(${1 + pct * 0.12}) translateY(${pct * -30}px)`;
        name.style.opacity   = `${1 - pct * 1.6}`;
      }
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);

  /* ── intersection reveals ── */
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('on'); });
    },{threshold:0.12});
    document.querySelectorAll('.rv,.rvl,.rvr,.rvs').forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  },[]);

  return (
    <>
      <div ref={curRef}  className="cur" />
      <div ref={ringRef} className="cur-ring" />

      <section className="hero-wrap">
        {/* ── Deep blue-black radial bg with bottle ── */}
        <div ref={bgRef} className="hero-bg hero-img-anim"
          style={{background:'radial-gradient(ellipse 90% 100% at 50% 38%, #1b2340 0%, #0d0f1c 40%, #06060a 100%)'}}>
          {/* Bottle centered with spotlight */}
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',paddingBottom:'8vh'}}>
            {/* Cone spotlight from top */}
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',
              width:'40vw',height:'70%',
              background:'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(201,169,110,0.18) 0%, transparent 80%)',
              pointerEvents:'none'}} />
            <div className="flt">
              <HeroBottle />
            </div>
          </div>
        </div>

        {/* ── bottom gradient overlay ── */}
        <div style={{position:'absolute',inset:0,pointerEvents:'none',
          background:'linear-gradient(to top, #06060a 0%, rgba(6,6,10,0.4) 35%, transparent 65%)'}} />
        {/* ── side vignette ── */}
        <div style={{position:'absolute',inset:0,pointerEvents:'none',
          background:'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(6,6,10,0.6) 100%)'}} />

        <Navbar />

        {/* ── VELUNE-style: brand name centered, massive, overlay on image ── */}
        <div ref={nameRef} className="brand-name" style={{willChange:'opacity,transform'}}>
          <div style={{textAlign:'center',lineHeight:1}}>
            {/* Letters staggered in */}
            {'ETHER'.split('').map((ch,i)=>(
              <span key={i} className="brand-letter brand-solid"
                style={{animationDelay:`${i*0.08}s`, display:'inline-block',
                  textShadow:'0 0 120px rgba(201,169,110,0.3), 0 4px 60px rgba(0,0,0,0.8)'}}>
                {ch}
              </span>
            ))}
          </div>
          <p style={{fontFamily:'Montserrat,sans-serif',fontSize:'clamp(0.55rem,1.1vw,0.85rem)',
            letterSpacing:'0.55em',color:'rgba(255,255,255,0.35)',marginTop:'1rem',
            animation:'letterIn 1.2s 0.6s cubic-bezier(0.22,1,0.36,1) both'}}>
            — ELEMENT —
          </p>
          {/* Tagline below brand */}
          <p style={{fontFamily:'Montserrat,sans-serif',fontSize:'clamp(0.6rem,0.9vw,0.78rem)',
            letterSpacing:'0.15em',color:'rgba(255,255,255,0.2)',marginTop:'1.5rem',
            maxWidth:'340px',textAlign:'center',lineHeight:1.8,
            animation:'letterIn 1.2s 0.9s cubic-bezier(0.22,1,0.36,1) both'}}>
            Some things are not made to be owned.<br/>They are made to be <em>felt</em>.
          </p>
          {/* CTA */}
          <a href="#collection"
            style={{marginTop:'2.5rem',fontFamily:'Montserrat,sans-serif',
              fontSize:'0.65rem',letterSpacing:'0.38em',textTransform:'uppercase',
              border:'1px solid rgba(201,169,110,0.5)',color:'#c9a96e',
              padding:'14px 36px',display:'inline-block',
              animation:'letterIn 1.2s 1.1s cubic-bezier(0.22,1,0.36,1) both',
              transition:'background 0.4s, color 0.4s',cursor:'none'}}
            onMouseEnter={e=>{e.target.style.background='#c9a96e';e.target.style.color='#000';}}
            onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='#c9a96e';}}>
            Discover ETHER
          </a>
        </div>

        {/* scroll line — right side like VELUNE */}
        <div style={{position:'absolute',bottom:'2rem',right:'2.5rem',display:'flex',
          flexDirection:'column',alignItems:'center',gap:'0.75rem',zIndex:20,
          animation:'letterIn 1.4s 1.4s both'}}>
          <span style={{fontFamily:'Montserrat',fontSize:'0.45rem',letterSpacing:'0.5em',
            textTransform:'uppercase',color:'rgba(255,255,255,0.2)',writingMode:'vertical-lr'}}>Scroll</span>
          <div style={{width:'1px',height:'60px',
            background:'linear-gradient(to bottom,rgba(255,255,255,0.25),transparent)'}} />
        </div>
      </section>
    </>
  );
}

function HeroBottle() {
  return (
    <svg width="190" height="440" viewBox="0 0 160 360" fill="none"
      style={{filter:'drop-shadow(0 0 60px rgba(201,169,110,0.28)) drop-shadow(0 40px 80px rgba(0,0,0,0.95))'}}>
      <defs>
        <linearGradient id="hb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#0e0e0e"/>
          <stop offset="25%"  stopColor="#242424"/>
          <stop offset="50%"  stopColor="#363636"/>
          <stop offset="75%"  stopColor="#242424"/>
          <stop offset="100%" stopColor="#0e0e0e"/>
        </linearGradient>
        <linearGradient id="hc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#080808"/>
          <stop offset="50%"  stopColor="#1e1e1e"/>
          <stop offset="100%" stopColor="#080808"/>
        </linearGradient>
        <linearGradient id="hs" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="transparent"/>
          <stop offset="44%"  stopColor="rgba(255,255,255,0.04)"/>
          <stop offset="56%"  stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="transparent"/>
          <stop offset="50%"  stopColor="#c9a96e"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id="hl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0.02"/>
        </linearGradient>
        <radialGradient id="hsp" cx="50%" cy="5%" r="65%">
          <stop offset="0%"   stopColor="rgba(201,169,110,0.2)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="60" rx="55" ry="100" fill="url(#hsp)" opacity="0.8"/>
      <rect x="76" y="0"   width="8"   height="7"   rx="2"   fill="#1a1a1a"/>
      <rect x="52" y="8"   width="56"  height="56"  rx="4"   fill="url(#hc)"/>
      <rect x="56" y="12"  width="48"  height="48"  rx="2"   fill="url(#hs)"/>
      <rect x="48" y="60"  width="64"  height="8"   rx="2"   fill="#0d0d0d"/>
      <rect x="48" y="60"  width="64"  height="8"   rx="2"   fill="url(#hs)"/>
      <rect x="62" y="68"  width="36"  height="26"           fill="#131313"/>
      <rect x="62" y="68"  width="36"  height="26"           fill="url(#hs)"/>
      <path d="M38 94 L62 94 L62 108 Q80 114 98 108 L98 94 L122 94 L122 112 Q80 124 38 112Z" fill="#131313"/>
      <rect x="28" y="110" width="104" height="216" rx="6"   fill="url(#hb)"/>
      <rect x="28" y="110" width="104" height="216" rx="6"   fill="url(#hs)"/>
      <rect x="28" y="110" width="104" height="3.5"          fill="url(#hg)" opacity="0.8"/>
      <rect x="35" y="140" width="90"  height="136" rx="2"   fill="url(#hl)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
      <text x="80" y="194" textAnchor="middle" fill="white" fontSize="13" fontFamily="Georgia,serif" letterSpacing="5" fontWeight="300" opacity="0.95">ETHER</text>
      <line x1="48" y1="202" x2="112" y2="202" stroke="url(#hg)" strokeWidth="0.6"/>
      <text x="80" y="215" textAnchor="middle" fill="white" fontSize="5.5" fontFamily="sans-serif" letterSpacing="5" opacity="0.38">ELEMENT</text>
      <rect x="42" y="234" width="76" height="0.4" fill="rgba(255,255,255,0.06)"/>
      <text x="80" y="252" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="5" fontFamily="sans-serif" letterSpacing="2">EXPERIENCE THE ETHEREAL</text>
      <rect x="28" y="322" width="104" height="3"            fill="url(#hg)" opacity="0.35"/>
      <rect x="28" y="322" width="104" height="8"   rx="3"   fill="#0a0a0a"/>
      <rect x="34"  y="113" width="6"  height="207" rx="3"   fill="rgba(255,255,255,0.04)"/>
      <rect x="120" y="123" width="3"  height="162" rx="1.5" fill="rgba(255,255,255,0.025)"/>
    </svg>
  );
}
