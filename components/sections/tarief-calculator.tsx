"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Droplets, Waves, Flame, ChevronRight, Info } from "lucide-react";
import { GILDE_TARIEVEN } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { ServiceId } from "@/types";
const SERVICE_ICONS: Record<ServiceId, React.ElementType> = { lekkage: Droplets, verstopping: Waves, "cv-storing": Flame };
export function TariefCalculatorSection() {
  const [selected, setSelected] = useState<ServiceId>("lekkage");
  const [extraMinutes, setExtraMinutes] = useState<number>(0);
  const tarief = GILDE_TARIEVEN.find((t) => t.serviceId === selected)!;
  const extraBlocks = Math.ceil(extraMinutes / 15);
  const totalPrice = tarief.vastTarief + extraBlocks * tarief.vervolgtarief;
  return (
    <section id="tarieven" style={{background:"#0e1f42",padding:"5rem 0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 20% 50%, rgba(197,160,89,0.05) 0%, transparent 70%)",pointerEvents:"none"}} />
      <div className="container-vg" style={{position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",maxWidth:"540px",margin:"0 auto 3rem"}}>
          <span className="overline" style={{color:"rgba(197,160,89,0.9)"}}>Volledige Transparantie</span>
          <h2 className="font-display font-bold" style={{fontSize:"clamp(1.75rem,3vw,2.4rem)",color:"#FDFAF6",marginTop:"0.75rem"}}>Vaste Gildetarieven</h2>
          <div style={{width:"4rem",height:"3px",background:"#C5A059",borderRadius:"999px",margin:"1rem auto"}} />
          <p style={{color:"rgba(253,250,246,0.7)",fontSize:"0.9rem",lineHeight:1.6}}>Bereken direct wat uw reparatie kost. Geen vage schattingen — u weet het vooraf.</p>
        </div>
        <div style={{maxWidth:"720px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.75rem",marginBottom:"1.5rem"}}>
            {GILDE_TARIEVEN.map((t) => {
              const Icon = SERVICE_ICONS[t.serviceId];
              const isActive = selected === t.serviceId;
              return (
                <button key={t.serviceId} onClick={() => { setSelected(t.serviceId); setExtraMinutes(0); }}
                  style={{padding:"1.25rem 1rem",borderRadius:"0.625rem",border:`2px solid ${isActive?"#C5A059":"rgba(255,255,255,0.15)"}`,background:isActive?"#C5A059":"rgba(255,255,255,0.05)",cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
                  <Icon style={{height:"1.75rem",width:"1.75rem",color:isActive?"#1a3a6b":"#C5A059",margin:"0 auto 0.5rem"}} />
                  <span style={{display:"block",fontSize:"0.8rem",fontWeight:600,color:isActive?"#1a3a6b":"#FDFAF6",lineHeight:1.3}}>{t.service}</span>
                  <span style={{display:"block",fontSize:"1.25rem",fontWeight:700,color:isActive?"#1a3a6b":"#C5A059",marginTop:"0.25rem",fontFamily:"var(--font-display)"}}>{formatPrice(t.vastTarief)}</span>
                </button>);
            })}
          </div>
          <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"0.75rem",padding:"2rem"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
              <div style={{flex:1}}>
                <h3 className="font-display font-bold" style={{color:"#FDFAF6",fontSize:"1.25rem",marginBottom:"1.25rem"}}>{tarief.service}</h3>
                <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
                  {[
                    {label:"Vast gildetarief (incl. eerste 30 min)",val:formatPrice(tarief.vastTarief),highlight:true},
                    {label:"Vervolgtarief (per 15 min)",val:formatPrice(tarief.vervolgtarief),highlight:false},
                    ...(extraBlocks>0?[{label:`Extra werk (${extraMinutes} min)`,val:formatPrice(extraBlocks*tarief.vervolgtarief),highlight:false}]:[]),
                  ].map((row,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.75rem 0",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
                      <span style={{fontSize:"0.875rem",color:"rgba(253,250,246,0.8)"}}>{row.label}</span>
                      <span style={{fontWeight:700,color:row.highlight?"#C5A059":"#FDFAF6",fontSize:row.highlight?"1.1rem":"1rem"}}>{row.val}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"1rem"}}>
                    <span style={{fontWeight:600,color:"#FDFAF6",fontSize:"1rem"}}>Totaal geschat</span>
                    <span className="font-display font-bold" style={{color:"#C5A059",fontSize:"1.75rem"}}>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",padding:"0.75rem",background:"rgba(197,160,89,0.12)",borderRadius:"0.5rem",border:"1px solid rgba(197,160,89,0.25)",marginTop:"1rem"}}>
                  <Info style={{height:"1rem",width:"1rem",color:"#C5A059",flexShrink:0,marginTop:"0.1rem"}} />
                  <p style={{fontSize:"0.75rem",color:"rgba(253,250,246,0.75)",lineHeight:1.6}}>Prijzen inclusief btw. Geen toeslag voor avond-, nacht- of weekendwerk.</p>
                </div>
              </div>
              <div>
                <p style={{fontSize:"0.875rem",fontWeight:600,color:"#FDFAF6",marginBottom:"0.75rem"}}>Schat extra werktijd:</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem"}}>
                  {[0,15,30,45,60].map((mins)=>(
                    <button key={mins} onClick={()=>setExtraMinutes(mins)}
                      style={{padding:"0.6rem 0.75rem",borderRadius:"0.375rem",fontSize:"0.75rem",fontWeight:500,textAlign:"left",cursor:"pointer",transition:"all 0.15s",border:`1px solid ${extraMinutes===mins?"#C5A059":"rgba(255,255,255,0.15)"}`,background:extraMinutes===mins?"#C5A059":"rgba(255,255,255,0.05)",color:extraMinutes===mins?"#1a3a6b":"#FDFAF6",gridColumn:mins===0?"span 2":"span 1"}}>
                      {mins===0?"Eerste 30 min (inbegrepen)":`+ ${mins} min extra`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,0.15)",paddingTop:"1.5rem",marginTop:"1.5rem",display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
              <Link href={`/boeking?service=${selected}`} style={{flex:1,minWidth:"180px",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"3rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"0.9rem",textDecoration:"none",border:"1px solid #C5A059"}}>
                Boek Nu voor {formatPrice(tarief.vastTarief)} <ChevronRight style={{height:"1rem",width:"1rem"}} />
              </Link>
              <Link href="/diensten" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"3rem",padding:"0 1.5rem",borderRadius:"0.375rem",background:"transparent",color:"#FDFAF6",fontWeight:600,fontSize:"0.9rem",textDecoration:"none",border:"1px solid rgba(255,255,255,0.3)"}}>
                Meer Info
              </Link>
            </div>
          </div>
          <p style={{textAlign:"center",fontSize:"0.75rem",color:"rgba(253,250,246,0.4)",marginTop:"1rem"}}>Vaste tarieven — geen voorrijkosten · Geen toeslag avond/nacht/weekend · Direct afrekenen aan de deur</p>
        </div>
      </div>
    </section>
  );
}
