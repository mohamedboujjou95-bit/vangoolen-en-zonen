"use client";
import React from "react";
import Link from "next/link";
import { Phone, ChevronRight, Clock, ShieldCheck, Star } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/data";

export function HeroSection() {
  return (
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",background:"linear-gradient(160deg, #0e1f42 0%, #1a3a6b 55%, #163162 100%)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(197,160,89,0.03) 60px, rgba(197,160,89,0.03) 61px)",pointerEvents:"none"}} />
      <div style={{position:"absolute",top:0,right:0,width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(ellipse at 80% 20%, rgba(197,160,89,0.07) 0%, transparent 65%)",pointerEvents:"none"}} />
      <div className="container-vg" style={{position:"relative",zIndex:1,paddingTop:"7rem",paddingBottom:"5rem"}}>
        <div style={{maxWidth:"750px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.5rem"}}>
            <span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}} />
            <span style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:"#C5A059"}}>Algemeene Loodgieters Gilde — Gecertificeerd Vakmanschap</span>
            <span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}} />
          </div>
          <h1 className="font-display font-bold" style={{fontSize:"clamp(2.4rem,5vw,3.6rem)",color:"#FDFAF6",lineHeight:1.08,letterSpacing:"-0.02em",marginBottom:"1.5rem"}}>
            Binnen{" "}
            <span style={{background:"linear-gradient(135deg, #C5A059 0%, #E8D5A3 50%, #C5A059 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>2 uur</span>
            {" "}een gecertificeerde<br />gilde-loodgieter aan de deur.
          </h1>
          <p style={{fontSize:"1.125rem",color:"rgba(253,250,246,0.75)",lineHeight:1.65,marginBottom:"2rem",maxWidth:"520px"}}>
            Vaste gildetarieven, geen verrassingen achteraf. Lekkages, rioolverstopping, cv-storing — wij lossen het definitief op bij het eerste bezoek.
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"1.25rem",marginBottom:"2.5rem"}}>
            {[{icon:ShieldCheck,text:"100% Transparante Tarieven"},{icon:Clock,text:"Geen Toeslag Avond & Weekend"},{icon:Star,text:"4.8 / 5 Klantbeoordeling"}].map(({icon:Icon,text})=>(
              <div key={text} style={{display:"flex",alignItems:"center",gap:"0.375rem",fontSize:"0.8125rem",color:"rgba(253,250,246,0.65)"}}>
                <Icon style={{height:"0.875rem",width:"0.875rem",color:"#C5A059",flexShrink:0}} />{text}
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.75rem"}}>
            <Link href="/boeking" style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",height:"3.5rem",padding:"0 2.25rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"1rem",textDecoration:"none"}}>
              Direct Gilde-Loodgieter Boeken <ChevronRight style={{height:"1.25rem",width:"1.25rem"}} />
            </Link>
            <a href={PHONE_HREF} style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",height:"3.5rem",padding:"0 2.25rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"1rem",textDecoration:"none",border:"1px solid #C5A059"}}>
              <Phone style={{height:"1.25rem",width:"1.25rem"}} /> {PHONE_NUMBER}
            </a>
          </div>
          <p style={{marginTop:"1.25rem",fontSize:"0.75rem",color:"rgba(253,250,246,0.4)"}}>
            Boek online in 2 minuten · Geen aanbetaling vereist · Afrekening aan de deur
          </p>
        </div>
      </div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,overflow:"hidden",lineHeight:0}}>
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"56px",display:"block"}} preserveAspectRatio="none">
          <path d="M0 56L48 48C96 40 192 24 288 18.7C384 13.3 480 18.7 576 26.7C672 34.7 768 45.3 864 45.3C960 45.3 1056 34.7 1152 29.3C1248 24 1344 24 1392 24L1440 24V56H0V56Z" fill="#FDFAF6"/>
        </svg>
      </div>
    </section>
  );
}
