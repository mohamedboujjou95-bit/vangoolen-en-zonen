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

export default function DienstenPage() {
  const [activeTab, setActiveTab] = useState<ServiceId>("lekkage");
  const activeService = SERVICES.find((s) => s.id === activeTab)!;
  const activeTarief = GILDE_TARIEVEN.find((t) => t.serviceId === activeTab)!;
  const Icon = ICON_MAP[activeTab];

  return (
    <>
      <Navbar />
      <main>
        <section style={{background:"linear-gradient(160deg,#0e1f42,#1a3a6b)",paddingTop:"5rem",paddingBottom:"2.5rem"}}>
          <div className="container-vg">
            <span className="overline mb-3"><span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/>Onze Specialisaties<span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/></span>
            <h1 className="font-display font-bold" style={{fontSize:"clamp(1.75rem,4vw,3rem)",color:"#FDFAF6",marginTop:"0.75rem",marginBottom:"0.75rem"}}>Acute Loodgietersdiensten</h1>
            <p style={{color:"rgba(253,250,246,0.65)",fontSize:"1rem",lineHeight:1.65,maxWidth:"480px"}}>Drie specialisaties. Vaste tarieven, gecertificeerde vakmannen, binnen 2 uur.</p>
          </div>
        </section>

        <section style={{background:"#FDFAF6",padding:"2rem 0"}}>
          <div className="container-vg">
            {/* Tabs — scrollbaar op mobiel */}
            <div style={{display:"flex",gap:"0.625rem",marginBottom:"1.5rem",overflowX:"auto",paddingBottom:"0.25rem"}}>
              {SERVICES.map((service) => {
                const TabIcon = ICON_MAP[service.id];
                const isActive = activeTab === service.id;
                return (
                  <button key={service.id} onClick={() => setActiveTab(service.id)}
                    style={{display:"flex",alignItems:"center",gap:"0.625rem",padding:"0.75rem 1rem",borderRadius:"0.625rem",border:`2px solid ${isActive?"#1a3a6b":"#e3d2ae"}`,background:isActive?"#1a3a6b":"#fff",cursor:"pointer",flexShrink:0,transition:"all 0.2s",boxShadow:isActive?"0 4px 12px rgba(26,58,107,0.2)":"none"}}>
                    <TabIcon style={{height:"1.125rem",width:"1.125rem",color:isActive?"#C5A059":"#1a3a6b",flexShrink:0}} />
                    <div style={{textAlign:"left"}}>
                      <p style={{fontSize:"0.8125rem",fontWeight:600,color:isActive?"#FDFAF6":"#0e1f42",whiteSpace:"nowrap"}}>{service.title}</p>
                      <p style={{fontSize:"0.7rem",color:isActive?"rgba(253,250,246,0.6)":"#a89e90",whiteSpace:"nowrap"}}>{formatPrice(service.basePrice)}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tarief card — prominent bovenaan op mobiel */}
            <div style={{background:"#0e1f42",border:"1px solid rgba(197,160,89,0.2)",borderRadius:"0.75rem",padding:"1.25rem",textAlign:"center",marginBottom:"1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
              <div>
                <p style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.16em",color:"rgba(197,160,89,0.7)",marginBottom:"0.375rem"}}>Vast Gildetarief</p>
                <p className="font-display font-bold" style={{fontSize:"2rem",color:"#C5A059"}}>{formatPrice(activeTarief.vastTarief)}</p>
                <p style={{fontSize:"0.7rem",color:"rgba(253,250,246,0.4)"}}>{activeTarief.unit}</p>
              </div>
              <Link href={`/boeking?service=${activeService.id}`} style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",height:"2.75rem",padding:"0 1.25rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"0.9375rem",textDecoration:"none",flexShrink:0}}>
                Direct Boeken <ChevronRight style={{height:"1rem",width:"1rem"}} />
              </Link>
            </div>

            {/* Service detail */}
            <div className="card-heritage" style={{padding:"1.5rem",marginBottom:"1.25rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1rem"}}>
                <div style={{width:"3rem",height:"3rem",borderRadius:"50%",background:"#0e1f42",border:"2px solid #C5A059",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon style={{height:"1.5rem",width:"1.5rem",color:"#C5A059"}} />
                </div>
                <div>
                  <span style={{display:"inline-flex",alignItems:"center",gap:"0.375rem",padding:"0.15rem 0.625rem",borderRadius:"999px",fontSize:"0.65rem",fontWeight:700,border:"1px solid rgba(197,160,89,0.4)",background:"rgba(197,160,89,0.1)",color:"#9a6f2e",marginBottom:"0.375rem"}}>
                    <Clock style={{height:"0.7rem",width:"0.7rem"}} />{activeService.responseTime}
                  </span>
                  <h2 className="font-display font-bold" style={{fontSize:"1.25rem",color:"#0e1f42"}}>{activeService.title}</h2>
                </div>
              </div>
              <div style={{height:"1px",background:"rgba(197,160,89,0.2)",marginBottom:"1rem"}} />
              <p style={{fontSize:"0.9375rem",color:"#475569",lineHeight:1.7,marginBottom:"1.25rem"}}>{activeService.description}</p>
              <h4 className="font-display font-bold" style={{color:"#0e1f42",marginBottom:"0.75rem",fontSize:"0.9375rem"}}>Wat is inbegrepen:</h4>
              <ul style={{display:"grid",gridTemplateColumns:"1fr",gap:"0.625rem",marginBottom:"1.5rem",listStyle:"none",padding:0}}>
                {activeService.features.map((feature) => (
                  <li key={feature} style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.875rem",color:"#475569"}}>
                    <CheckCircle style={{height:"1rem",width:"1rem",color:"#C5A059",flexShrink:0,marginTop:"0.1rem"}} />{feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Info cards */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
              <div className="card-heritage" style={{padding:"1rem"}}>
                <Euro style={{height:"1.125rem",width:"1.125rem",color:"#C5A059",marginBottom:"0.5rem"}} />
                <p style={{fontSize:"0.8125rem",fontWeight:600,color:"#0e1f42",marginBottom:"0.25rem"}}>Geen verborgen kosten</p>
                <p style={{fontSize:"0.75rem",color:"#6e6257",lineHeight:1.5}}>Geen voorrijkosten, geen nachttoeslagen.</p>
              </div>
              <div className="card-heritage" style={{padding:"1rem"}}>
                <Clock style={{height:"1.125rem",width:"1.125rem",color:"#C5A059",marginBottom:"0.5rem"}} />
                <p style={{fontSize:"0.8125rem",fontWeight:600,color:"#0e1f42",marginBottom:"0.25rem"}}>Binnen {activeService.responseTime}</p>
                <p style={{fontSize:"0.75rem",color:"#6e6257",lineHeight:1.5}}>Dichtstbijzijnde vrije vakman.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
