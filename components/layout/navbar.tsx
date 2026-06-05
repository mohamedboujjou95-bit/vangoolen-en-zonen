"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, PHONE_NUMBER, PHONE_HREF, EMERGENCY_LABEL } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:50,transition:"all 0.3s",background:scrolled?"rgba(14,31,66,0.98)":"transparent",backdropFilter:scrolled?"blur(10px)":"none",borderBottom:scrolled?"1px solid rgba(197,160,89,0.15)":"none",padding:scrolled?"0.5rem 0":"1rem 0"}}>
        <div className="container-vg">
          <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"52px"}}>
            <Link href="/" style={{display:"flex",alignItems:"center",gap:"0.75rem",textDecoration:"none"}} onClick={() => setIsOpen(false)}>
              <div style={{width:"2.5rem",height:"2.5rem",borderRadius:"50%",border:"2px solid #C5A059",background:"#163162",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontFamily:"var(--font-display)",fontWeight:700,color:"#C5A059",fontSize:"0.8125rem"}}>VG</span>
              </div>
              <div style={{lineHeight:1}}>
                <span style={{display:"block",fontFamily:"var(--font-display)",fontWeight:700,color:"#FDFAF6",fontSize:"1rem",letterSpacing:"-0.01em"}}>Van Goolen &amp; Zonen</span>
                <span style={{display:"block",fontSize:"0.6rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"#C5A059",marginTop:"0.25rem"}}>Algemeene Loodgieters Gilde</span>
              </div>
            </Link>

            <ul style={{display:"flex",alignItems:"center",gap:"0.25rem",listStyle:"none",margin:0,padding:0}} className="hidden lg:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{padding:"0.375rem 0.875rem",borderRadius:"0.375rem",fontSize:"0.875rem",fontWeight:500,color:"rgba(253,250,246,0.85)",textDecoration:"none",display:"block",transition:"all 0.15s"}}
                    onMouseEnter={e=>(e.currentTarget.style.color="#C5A059")}
                    onMouseLeave={e=>(e.currentTarget.style.color="rgba(253,250,246,0.85)")}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}} className="hidden lg:flex">
              <a href={PHONE_HREF} style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#FDFAF6",fontSize:"0.875rem",fontWeight:500,textDecoration:"none"}}>
                <Phone style={{height:"1rem",width:"1rem",color:"#C5A059"}} />{PHONE_NUMBER}
              </a>
              <Link href="/boeking" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",height:"2.5rem",padding:"0 1.25rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"0.875rem",textDecoration:"none"}}>
                Direct Boeken <ChevronRight style={{height:"1rem",width:"1rem"}} />
              </Link>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}} className="flex lg:hidden">
              <a href={PHONE_HREF} style={{display:"flex",alignItems:"center",gap:"0.375rem",color:"#FDFAF6",fontSize:"0.8125rem",fontWeight:600,textDecoration:"none",background:"rgba(197,160,89,0.15)",border:"1px solid rgba(197,160,89,0.3)",borderRadius:"0.375rem",padding:"0.375rem 0.75rem"}}>
                <Phone style={{height:"0.875rem",width:"0.875rem",color:"#C5A059"}} />
                <span className="hidden sm:inline">Bel Nu</span>
              </a>
              <button onClick={() => setIsOpen(!isOpen)} style={{width:"2.25rem",height:"2.25rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"0.375rem",background:"transparent",border:"none",color:"#FDFAF6",cursor:"pointer"}}>
                {isOpen ? <X style={{height:"1.25rem",width:"1.25rem"}} /> : <Menu style={{height:"1.25rem",width:"1.25rem"}} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {isOpen && (
        <div style={{position:"fixed",inset:0,zIndex:40}} className="lg:hidden">
          <div style={{position:"absolute",inset:0,background:"rgba(14,31,66,0.6)",backdropFilter:"blur(4px)"}} onClick={() => setIsOpen(false)} />
          <div style={{position:"absolute",top:0,right:0,bottom:0,width:"320px",maxWidth:"90vw",background:"#0e1f42",borderLeft:"1px solid rgba(197,160,89,0.2)",display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.25rem",borderBottom:"1px solid rgba(197,160,89,0.15)"}}>
              <div>
                <p style={{fontFamily:"var(--font-display)",fontWeight:700,color:"#FDFAF6",fontSize:"1rem"}}>Van Goolen &amp; Zonen</p>
                <p style={{fontSize:"0.6rem",letterSpacing:"0.16em",textTransform:"uppercase",color:"#C5A059",marginTop:"0.25rem"}}>Algemeene Loodgieters Gilde</p>
              </div>
              <button onClick={() => setIsOpen(false)} style={{width:"2rem",height:"2rem",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",border:"none",color:"rgba(253,250,246,0.6)",cursor:"pointer"}}>
                <X style={{height:"1rem",width:"1rem"}} />
              </button>
            </div>
            <nav style={{flex:1,padding:"1.25rem",overflowY:"auto"}}>
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                  style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.75rem 1rem",borderRadius:"0.375rem",color:"rgba(253,250,246,0.8)",textDecoration:"none",fontSize:"0.875rem",fontWeight:500,marginBottom:"0.25rem"}}>
                  {item.label} <ChevronRight style={{height:"1rem",width:"1rem",opacity:0.4}} />
                </Link>
              ))}
            </nav>
            <div style={{padding:"1.25rem",borderTop:"1px solid rgba(197,160,89,0.15)",display:"flex",flexDirection:"column",gap:"0.75rem"}}>
              <Link href="/boeking" onClick={() => setIsOpen(false)} style={{width:"100%",display:"inline-flex",alignItems:"center",justifyContent:"center",height:"3rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,textDecoration:"none",fontSize:"1rem"}}>
                Direct Boeken
              </Link>
              <a href={PHONE_HREF} style={{width:"100%",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"3rem",borderRadius:"0.375rem",background:"transparent",color:"#FDFAF6",fontWeight:600,textDecoration:"none",fontSize:"1rem",border:"2px solid rgba(255,255,255,0.3)"}}>
                <Phone style={{height:"1rem",width:"1rem"}} />{PHONE_NUMBER}
              </a>
              <p style={{textAlign:"center",fontSize:"0.65rem",color:"rgba(197,160,89,0.6)",letterSpacing:"0.15em",textTransform:"uppercase"}}>{EMERGENCY_LABEL} · 365 Dagen Per Jaar</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
