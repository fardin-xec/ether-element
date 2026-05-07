'use client';
import { useEffect, useRef, useState } from 'react';

const PRODUCTS = [
  { id:1, name:'SHEHENSHAH', sub:'King of Kings',      price:1200, accent:'#c9a96e', notes:['Oud','Black Amber','Vetiver'],     mood:'Bold · Dominant · Eternal',  bg:'rgba(201,169,110,0.15)' },
  { id:2, name:'MOHABBAT',   sub:'Unconditional Love', price:1350, accent:'#d4a0a0', notes:['Rose Taif','Musk','Sandalwood'],  mood:'Romantic · Tender · Dreamy', bg:'rgba(212,160,160,0.15)' },
  { id:3, name:'JALWA',      sub:'The Spectacle',      price:1100, accent:'#9ab4c4', notes:['Sea Salt','Bergamot','Cedar'],    mood:'Fresh · Confident · Sharp',  bg:'rgba(154,180,196,0.15)' },
  { id:4, name:'ISHTIYAQ',   sub:'Burning Desire',     price:1450, accent:'#c4966a', notes:['Saffron','Dark Vanilla','Benzoin'],mood:'Sensual · Warm · Mysterious',bg:'rgba(196,150,106,0.15)' },
  { id:5, name:'PARWAAZ',    sub:'The Flight',         price:999,  accent:'#a8c4a0', notes:['White Tea','Violet','Muslin'],    mood:'Airy · Pure · Serene',       bg:'rgba(168,196,160,0.15)' },
  { id:6, name:'SHAITAAN',   sub:'The Devil',          price:1599, accent:'#9a7ab4', notes:['Smoky Iris','Black Pepper','Leather'],mood:'Dark · Provocative · Raw',bg:'rgba(154,122,180,0.15)' },
];

