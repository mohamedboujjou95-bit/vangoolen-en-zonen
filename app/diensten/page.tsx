"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Droplets, Waves, Flame, CheckCircle, ChevronRight, Clock, Euro } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SERVICES, GILDE_TARIEVEN } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { ServiceId } from "@/types";

const ICON_MAP: Record<ServiceId, React.ElementType> = { lekkage: Droplets, verstopping: Waves, "cv-storing": Flame };
const BTN = {gold:"inline-flex items-center justify-center gap-2 rounded font-bold text-base transition-all duration-200",blue:"inline-flex items-center justify-center gap-2 rounded font-semibold text-sm transition-all duration-200"};

export default function DienstenPage() {
  const [activeTab, setActiveTab] = useState<ServiceId>("lekkage");
  const activeService = SERVICES.find((s) => s.id === activeTab)!;
  const activeTarief = GILDE_TARIEVEN.find((t) => t.serviceId === activeTab)!;
  const Icon = ICON_MAP[activeTab];

  return (
    <>
      <Navbar />
      <main>
        <section style={{background:"linear-gradient(160deg, #0e1f42 0%, #1a3a6b 55%, #163162 100%)",paddingTop:"7rem",paddingBottom:"4rem"}}>
          <div className="container-vg">
            <span className="overline mb-3"><span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/>Onze Specialisaties<span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/></span>
            <h1 className="font-display font-bold text-cream mt-3 mb-4" style={{fontSize:"clamp(2rem,4vw,3rem)"}}>Acute Loodgietersdiensten</h1>
            <p style={{color:"rgba(253,250,246,0.65)",fontSize:"1.0625rem",maxWidth:"520px",lineHeight:1.65}}>Drie specialisaties. Elk met vaste tarieven, gecertificeerde vakmannen en aankomst binnen 2 uur.</p>
          </div>
        </section>

        <section style={{background:"#FDFAF6",padding:"4rem 0"}}>
          <div className="container-vg">
            <div style={{display:"flex",gap:"0.75rem",marginBottom:"2rem",flexWrap:"wrap"}}>
              {SERVICES.map((service) => {
                const TabIcon = ICON_MAP[service.id];
                const isActive = activeTab === service.id;
                return (
                  <button key={service.id} onClick={() => setActiveTab(service.id)}
                    style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"1rem 1.25rem",borderRadius:"0.625rem",border:`2px solid ${isActive?"#1a3a6b":"#e3d2ae"}`,background:isActive?"#1a3a6b":"#fff",cursor:"pointer",flex:1,minWidth:"200px",transition:"all 0.2s",boxShadow:isActive?"0 6px 20px rgba(26,58,107,0.25)":"none"}}>
                    <TabIcon style={{height:"1.25rem",width:"1.25rem",flexShrink:0,color:isActive?"#C5A059":"#1a3a6b"}} />
                    <div style={{textAlign:"left"}}>
                      <p style={{fontSize:"0.8125rem",fontWeight:600,color:isActive?"#FDFAF6":"#0e1f42"}}>{service.title}</p>
                      <p style={{fontSize:"0.75rem",color:isActive?"rgba(253,250,246,0.6)":"#a89e90",marginTop:"0.125rem"}}>Vast tarief {formatPrice(service.basePrice)}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"1.5rem"}}>
              <div className="card-heritage" style={{padding:"2rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.25rem"}}>
                  <div style={{width:"3.5rem",height:"3.5rem",borderRadius:"50%",background:"#0e1f42",border:"2px solid #C5A059",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Icon style={{height:"1.75rem",width:"1.75rem",color:"#C5A059"}} />
                  </div>
                  <div>
                    <span style={{display:"inline-flex",alignItems:"center",gap:"0.375rem",padding:"0.2rem 0.75rem",borderRadius:"999px",fontSize:"0.7rem",fontWeight:700,border:"1px solid rgba(197,160,89,0.4)",background:"rgba(197,160,89,0.1)",color:"#9a6f2e",marginBottom:"0.375rem"}}>
                      <Clock style={{height:"0.75rem",width:"0.75rem"}} /> {activeService.responseTime}
                    </span>
                    <h2 className="font-display font-bold" style={{fontSize:"1.5rem",color:"#0e1f42"}}>{activeService.title}</h2>
                    <p style={{fontSize:"0.875rem",color:"#a89e90"}}>{activeService.subtitle}</p>
                  </div>
                </div>
                <div style={{height:"1px",background:"rgba(197,160,89,0.2)",marginBottom:"1.5rem"}} />
                <p style={{fontSize:"0.9375rem",color:"#475569",lineHeight:1.7,marginBottom:"1.75rem"}}>{activeService.description}</p>
                <h4 className="font-display font-bold" style={{color:"#0e1f42",marginBottom:"1rem"}}>Wat is inbegrepen:</h4>
                <ul style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",marginBottom:"2rem",listStyle:"none",padding:0}}>
                  {activeService.features.map((feature) => (
                    <li key={feature} style={{display:"flex",alignItems:"flex-start",gap:"0.625rem",fontSize:"0.875rem",color:"#475569"}}>
                      <CheckCircle style={{height:"1rem",width:"1rem",color:"#C5A059",flexShrink:0,marginTop:"0.1rem"}} />{feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/boeking?service=${activeService.id}`}
                  style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",height:"3rem",padding:"0 1.75rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"0.9375rem",textDecoration:"none"}}>
                  Boek {activeService.title} <ChevronRight style={{height:"1rem",width:"1rem"}} />
                </Link>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                <div style={{background:"#0e1f42",border:"1px solid rgba(197,160,89,0.2)",borderRadius:"0.75rem",padding:"1.5rem",textAlign:"center"}}>
                  <p style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.16em",color:"rgba(197,160,89,0.7)",marginBottom:"0.5rem"}}>Vast Gildetarief</p>
                  <p className="font-display font-bold" style={{fontSize:"2.5rem",color:"#C5A059"}}>{formatPrice(activeTarief.vastTarief)}</p>
                  <p style={{fontSize:"0.75rem",color:"rgba(253,250,246,0.4)",marginBottom:"1.25rem"}}>{activeTarief.unit}</p>
                  <Link href={`/boeking?service=${activeService.id}`}
                    style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"100%",height:"2.75rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"0.875rem",textDecoration:"none"}}>
                    Direct Boeken
                  </Link>
                </div>
                <div className="card-heritage" style={{padding:"1.125rem"}}>
                  <div style={{display:"flex",gap:"0.75rem"}}>
                    <Euro style={{height:"1.25rem",width:"1.25rem",color:"#C5A059",flexShrink:0,marginTop:"0.1rem"}} />
                    <div>
                      <p style={{fontSize:"0.8125rem",fontWeight:600,color:"#0e1f42",marginBottom:"0.25rem"}}>Geen verborgen kosten</p>
                      <p style={{fontSize:"0.75rem",color:"#6e6257",lineHeight:1.55}}>Geen voorrijkosten, geen nachttoeslagen. U betaalt exact het gildetarief.</p>
                    </div>
                  </div>
                </div>
                <div className="card-heritage" style={{padding:"1.125rem"}}>
                  <div style={{display:"flex",gap:"0.75rem"}}>
                    <Clock style={{height:"1.25rem",width:"1.25rem",color:"#C5A059",flexShrink:0,marginTop:"0.1rem"}} />
                    <div>
                      <p style={{fontSize:"0.8125rem",fontWeight:600,color:"#0e1f42",marginBottom:"0.25rem"}}>Gegarandeerd binnen {activeService.responseTime}</p>
                      <p style={{fontSize:"0.75rem",color:"#6e6257",lineHeight:1.55}}>Ons dispatch-systeem stuurt direct de dichtstbijzijnde vrije vakman.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
