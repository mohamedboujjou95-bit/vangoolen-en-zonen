import React from "react";
import { Clock, ShieldCheck, Award } from "lucide-react";
import { GILDE_BELOFTEN, STATS } from "@/lib/data";

type GildeIconName = "Clock" | "ShieldCheck" | "Award";
const ICON_MAP: Record<GildeIconName, React.ElementType> = { Clock, ShieldCheck, Award };

export function GildeBeloftenSection() {
  return (
    <section style={{background:"#FDFAF6",padding:"3rem 0"}}>
      <div className="container-vg">
        <div style={{textAlign:"center",maxWidth:"540px",margin:"0 auto 2.5rem"}}>
          <span className="overline mb-3">Onze Garanties</span>
          <h2 className="font-display font-bold" style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",color:"#0e1f42",marginTop:"0.75rem"}}>De Drie Gilde-Beloften</h2>
          <div className="gold-rule-center" />
          <p style={{color:"#6e6257",marginTop:"1rem",fontSize:"0.9375rem",lineHeight:1.65}}>Het fundament van Van Goolen & Zonen is gebouwd op drie onwrikbare principes.</p>
        </div>

        {/* Beloften cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {GILDE_BELOFTEN.map((belofte) => {
            const Icon = ICON_MAP[belofte.iconName as GildeIconName] ?? ShieldCheck;
            return (
              <div key={belofte.number} className="card-heritage" style={{padding:"1.5rem",textAlign:"center"}}>
                <div style={{width:"3rem",height:"3rem",borderRadius:"50%",border:"2px solid #C5A059",background:"#0e1f42",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem",fontFamily:"var(--font-display)",fontWeight:700,fontSize:"1.125rem",color:"#C5A059"}}>
                  {belofte.number}
                </div>
                <h3 className="font-display font-bold" style={{fontSize:"1.125rem",color:"#0e1f42",marginBottom:"0.625rem"}}>{belofte.title}</h3>
                <p style={{fontSize:"0.875rem",color:"#6e6257",lineHeight:1.65}}>{belofte.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"0.75rem"}}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{background:"#0e1f42",borderRadius:"0.625rem",padding:"1.25rem",textAlign:"center",border:"1px solid rgba(197,160,89,0.15)"}}>
              <p className="font-display font-bold" style={{fontSize:"clamp(1.4rem,3vw,1.9rem)",color:"#C5A059"}}>{stat.value}</p>
              <p style={{fontSize:"0.7rem",color:"rgba(253,250,246,0.55)",textTransform:"uppercase",letterSpacing:"0.12em",marginTop:"0.25rem"}}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