export default function Collection() {
  useEffect(()=>{
    const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('on');})},{threshold:0.1});
    document.querySelectorAll('.rv,.rvl,.rvr,.rvs').forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="collection" style={{background:'#06060a',padding:'8rem 0',overflow:'hidden'}}>
      {/* Header */}
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 5rem',marginBottom:'5rem'}}>
        <p className="rv d1" style={{fontFamily:'Montserrat',fontSize:'0.58rem',letterSpacing:'0.55em',textTransform:'uppercase',color:'#c9a96e',marginBottom:'0.75rem'}}>The Collection</p>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:'2rem'}}>
          <h2 className="rv d2" style={{fontFamily:'Georgia,serif',fontSize:'clamp(2.5rem,5.5vw,4.5rem)',fontWeight:300,color:'#fff',lineHeight:1.05}}>
            The Accords
          </h2>
          <p className="rv d3" style={{fontFamily:'Montserrat',fontSize:'0.7rem',color:'rgba(255,255,255,0.25)',maxWidth:'200px',textAlign:'right',lineHeight:1.8}}>
            Six fragrances. Six worlds.<br/>Each for a different soul.
          </p>
        </div>
        <div className="rv d4" style={{width:'40px',height:'1px',background:'#c9a96e',marginTop:'1.5rem'}} />
      </div>

      {/* VELUNE-style: horizontal 3-col grid */}
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 5rem',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
        {PRODUCTS.map((p,i)=><Card key={p.id} p={p} i={i}/>)}
      </div>

      {/* Ticker */}
      <div style={{marginTop:'6rem',borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)',padding:'1.25rem 0',overflow:'hidden'}}>
        <div className="ticker">
          {[0,1].map(j=>(
            <span key={j} style={{display:'flex',alignItems:'center'}}>
              {PRODUCTS.map(p=>(
                <span key={p.id} style={{display:'flex',alignItems:'center',gap:'1.5rem',marginRight:'1.5rem'}}>
                  <span style={{fontFamily:'Georgia,serif',fontSize:'2.4rem',fontWeight:300,color:'rgba(255,255,255,0.05)',letterSpacing:'0.08em'}}>{p.name}</span>
                  <span style={{color:'rgba(201,169,110,0.15)',fontSize:'1.5rem'}}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({p,i}){
  const [hov,setHov]=useState(false);
  return(
    <div className={`rv spot-card`} style={{transitionDelay:`${i*0.1}s`}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div className="spot-light"/>
      {/* product area */}
      <div style={{height:'260px',display:'flex',alignItems:'center',justifyContent:'center',
        background:hov?`radial-gradient(ellipse 80% 100% at 50% 0%, ${p.bg} 0%, #0a0a0e 70%)`:'#0a0a0e',
        transition:'background 0.6s ease',position:'relative',overflow:'hidden'}}>
        <div style={{
          transform:hov?'translateY(-6px) scale(1.05)':'translateY(0) scale(1)',
          transition:'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          filter:`drop-shadow(0 0 ${hov?28:10}px ${p.accent}66) drop-shadow(0 20px 40px rgba(0,0,0,0.9))`,
        }}>
          <MiniBottle p={p}/>
        </div>
      </div>
      {/* info */}
      <div style={{padding:'1.5rem',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.75rem'}}>
          <div>
            <h3 style={{fontFamily:'Georgia,serif',fontSize:'1.2rem',fontWeight:300,color:'#fff',letterSpacing:'0.06em',marginBottom:'0.2rem'}}>{p.name}</h3>
            <p style={{fontFamily:'Montserrat',fontSize:'0.55rem',letterSpacing:'0.4em',textTransform:'uppercase',color:p.accent}}>{p.sub}</p>
          </div>
          <p style={{fontFamily:'Georgia,serif',fontSize:'1.1rem',color:p.accent}}>₹{p.price.toLocaleString()}</p>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem',margin:'0.75rem 0'}}>
          {p.notes.map(n=>(
            <span key={n} style={{fontFamily:'Montserrat',fontSize:'0.5rem',letterSpacing:'0.2em',textTransform:'uppercase',
              padding:'4px 10px',border:`1px solid ${p.accent}22`,color:`${p.accent}bb`,background:`${p.accent}08`}}>{n}</span>
          ))}
        </div>
        <p style={{fontFamily:'Montserrat',fontSize:'0.5rem',letterSpacing:'0.25em',color:'rgba(255,255,255,0.18)',marginBottom:'1.25rem'}}>{p.mood}</p>
        <button style={{width:'100%',fontFamily:'Montserrat',fontSize:'0.55rem',letterSpacing:'0.35em',textTransform:'uppercase',
          padding:'11px',border:`1px solid ${hov?p.accent:'rgba(255,255,255,0.08)'}`,
          color:hov?p.accent:'rgba(255,255,255,0.25)',background:hov?`${p.accent}10`:'transparent',
          cursor:'none',transition:'all 0.4s'}}>Inquire</button>
      </div>
      <div style={{height:'1px',background:`linear-gradient(90deg,transparent,${p.accent},transparent)`,opacity:hov?0.5:0,transition:'opacity 0.5s'}}/>
    </div>
  );
}

function MiniBottle({p}){
  return(
    <svg width="70" height="165" viewBox="0 0 90 200" fill="none">
      <defs>
        <linearGradient id={`mc${p.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#090909"/><stop offset="50%" stopColor="#1e1e1e"/><stop offset="100%" stopColor="#090909"/>
        </linearGradient>
        <linearGradient id={`mg${p.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor={p.accent}/><stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id={`ms${p.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="46%" stopColor="rgba(255,255,255,0.04)"/>
          <stop offset="56%" stopColor="rgba(255,255,255,0.14)"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect x="41" y="0" width="8" height="5" rx="1" fill="#111"/>
      <rect x="28" y="6" width="34" height="28" rx="3" fill={`url(#mc${p.id})`}/>
      <rect x="28" y="6" width="34" height="28" rx="3" fill={`url(#ms${p.id})`}/>
      <rect x="24" y="32" width="42" height="5" rx="1.5" fill="#090909"/>
      <rect x="32" y="37" width="26" height="16" fill="#111"/>
      <rect x="14" y="52" width="62" height="132" rx="4" fill={`url(#mc${p.id})`}/>
      <rect x="14" y="52" width="62" height="132" rx="4" fill={`url(#ms${p.id})`}/>
      <rect x="14" y="52" width="62" height="2.5" fill={`url(#mg${p.id})`} opacity="0.8"/>
      <rect x="20" y="66" width="50" height="82" rx="1.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
      <text x="45" y="103" textAnchor="middle" fill="white" fontSize="7" fontFamily="Georgia,serif" letterSpacing="2.5" opacity="0.9">{p.name.slice(0,8)}</text>
      <line x1="26" y1="109" x2="64" y2="109" stroke={p.accent} strokeWidth="0.4" opacity="0.45"/>
      <text x="45" y="118" textAnchor="middle" fill="white" fontSize="3.5" fontFamily="sans-serif" letterSpacing="3" opacity="0.28">ELEMENT</text>
      <rect x="14" y="180" width="62" height="2" fill={`url(#mg${p.id})`} opacity="0.3"/>
      <rect x="14" y="180" width="62" height="5" rx="2" fill="#090909"/>
      <rect x="18" y="55" width="4" height="122" rx="2" fill="rgba(255,255,255,0.035)"/>
    </svg>
  );
}
