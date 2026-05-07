'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60);
    window.addEventListener('scroll',fn);
    return()=>window.removeEventListener('scroll',fn);
  },[]);
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,
      background:scrolled?'rgba(6,6,10,0.85)':'transparent',
      backdropFilter:scrolled?'blur(20px)':'none',
      borderBottom:scrolled?'1px solid rgba(255,255,255,0.04)':'none',
      transition:'all 0.6s ease'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1.25rem 4rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#c9a96e" strokeWidth="0.5" opacity="0.5"/>
            <circle cx="16" cy="16" r="9"  stroke="#c9a96e" strokeWidth="0.3" opacity="0.25"/>
            <path d="M8 16h16M16 8v16" stroke="#c9a96e" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="16" cy="16" r="1" fill="#c9a96e"/>
          </svg>
          <div>
            <p style={{fontFamily:'Georgia,serif',fontSize:'1rem',letterSpacing:'0.25em',color:'#fff',lineHeight:1}}>ETHER</p>
            <p style={{fontFamily:'Montserrat',fontSize:'0.45rem',letterSpacing:'0.6em',color:'#c9a96e',textTransform:'uppercase'}}>Element</p>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'2.5rem'}}>
          {[['Collections','#collection'],['About','#story'],['Journal','#scent']].map(([l,h])=>(
            <a key={l} href={h} style={{fontFamily:'Montserrat',fontSize:'0.58rem',letterSpacing:'0.35em',textTransform:'uppercase',
              color:'rgba(255,255,255,0.35)',textDecoration:'none',transition:'color 0.3s',cursor:'none'}}
              onMouseEnter={e=>e.target.style.color='#fff'}
              onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>
              {l}
            </a>
          ))}
          <span style={{color:'rgba(255,255,255,0.1)',fontSize:'0.7rem'}}>|</span>
          <a href="mailto:ether.element03@gmail.com"
            style={{fontFamily:'Montserrat',fontSize:'0.58rem',letterSpacing:'0.35em',textTransform:'uppercase',
              color:'rgba(255,255,255,0.35)',textDecoration:'none',transition:'color 0.3s',cursor:'none'}}
            onMouseEnter={e=>e.target.style.color='#fff'}
            onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>EN</a>
        </div>
      </div>
    </nav>
  );
}
