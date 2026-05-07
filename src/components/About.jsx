'use client';
import { useEffect } from 'react';

export default function About() {
  useEffect(()=>{
    const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('on');})},{threshold:0.1});
    document.querySelectorAll('.rv,.rvl,.rvr,.rvs').forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  return (<>
    {/* ── "A collection born from silence" — VELUNE split section ── */}
    <section id="story" style={{background:'#07070c',padding:'10rem 0',overflow:'hidden'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 5rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8rem',alignItems:'center'}}>
        {/* Left — moody product image placeholder with glow bottle */}
        <div className="rvl" style={{position:'relative',height:'520px',background:'#0d0d14',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',
            width:'100%',height:'100%',
            background:'radial-gradient(ellipse 70% 80% at 50% 10%, rgba(201,169,110,0.14) 0%, transparent 70%)',
            pointerEvents:'none'}}/>
          <div className="flt">
            <LargeBottle/>
          </div>
          {/* label overlay */}
          <div style={{position:'absolute',bottom:'2rem',left:'2rem'}}>
            <p style={{fontFamily:'Montserrat',fontSize:'0.5rem',letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'0.4rem'}}>Signature</p>
            <p style={{fontFamily:'Georgia,serif',fontSize:'1.2rem',color:'rgba(255,255,255,0.5)',letterSpacing:'0.1em'}}>ETHER</p>
          </div>
        </div>
        {/* Right — italic heading like VELUNE */}
        <div className="rvr">
          <p style={{fontFamily:'Montserrat',fontSize:'0.55rem',letterSpacing:'0.55em',textTransform:'uppercase',color:'#c9a96e',marginBottom:'2rem'}}>Ether Element · Est. 2024</p>
          <h2 style={{fontFamily:'Georgia,serif',fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:300,color:'#fff',lineHeight:1.2,fontStyle:'italic',marginBottom:'2rem'}}>
            A collection<br/><em style={{color:'rgba(255,255,255,0.5)'}}>born from silence.</em>
          </h2>
          <div style={{width:'40px',height:'1px',background:'#c9a96e',marginBottom:'2rem'}}/>
          <p style={{fontFamily:'Montserrat',fontSize:'0.72rem',color:'rgba(255,255,255,0.35)',lineHeight:2,marginBottom:'2.5rem',maxWidth:'340px'}}>
            At Ether Element, we believe a truly exceptional fragrance is not merely worn — it is felt. By you. And by every person whose world you pass through.
          </p>
          <a href="#collection" style={{fontFamily:'Montserrat',fontSize:'0.6rem',letterSpacing:'0.35em',textTransform:'uppercase',
            border:'1px solid rgba(201,169,110,0.45)',color:'#c9a96e',padding:'13px 32px',display:'inline-block',
            cursor:'none',transition:'all 0.4s'}}
            onMouseEnter={e=>{e.target.style.background='#c9a96e';e.target.style.color='#000';}}
            onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='#c9a96e';}}>
            Discover the Pieces →
          </a>
        </div>
      </div>
    </section>

    {/* ── Moody quote section ── */}
    <section className="qbg" style={{padding:'10rem 5rem',display:'flex',alignItems:'center',justifyContent:'center',minHeight:'55vh',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'700px',textAlign:'center',position:'relative',zIndex:1}}>
        <p className="rv d1" style={{fontFamily:'Montserrat',fontSize:'0.55rem',letterSpacing:'0.55em',textTransform:'uppercase',color:'#c9a96e',marginBottom:'2.5rem'}}>Ether Element · Ahmedabad · India</p>
        <blockquote className="rv d2" style={{fontFamily:'Georgia,serif',fontStyle:'italic',fontSize:'clamp(1.5rem,3.5vw,2.6rem)',fontWeight:300,color:'#fff',lineHeight:1.35}}>
          "We don't make perfume.{' '}
          <span style={{color:'rgba(255,255,255,0.4)'}}>We make your presence."</span>
        </blockquote>
        <div className="rv d3" style={{width:'48px',height:'1px',background:'#c9a96e',margin:'2.5rem auto 0'}}/>
      </div>
    </section>

    {/* ── Ateliers grid — VELUNE style ── */}
    <section style={{background:'#06060a',padding:'8rem 0'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 5rem'}}>
        <div style={{marginBottom:'4rem'}}>
          <p className="rv d1" style={{fontFamily:'Montserrat',fontSize:'0.55rem',letterSpacing:'0.55em',textTransform:'uppercase',color:'#c9a96e',marginBottom:'0.75rem'}}>The Philosophy</p>
          <h2 className="rv d2" style={{fontFamily:'Georgia,serif',fontSize:'clamp(2rem,4.5vw,3.8rem)',fontWeight:300,color:'#fff'}}>The Ateliers</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0.75rem'}}>
          {[
            {n:'01',t:'Deliberate',d:'Every accord built with intention.',span:'span 2',h:'320px'},
            {n:'02',t:'Layered',d:'Depth that unfolds from first spritz.',span:'span 1',h:'320px'},
            {n:'03',t:'Refined',d:'Lingers on skin for hours.',span:'span 1',h:'320px'},
            {n:'04',t:'Eternal',d:'Between the darkest hour and the softest morning.',span:'span 2',h:'200px'},
            {n:'05',t:'Felt',d:'The finest things felt before they are seen.',span:'span 2',h:'200px'},
          ].map((item,i)=>(
            <div key={item.n} className="rv rvs" style={{gridColumn:item.span,height:item.h,transitionDelay:`${i*0.1}s`,
              background:'#0e0e14',border:'1px solid rgba(255,255,255,0.04)',
              padding:'2rem',display:'flex',flexDirection:'column',justifyContent:'flex-end',
              position:'relative',overflow:'hidden',cursor:'none'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,169,110,0.2)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.04)';}}>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)',opacity:0,transition:'opacity 0.5s',pointerEvents:'none'}}
                className="atelier-glow"/>
              <span style={{fontFamily:'Montserrat',fontSize:'0.5rem',letterSpacing:'0.4em',color:'rgba(201,169,110,0.4)',marginBottom:'0.75rem'}}>{item.n}</span>
              <h3 style={{fontFamily:'Georgia,serif',fontSize:'1.6rem',fontWeight:300,color:'#fff',marginBottom:'0.5rem'}}>{item.t}</h3>
              <p style={{fontFamily:'Montserrat',fontSize:'0.65rem',color:'rgba(255,255,255,0.22)',lineHeight:1.7}}>{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>);
}

function LargeBottle() {
  return (
    <svg width="120" height="280" viewBox="0 0 160 360" fill="none"
      style={{filter:'drop-shadow(0 0 40px rgba(201,169,110,0.2)) drop-shadow(0 30px 60px rgba(0,0,0,0.9))'}}>
      <defs>
        <linearGradient id="lb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#101010"/><stop offset="50%" stopColor="#282828"/><stop offset="100%" stopColor="#101010"/>
        </linearGradient>
        <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#c9a96e"/><stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id="ls" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="48%" stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="55%" stopColor="rgba(255,255,255,0.17)"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect x="76" y="0"   width="8"   height="7"   rx="2"   fill="#1a1a1a"/>
      <rect x="52" y="8"   width="56"  height="56"  rx="4"   fill="url(#lb)"/>
      <rect x="52" y="8"   width="56"  height="56"  rx="4"   fill="url(#ls)"/>
      <rect x="48" y="60"  width="64"  height="8"   rx="2"   fill="#0d0d0d"/>
      <rect x="62" y="68"  width="36"  height="26"           fill="#141414"/>
      <rect x="62" y="68"  width="36"  height="26"           fill="url(#ls)"/>
      <path d="M38 94L62 94L62 108Q80 114 98 108L98 94L122 94L122 112Q80 124 38 112Z" fill="#141414"/>
      <rect x="28" y="110" width="104" height="216" rx="6"   fill="url(#lb)"/>
      <rect x="28" y="110" width="104" height="216" rx="6"   fill="url(#ls)"/>
      <rect x="28" y="110" width="104" height="3"            fill="url(#lg2)" opacity="0.7"/>
      <rect x="35" y="140" width="90"  height="136" rx="2"   fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
      <text x="80" y="194" textAnchor="middle" fill="white" fontSize="13" fontFamily="Georgia,serif" letterSpacing="5" opacity="0.9">ETHER</text>
      <line x1="48" y1="202" x2="112" y2="202" stroke="url(#lg2)" strokeWidth="0.6"/>
      <text x="80" y="214" textAnchor="middle" fill="white" fontSize="5" fontFamily="sans-serif" letterSpacing="4.5" opacity="0.35">ELEMENT</text>
      <rect x="28" y="322" width="104" height="8" rx="3" fill="#0a0a0a"/>
      <rect x="34" y="113" width="6" height="207" rx="3" fill="rgba(255,255,255,0.04)"/>
    </svg>
  );
}
