"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Boeking, Partner } from "@/lib/supabase";
import { Phone, MapPin, Clock, CheckCircle, User, RefreshCw, Zap } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  nieuw: "#ea580c",
  toegewezen: "#2563eb",
  onderweg: "#7c3aed",
  voltooid: "#16a34a",
  geannuleerd: "#6b7280",
};

const STATUS_LABELS: Record<string, string> = {
  nieuw: "Nieuw",
  toegewezen: "Toegewezen",
  onderweg: "Onderweg",
  voltooid: "Voltooid",
  geannuleerd: "Geannuleerd",
};

export default function AdminDashboard() {
  const [boekingen, setBoekingen] = useState<Boeking[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoeking, setSelectedBoeking] = useState<Boeking | null>(null);
  const [assigning, setAssigning] = useState(false);
  const [filter, setFilter] = useState("nieuw");

  const fetchData = async () => {
    setLoading(true);
    const [b, p] = await Promise.all([
      supabase.from("boekingen").select("*").order("created_at", { ascending: false }),
      supabase.from("partners").select("*").order("beschikbaar", { ascending: false }),
    ]);
    if (b.data) setBoekingen(b.data);
    if (p.data) setPartners(p.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const approvePartner = async (partnerId: string) => {
    await supabase.from("partners").update({ actief: true, beschikbaar: true }).eq("id", partnerId);
    fetchData();
  };

  const toggleBeschikbaar = async (partner: Partner) => {
    await supabase.from("partners").update({ beschikbaar: !partner.beschikbaar }).eq("id", partner.id);
    fetchData();
  };

  const assignPartner = async (boekingId: string, partnerId: string) => {
    setAssigning(true);
    const partner = partners.find(p => p.id === partnerId);
    const boeking = boekingen.find(b => b.id === boekingId);
    await supabase.from("boekingen").update({ partner_id: partnerId, status: "toegewezen" }).eq("id", boekingId);
    if (partner && boeking) {
      await fetch("/api/dispatch", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          partnerNaam: partner.naam,
          partnerEmail: partner.email,
          partnerTelefoon: partner.telefoon,
          klantNaam: boeking.klant_naam,
          klantTelefoon: boeking.klant_telefoon,
          adres: boeking.adres,
          stad: boeking.stad,
          service: boeking.service,
          urgentie: boeking.urgentie,
          opmerkingen: boeking.opmerkingen,
        })
      });
    }
    setSelectedBoeking(null);
    await fetchData();
    setAssigning(false);
  };

  const updateStatus = async (boekingId: string, status: string) => {
    await supabase.from("boekingen").update({ status }).eq("id", boekingId);
    fetchData();
  };

  const filteredBoekingen = filter === "alle" ? boekingen : boekingen.filter(b => b.status === filter);
  const beschikbarePartners = partners.filter(p => p.beschikbaar);
  const pendingPartners = partners.filter(p => !p.actief);
  const actievePartners = partners.filter(p => p.actief);

  return (
    <div style={{minHeight:"100vh",background:"#0f172a",color:"#FDFAF6",fontFamily:"var(--font-body)"}}>
      {/* Header */}
      <div style={{background:"#1e293b",borderBottom:"1px solid rgba(197,160,89,0.2)",padding:"1rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
          <div style={{width:"2.5rem",height:"2.5rem",borderRadius:"50%",border:"2px solid #C5A059",background:"#1a3a6b",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#C5A059",fontFamily:"var(--font-display)"}}>VG</div>
          <div>
            <p style={{fontWeight:700,color:"#FDFAF6",fontSize:"1rem",fontFamily:"var(--font-display)"}}>Van Goolen & Zonen</p>
            <p style={{fontSize:"0.7rem",color:"#C5A059",letterSpacing:"0.15em",textTransform:"uppercase"}}>Dispatch Dashboard</p>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.875rem",color:"rgba(253,250,246,0.6)"}}>
            <span style={{width:"0.5rem",height:"0.5rem",borderRadius:"50%",background:"#16a34a",display:"inline-block"}} />
            {beschikbarePartners.length} vakman{beschikbarePartners.length !== 1 ? "nen" : ""} beschikbaar
          </div>
          <button onClick={fetchData} style={{display:"flex",alignItems:"center",gap:"0.375rem",padding:"0.5rem 1rem",borderRadius:"0.375rem",background:"rgba(197,160,89,0.15)",border:"1px solid rgba(197,160,89,0.3)",color:"#C5A059",cursor:"pointer",fontSize:"0.8125rem",fontWeight:600}}>
            <RefreshCw style={{height:"0.875rem",width:"0.875rem"}} /> Vernieuwen
          </button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",height:"calc(100vh - 68px)"}}>
        {/* Boekingen kolom */}
        <div style={{overflow:"auto",padding:"1.5rem"}}>
          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
            {[
              {label:"Nieuw",count:boekingen.filter(b=>b.status==="nieuw").length,color:"#ea580c"},
              {label:"Toegewezen",count:boekingen.filter(b=>b.status==="toegewezen").length,color:"#2563eb"},
              {label:"Onderweg",count:boekingen.filter(b=>b.status==="onderweg").length,color:"#7c3aed"},
              {label:"Vandaag voltooid",count:boekingen.filter(b=>b.status==="voltooid"&&new Date(b.created_at).toDateString()===new Date().toDateString()).length,color:"#16a34a"},
            ].map(s=>(
              <div key={s.label} style={{background:"#1e293b",borderRadius:"0.625rem",padding:"1rem",border:`1px solid ${s.color}30`}}>
                <p style={{fontSize:"1.75rem",fontWeight:700,color:s.color,fontFamily:"var(--font-display)"}}>{s.count}</p>
                <p style={{fontSize:"0.75rem",color:"rgba(253,250,246,0.5)",marginTop:"0.25rem"}}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div style={{display:"flex",gap:"0.5rem",marginBottom:"1rem",flexWrap:"wrap"}}>
            {["alle","nieuw","toegewezen","onderweg","voltooid"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:"0.375rem 0.875rem",borderRadius:"999px",fontSize:"0.8125rem",fontWeight:600,cursor:"pointer",border:`1px solid ${filter===f?"#C5A059":"rgba(255,255,255,0.1)"}`,background:filter===f?"#C5A059":"transparent",color:filter===f?"#1a3a6b":"rgba(253,250,246,0.6)",transition:"all 0.15s"}}>
                {f.charAt(0).toUpperCase()+f.slice(1)} {f!=="alle"&&`(${boekingen.filter(b=>b.status===f).length})`}
              </button>
            ))}
          </div>

          {/* Boekingen lijst */}
          {loading ? (
            <div style={{textAlign:"center",padding:"3rem",color:"rgba(253,250,246,0.4)"}}>Laden...</div>
          ) : filteredBoekingen.length === 0 ? (
            <div style={{textAlign:"center",padding:"3rem",color:"rgba(253,250,246,0.4)"}}>Geen boekingen gevonden</div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
              {filteredBoekingen.map(boeking => {
                const partner = partners.find(p => p.id === boeking.partner_id);
                return (
                  <div key={boeking.id} style={{background:"#1e293b",borderRadius:"0.75rem",padding:"1.25rem",border:`1px solid ${selectedBoeking?.id===boeking.id?"#C5A059":"rgba(255,255,255,0.08)"}`,cursor:"pointer",transition:"all 0.2s"}}
                    onClick={()=>setSelectedBoeking(selectedBoeking?.id===boeking.id?null:boeking)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.75rem"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                        <span style={{padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.7rem",fontWeight:700,background:`${STATUS_COLORS[boeking.status]}20`,color:STATUS_COLORS[boeking.status],border:`1px solid ${STATUS_COLORS[boeking.status]}40`}}>
                          {STATUS_LABELS[boeking.status]}
                        </span>
                        <span style={{fontSize:"0.875rem",fontWeight:600,color:"#FDFAF6"}}>{boeking.service}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                        {boeking.urgentie==="nu-spoed"&&<Zap style={{height:"1rem",width:"1rem",color:"#ea580c"}} />}
                        <span style={{fontSize:"0.75rem",color:"rgba(253,250,246,0.4)"}}>{new Date(boeking.created_at).toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"})}</span>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem",fontSize:"0.8125rem"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"0.375rem",color:"rgba(253,250,246,0.7)"}}>
                        <User style={{height:"0.875rem",width:"0.875rem",color:"#C5A059"}} /> {boeking.klant_naam}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"0.375rem",color:"rgba(253,250,246,0.7)"}}>
                        <Phone style={{height:"0.875rem",width:"0.875rem",color:"#C5A059"}} />
                        <a href={`tel:${boeking.klant_telefoon}`} style={{color:"#C5A059",textDecoration:"none",fontWeight:600}} onClick={e=>e.stopPropagation()}>{boeking.klant_telefoon}</a>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"0.375rem",color:"rgba(253,250,246,0.7)"}}>
                        <MapPin style={{height:"0.875rem",width:"0.875rem",color:"#C5A059"}} /> {boeking.adres}, {boeking.stad}
                      </div>
                      {partner && (
                        <div style={{display:"flex",alignItems:"center",gap:"0.375rem",color:"rgba(253,250,246,0.7)"}}>
                          <CheckCircle style={{height:"0.875rem",width:"0.875rem",color:"#16a34a"}} /> {partner.naam}
                        </div>
                      )}
                    </div>

                    {/* Toewijzen panel */}
                    {selectedBoeking?.id===boeking.id&&boeking.status==="nieuw"&&(
                      <div style={{marginTop:"1rem",paddingTop:"1rem",borderTop:"1px solid rgba(255,255,255,0.08)"}} onClick={e=>e.stopPropagation()}>
                        <p style={{fontSize:"0.8125rem",fontWeight:600,color:"#C5A059",marginBottom:"0.625rem"}}>Wijs toe aan beschikbare vakman:</p>
                        {beschikbarePartners.length===0?(
                          <p style={{fontSize:"0.8125rem",color:"rgba(253,250,246,0.4)"}}>Geen beschikbare vakmanen op dit moment</p>
                        ):(
                          <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                            {beschikbarePartners.map(p=>(
                              <button key={p.id} onClick={()=>assignPartner(boeking.id,p.id)} disabled={assigning}
                                style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.625rem 0.875rem",borderRadius:"0.375rem",background:"rgba(22,163,74,0.1)",border:"1px solid rgba(22,163,74,0.3)",color:"#FDFAF6",cursor:"pointer",fontSize:"0.8125rem",opacity:assigning?0.6:1}}>
                                <span><strong>{p.naam}</strong> — {p.stad}</span>
                                <span style={{color:"#16a34a",fontWeight:600}}>Toewijzen →</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Status update knoppen */}
                    {selectedBoeking?.id===boeking.id&&boeking.status!=="nieuw"&&boeking.status!=="voltooid"&&(
                      <div style={{marginTop:"1rem",paddingTop:"1rem",borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",gap:"0.5rem"}} onClick={e=>e.stopPropagation()}>
                        {boeking.status==="toegewezen"&&<button onClick={()=>updateStatus(boeking.id,"onderweg")} style={{padding:"0.5rem 1rem",borderRadius:"0.375rem",background:"rgba(124,58,237,0.2)",border:"1px solid rgba(124,58,237,0.4)",color:"#a78bfa",cursor:"pointer",fontSize:"0.8125rem",fontWeight:600}}>→ Onderweg</button>}
                        {boeking.status==="onderweg"&&<button onClick={()=>updateStatus(boeking.id,"voltooid")} style={{padding:"0.5rem 1rem",borderRadius:"0.375rem",background:"rgba(22,163,74,0.2)",border:"1px solid rgba(22,163,74,0.4)",color:"#4ade80",cursor:"pointer",fontSize:"0.8125rem",fontWeight:600}}>✓ Voltooid</button>}
                        <button onClick={()=>updateStatus(boeking.id,"geannuleerd")} style={{padding:"0.5rem 1rem",borderRadius:"0.375rem",background:"rgba(107,114,128,0.2)",border:"1px solid rgba(107,114,128,0.3)",color:"rgba(253,250,246,0.5)",cursor:"pointer",fontSize:"0.8125rem"}}>Annuleer</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Partners sidebar */}
        <div style={{background:"#1e293b",borderLeft:"1px solid rgba(255,255,255,0.08)",overflow:"auto",padding:"1.5rem"}}>
          <h2 style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"1rem",color:"#FDFAF6",marginBottom:"1rem"}}>Gilde-Partners</h2>
          <div style={{display:"flex",flexDirection:"column",gap:"0.625rem"}}>
            {pendingPartners.length>0&&(
              <div style={{marginBottom:"1rem"}}>
                <p style={{fontSize:"0.7rem",fontWeight:700,color:"#ea580c",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.5rem"}}>Wachtend ({pendingPartners.length})</p>
                {pendingPartners.map(p2=>(
                  <div key={p2.id} style={{background:"#0f172a",borderRadius:"0.5rem",padding:"0.75rem",border:"1px solid rgba(234,88,12,0.3)",marginBottom:"0.5rem"}}>
                    <p style={{fontWeight:600,fontSize:"0.8125rem",color:"#FDFAF6"}}>{p2.naam}</p>
                    <p style={{fontSize:"0.7rem",color:"rgba(253,250,246,0.4)",margin:"0.25rem 0"}}>{p2.stad} · {p2.telefoon}</p>
                    <button onClick={()=>approvePartner(p2.id)} style={{width:"100%",padding:"0.375rem",borderRadius:"0.375rem",background:"rgba(22,163,74,0.2)",border:"1px solid rgba(22,163,74,0.4)",color:"#4ade80",cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>✓ Goedkeuren</button>
                  </div>
                ))}
              </div>
            )}
            <p style={{fontSize:"0.7rem",fontWeight:700,color:"rgba(253,250,246,0.4)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.5rem"}}>Actief ({actievePartners.length})</p>
            {actievePartners.length===0?(
              <p style={{fontSize:"0.8125rem",color:"rgba(253,250,246,0.4)"}}>Geen actieve partners</p>
            ):actievePartners.map(partner=>(
              <div key={partner.id} style={{background:"#0f172a",borderRadius:"0.625rem",padding:"1rem",border:`1px solid ${partner.beschikbaar?"rgba(22,163,74,0.3)":"rgba(255,255,255,0.06)"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.5rem"}}>
                  <p style={{fontWeight:600,fontSize:"0.875rem",color:"#FDFAF6"}}>{partner.naam}</p>
                  <button onClick={()=>toggleBeschikbaar(partner)}
                    style={{padding:"0.2rem 0.625rem",borderRadius:"999px",fontSize:"0.65rem",fontWeight:700,cursor:"pointer",border:"none",background:partner.beschikbaar?"#16a34a":"rgba(107,114,128,0.3)",color:partner.beschikbaar?"#fff":"rgba(253,250,246,0.5)",transition:"all 0.2s"}}>
                    {partner.beschikbaar?"● Beschikbaar":"○ Niet beschikbaar"}
                  </button>
                </div>
                <p style={{fontSize:"0.75rem",color:"rgba(253,250,246,0.4)"}}>{partner.stad}</p>
                <div style={{display:"flex",gap:"0.75rem",marginTop:"0.5rem",fontSize:"0.7rem",color:"rgba(253,250,246,0.4)"}}>
                  <span>⭐ {partner.beoordelingen_gemiddeld.toFixed(1)}</span>
                  <span>✓ {partner.klussen_voltooid} klussen</span>
                </div>
                <a href={`tel:${partner.telefoon}`} style={{display:"block",marginTop:"0.5rem",fontSize:"0.75rem",color:"#C5A059",textDecoration:"none",fontWeight:600}}>{partner.telefoon}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
