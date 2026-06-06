"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Input, FormField } from "@/components/ui/input";
import { CheckCircle, Clock, Euro, Wrench, MapPin, Phone, Mail, ChevronRight, Shield, Users } from "lucide-react";
import { PHONE_HREF, PHONE_NUMBER, EMAIL } from "@/lib/data";
import { simulateDelay } from "@/lib/utils";

interface PartnerForm { firstName:string; lastName:string; phone:string; email:string; city:string; diploma:string; experience:string; motivation:string; }
const EMPTY:PartnerForm = { firstName:"",lastName:"",phone:"",email:"",city:"",diploma:"",experience:"",motivation:"" };

export default function PartnersPage() {
  const [form,setForm] = useState<PartnerForm>(EMPTY);
  const [errors,setErrors] = useState<Partial<PartnerForm>>({});
  const [loading,setLoading] = useState(false);
  const [sent,setSent] = useState(false);
  const [openFaq,setOpenFaq] = useState<number|null>(null);
  const set = (k:keyof PartnerForm,v:string) => { setForm(p=>({...p,[k]:v})); setErrors(p=>({...p,[k]:""})); };
  const validate = () => { const e:Partial<PartnerForm>={}; if(!form.firstName)e.firstName="Vereist"; if(!form.lastName)e.lastName="Vereist"; if(!form.phone)e.phone="Vereist"; if(!form.email||!/\S+@\S+\.\S+/.test(form.email))e.email="Geldig e-mail vereist"; if(!form.city)e.city="Vereist"; if(!form.diploma)e.diploma="Vereist"; setErrors(e); return !Object.keys(e).length; };
  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault(); if(!validate())return; setLoading(true);
    try { await fetch("/api/partner", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) }); } catch(err) {}
    setLoading(false); setSent(true);
  };

  const voordelen = [
    {icon:Euro,t:"Hoog vast percentage",d:"Aantrekkelijk percentage per klus. Hogere beoordeling = meer klussen."},
    {icon:Clock,t:"Flexibele eigen uren",d:"Beschikbaar wanneer het jou uitkomt. Ook parttime mogelijk."},
    {icon:MapPin,t:"Klussen in jouw regio",d:"Dispatch-systeem wijst de dichtstbijzijnde klus automatisch toe."},
    {icon:Shield,t:"Werk onder ons merk",d:"Klanten vertrouwen Van Goolen. Jij levert alleen het vakwerk."},
    {icon:Users,t:"Vaste klantenstroom",d:"Geen acquisitie. Wij regelen alles — jij doet je werk."},
    {icon:Wrench,t:"Standaard procedures",d:"Gestandaardiseerde werkprocedures en collega-netwerk."},
  ];

  const faqs = [
    {q:"Hoeveel verdien ik per klus?",a:"Je ontvangt een vast hoog percentage van het gildetarief. Het exacte percentage bespreken we tijdens het intakegesprek — afhankelijk van regio en beoordeling."},
    {q:"Ben ik verplicht beschikbaar te zijn?",a:"Nee. Je geeft zelf aan wanneer je beschikbaar bent. Geen minimale uren, geen verplichte diensten."},
    {q:"Hoe wordt afgerekend?",a:"De klant betaalt direct aan jou. Wekelijks verrekenen wij het gilde-percentage via automatische factuur."},
    {q:"Hoe snel kan ik starten?",a:"Na goedkeuring plannen we een intakegesprek binnen 5 werkdagen. Gemiddeld start je binnen 2 weken."},
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{background:"linear-gradient(160deg,#0e1f42,#1a3a6b)",paddingTop:"5rem",paddingBottom:"2.5rem"}}>
          <div className="container-vg">
            <span className="overline mb-3"><span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/>Voor Vakmannen<span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/></span>
            <h1 className="font-display font-bold" style={{fontSize:"clamp(1.75rem,4vw,3rem)",color:"#FDFAF6",marginTop:"0.75rem",marginBottom:"0.75rem"}}>
              Word Gilde-Partner &amp; <span style={{color:"#C5A059"}}>Verdien Meer</span>
            </h1>
            <p style={{color:"rgba(253,250,246,0.7)",fontSize:"1rem",lineHeight:1.65,marginBottom:"1.5rem",maxWidth:"480px"}}>Sluit je aan als zelfstandig gilde-loodgieter. Jij levert het vakmanschap — wij de klanten en administratie.</p>
            <div style={{display:"flex",flexDirection:"column",gap:"0.75rem",maxWidth:"320px"}}>
              <a href="#aanmelden" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"3rem",padding:"0 1.5rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"1rem",textDecoration:"none"}}>
                Nu Aanmelden <ChevronRight style={{height:"1.125rem",width:"1.125rem"}} />
              </a>
              <a href={PHONE_HREF} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"3rem",padding:"0 1.5rem",borderRadius:"0.375rem",background:"transparent",color:"#FDFAF6",fontWeight:600,fontSize:"1rem",textDecoration:"none",border:"2px solid rgba(255,255,255,0.4)"}}>
                <Phone style={{height:"1rem",width:"1rem"}} />{PHONE_NUMBER}
              </a>
            </div>
          </div>
        </section>

        {/* Voordelen */}
        <section style={{background:"#FDFAF6",padding:"2.5rem 0"}}>
          <div className="container-vg">
            <div style={{textAlign:"center",marginBottom:"2rem"}}>
              <span className="overline mb-3">Voordelen</span>
              <h2 className="font-display font-bold" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)",color:"#0e1f42",marginTop:"0.75rem"}}>Wat Je Als Partner Krijgt</h2>
              <div className="gold-rule-center" />
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1rem"}}>
              {voordelen.map(v=>{
                const Icon=v.icon;
                return (
                  <div key={v.t} className="card-heritage" style={{padding:"1.25rem"}}>
                    <div style={{width:"2.5rem",height:"2.5rem",borderRadius:"50%",background:"#0e1f42",border:"2px solid #C5A059",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"0.875rem"}}>
                      <Icon style={{height:"1.125rem",width:"1.125rem",color:"#C5A059"}} />
                    </div>
                    <h3 className="font-display font-bold" style={{fontSize:"1rem",color:"#0e1f42",marginBottom:"0.375rem"}}>{v.t}</h3>
                    <p style={{fontSize:"0.8125rem",color:"#6e6257",lineHeight:1.6}}>{v.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Eisen */}
        <section style={{background:"#f7f1e4",padding:"2.5rem 0"}}>
          <div className="container-vg">
            <h2 className="font-display font-bold" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)",color:"#0e1f42",marginBottom:"0.75rem"}}>Wat Wij Vragen</h2>
            <div className="gold-rule" />
            <p style={{color:"#6e6257",marginTop:"0.75rem",marginBottom:"1.25rem",fontSize:"0.9375rem"}}>Wij screenen streng omdat ons merk staat voor kwaliteit.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"0.625rem"}}>
              {["Erkend vakdiploma loodgieter","Minimaal 2 jaar werkervaring","Eigen gereedschap en vervoer","Goede communicatie in het Nederlands","Ingeschreven bij KvK als ZZP","Bereidheid om binnen 30 min uit te rijden","Geldig rijbewijs B","VOG overlegen"].map(e=>(
                <div key={e} style={{display:"flex",alignItems:"flex-start",gap:"0.625rem",fontSize:"0.875rem",color:"#334155"}}>
                  <CheckCircle style={{height:"1rem",width:"1rem",color:"#C5A059",flexShrink:0,marginTop:"0.1rem"}} />{e}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{background:"#FDFAF6",padding:"2.5rem 0"}}>
          <div className="container-vg" style={{maxWidth:"640px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
              <span className="overline mb-3">FAQ</span>
              <h2 className="font-display font-bold" style={{fontSize:"clamp(1.5rem,3vw,2.25rem)",color:"#0e1f42",marginTop:"0.75rem"}}>Vragen Over Partnerschap</h2>
              <div className="gold-rule-center" />
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
              {faqs.map((item,i)=>(
                <div key={i} className="card-heritage" style={{overflow:"hidden"}}>
                  <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",padding:"1rem 1.25rem",textAlign:"left",fontFamily:"var(--font-display)",fontWeight:600,fontSize:"0.9375rem",color:"#0e1f42",background:"transparent",border:"none",cursor:"pointer"}}>
                    {item.q}<span style={{color:"#C5A059",transition:"transform 0.25s",transform:openFaq===i?"rotate(180deg)":"rotate(0deg)",flexShrink:0}}>▾</span>
                  </button>
                  {openFaq===i&&<p style={{padding:"0 1.25rem 1rem",fontSize:"0.875rem",color:"#6e6257",lineHeight:1.7}}>{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aanmeldformulier */}
        <section id="aanmelden" style={{background:"#0e1f42",padding:"2.5rem 0"}}>
          <div className="container-vg" style={{maxWidth:"600px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
              <span className="overline mb-3" style={{color:"rgba(197,160,89,0.8)"}}>Aanmelding</span>
              <h2 className="font-display font-bold" style={{fontSize:"clamp(1.5rem,3vw,2rem)",color:"#FDFAF6",marginTop:"0.75rem"}}>Meld Je Aan Als Gilde-Partner</h2>
              <div style={{width:"4rem",height:"3px",background:"#C5A059",borderRadius:"999px",margin:"1rem auto"}} />
              <p style={{fontSize:"0.875rem",color:"rgba(253,250,246,0.55)"}}>Na aanmelding nemen wij binnen 3 werkdagen contact op.</p>
            </div>

            {sent?(
              <div style={{textAlign:"center",padding:"3rem 1rem"}}>
                <div style={{width:"4rem",height:"4rem",borderRadius:"50%",background:"#d8f3dc",border:"3px solid #2d6a4f",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem"}}>
                  <CheckCircle style={{height:"2rem",width:"2rem",color:"#2d6a4f"}} />
                </div>
                <h3 className="font-display font-bold" style={{fontSize:"1.5rem",color:"#FDFAF6",marginBottom:"0.75rem"}}>Aanmelding Ontvangen!</h3>
                <p style={{fontSize:"0.875rem",color:"rgba(253,250,246,0.6)"}}>Bedankt, <strong style={{color:"#C5A059"}}>{form.firstName}</strong>! Wij nemen contact op via <strong style={{color:"#C5A059"}}>{form.email}</strong>.</p>
                <button onClick={()=>{setForm(EMPTY);setSent(false);}} style={{marginTop:"1.25rem",padding:"0.5rem 1.25rem",borderRadius:"0.375rem",background:"transparent",color:"#C5A059",border:"2px solid #C5A059",cursor:"pointer",fontSize:"0.875rem",fontWeight:600}}>Nieuwe Aanmelding</button>
              </div>
            ):(
              <form onSubmit={handleSubmit} className="card-heritage" style={{padding:"1.5rem"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",marginBottom:"0.75rem"}}>
                  <FormField label="Voornaam" htmlFor="pf" required error={errors.firstName}><Input id="pf" placeholder="Jan" value={form.firstName} onChange={e=>set("firstName",e.target.value)} /></FormField>
                  <FormField label="Achternaam" htmlFor="pl" required error={errors.lastName}><Input id="pl" placeholder="de Vries" value={form.lastName} onChange={e=>set("lastName",e.target.value)} /></FormField>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
                  <FormField label="Telefoonnummer" htmlFor="pp" required error={errors.phone}><Input id="pp" placeholder="06 12 34 56 78" type="tel" value={form.phone} onChange={e=>set("phone",e.target.value)} /></FormField>
                  <FormField label="E-mailadres" htmlFor="pe" required error={errors.email}><Input id="pe" placeholder="jan@example.nl" type="email" value={form.email} onChange={e=>set("email",e.target.value)} /></FormField>
                  <FormField label="Werkgebied" htmlFor="pc" required error={errors.city}><Input id="pc" placeholder="Bijv. Amsterdam, Rotterdam..." value={form.city} onChange={e=>set("city",e.target.value)} /></FormField>
                  <FormField label="Vakdiploma" htmlFor="pd" required error={errors.diploma}><Input id="pd" placeholder="Bijv. SVS Loodgieter niveau 3" value={form.diploma} onChange={e=>set("diploma",e.target.value)} /></FormField>
                  <FormField label="Jaren werkervaring" htmlFor="px"><Input id="px" placeholder="Bijv. 5 jaar" value={form.experience} onChange={e=>set("experience",e.target.value)} /></FormField>
                  <FormField label="Korte motivatie (optioneel)" htmlFor="pm"><textarea id="pm" placeholder="Waarom wil je gilde-partner worden?" value={form.motivation} onChange={e=>set("motivation",e.target.value)} rows={3} className="form-input resize-none" /></FormField>
                  <button type="submit" disabled={loading} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"3rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"1rem",border:"none",cursor:"pointer",opacity:loading?0.6:1}}>
                    {loading?"Verzenden...":<><ChevronRight style={{height:"1.125rem",width:"1.125rem"}} />Aanmelding Versturen</>}
                  </button>
                </div>
                <p style={{textAlign:"center",fontSize:"0.75rem",color:"rgba(253,250,246,0.35)",marginTop:"1rem"}}>Aanmelding is vrijblijvend. Wij delen uw gegevens nooit met derden.</p>
              </form>
            )}

            <div style={{marginTop:"1.5rem",padding:"1rem",borderRadius:"0.625rem",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(197,160,89,0.2)",textAlign:"center"}}>
              <p style={{fontSize:"0.875rem",color:"rgba(253,250,246,0.6)",marginBottom:"0.75rem"}}>Liever eerst een gesprek?</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:"1rem",justifyContent:"center"}}>
                <a href={PHONE_HREF} style={{display:"inline-flex",alignItems:"center",gap:"0.375rem",fontSize:"0.875rem",fontWeight:600,color:"#C5A059",textDecoration:"none"}}><Phone style={{height:"1rem",width:"1rem"}} />{PHONE_NUMBER}</a>
                <a href={`mailto:${EMAIL}`} style={{display:"inline-flex",alignItems:"center",gap:"0.375rem",fontSize:"0.875rem",fontWeight:600,color:"#C5A059",textDecoration:"none"}}><Mail style={{height:"1rem",width:"1rem"}} />{EMAIL}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
