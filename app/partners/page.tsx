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
  const validate = () => { const e:Partial<PartnerForm>={}; if(!form.firstName)e.firstName="Vereist"; if(!form.lastName)e.lastName="Vereist"; if(!form.phone)e.phone="Vereist"; if(!form.email||!/\S+@\S+\.\S+/.test(form.email))e.email="Geldig e-mail vereist"; if(!form.city)e.city="Vereist"; if(!form.diploma)e.diploma="Vereist"; setErrors(e); return Object.keys(e).length===0; };
  const handleSubmit = async(e:React.FormEvent) => { e.preventDefault(); if(!validate())return; setLoading(true); try { await fetch("/api/partner", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) }); } catch(e) {} setLoading(false); setSent(true); };
  const faqs = [{q:"Hoeveel verdien ik per klus?",a:"Je ontvangt een vast hoog percentage van het gildetarief. Het exacte percentage bespreken we tijdens het intakegesprek."},{q:"Ben ik verplicht beschikbaar te zijn?",a:"Nee. Je geeft zelf aan wanneer je beschikbaar bent via de gilde-app. Geen minimale uren."},{q:"Hoe wordt afgerekend?",a:"De klant betaalt direct aan jou. Wekelijks verrekenen wij het gilde-percentage via automatische factuur."},{q:"Hoe snel kan ik starten?",a:"Na goedkeuring plannen we een intakegesprek binnen 5 werkdagen. Gemiddeld start je binnen 2 weken."}];
  return (
    <><Navbar /><main>
      <section className="hero-bg pt-28 pb-16 md:pt-36 md:pb-24"><div className="container-vg"><div style={{maxWidth:"600px"}}>
        <span className="overline mb-4"><span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/>Voor Vakmannen<span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/></span>
        <h1 className="font-display font-bold text-cream mt-3 mb-5" style={{fontSize:"clamp(2rem,4vw,3rem)"}}>Word Gilde-Partner &amp; <span style={{color:"#C5A059"}}>Verdien Meer Met Je Vak</span></h1>
        <p className="text-lg leading-relaxed mb-8" style={{color:"rgba(253,250,246,0.7)"}}>Sluit je aan bij Van Goolen &amp; Zonen als zelfstandig gilde-loodgieter. Jij levert het vakmanschap — wij de klanten, boekingen en administratie.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#aanmelden" className="inline-flex items-center justify-center gap-2 h-14 px-9 text-base font-bold rounded" style={{background:"#C5A059",color:"#1a3a6b"}}>Nu Aanmelden <ChevronRight className="h-5 w-5"/></a>
          <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 h-14 px-9 text-base font-semibold rounded" style={{color:"#C5A059",border:"2px solid #C5A059"}}><Phone className="h-5 w-5"/>{PHONE_NUMBER}</a>
        </div>
      </div></div></section>
      <section className="section" style={{background:"#FDFAF6"}}><div className="container-vg">
        <div className="text-center mb-12"><span className="overline mb-3">Voordelen</span><h2 className="font-display font-bold text-3xl mt-3" style={{color:"#0e1f42"}}>Wat Je Als Partner Krijgt</h2><div className="gold-rule-center"/></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.5rem"}}>
          {[{icon:Euro,t:"Hoog vast percentage",d:"Aantrekkelijk percentage per klus. Hogere beoordeling = meer klussen."},{icon:Clock,t:"Flexibele eigen uren",d:"Beschikbaar wanneer het jou uitkomt. Ook parttime mogelijk."},{icon:MapPin,t:"Klussen in jouw regio",d:"Dispatch-systeem wijst de dichtstbijzijnde klus automatisch toe."},{icon:Shield,t:"Werk onder ons merk",d:"Klanten vertrouwen Van Goolen. Jij levert alleen het vakwerk."},{icon:Users,t:"Vaste klantenstroom",d:"Geen acquisitie. Wij regelen alles — jij doet je werk."},{icon:Wrench,t:"Standaard procedures",d:"Gestandaardiseerde werkprocedures en collega-netwerk."}].map(v=>{
            const Icon=v.icon; return (<div key={v.t} className="card-heritage p-6"><div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{background:"#0e1f42",border:"2px solid #C5A059"}}><Icon className="h-5 w-5" style={{color:"#C5A059"}}/></div><h3 className="font-display font-bold text-lg mb-2" style={{color:"#0e1f42"}}>{v.t}</h3><p className="text-sm leading-relaxed" style={{color:"#6e6257"}}>{v.d}</p></div>);
          })}
        </div>
      </div></section>
      <section className="section" style={{background:"#f7f1e4"}}><div className="container-vg">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
          <div><span className="overline mb-3">Toelatingseisen</span><h2 className="font-display font-bold text-3xl mt-3 mb-4" style={{color:"#0e1f42"}}>Wat Wij Vragen</h2><div className="gold-rule"/><p className="mt-4 leading-relaxed" style={{color:"#6e6257"}}>Wij screenen streng omdat ons merk staat voor kwaliteit. Alleen gecertificeerde vaklui worden gilde-partner.</p></div>
          <ul style={{display:"flex",flexDirection:"column",gap:"0.875rem"}}>
            {["Erkend vakdiploma loodgieter","Minimaal 2 jaar werkervaring","Eigen gereedschap en vervoer","Goede communicatie in het Nederlands","Ingeschreven bij KvK als ZZP","Bereidheid om binnen 30 min uit te rijden","Geldig rijbewijs B","VOG overlegen"].map(e=>(<li key={e} className="flex items-start gap-3 text-sm" style={{color:"#334155"}}><CheckCircle className="h-4 w-4 mt-0.5 shrink-0" style={{color:"#C5A059"}}/>{e}</li>))}
          </ul>
        </div>
      </div></section>
      <section className="section" style={{background:"#FDFAF6"}}><div className="container-vg" style={{maxWidth:"680px",margin:"0 auto"}}>
        <div className="text-center mb-10"><span className="overline mb-3">FAQ</span><h2 className="font-display font-bold text-3xl mt-3" style={{color:"#0e1f42"}}>Vragen Over Partnerschap</h2><div className="gold-rule-center"/></div>
        <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
          {faqs.map((item,i)=>(<div key={i} className="card-heritage overflow-hidden"><button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-display font-semibold text-base" style={{color:"#0e1f42"}}>{item.q}<span style={{color:"#C5A059",transition:"transform 0.25s",transform:openFaq===i?"rotate(180deg)":"rotate(0deg)"}}>▾</span></button>{openFaq===i&&<p className="px-6 pb-5 text-sm leading-relaxed" style={{color:"#6e6257"}}>{item.a}</p>}</div>))}
        </div>
      </div></section>
      <section id="aanmelden" className="section" style={{background:"#0e1f42"}}><div className="container-vg" style={{maxWidth:"680px",margin:"0 auto"}}>
        <div className="text-center mb-10"><span className="overline mb-3" style={{color:"rgba(197,160,89,0.8)"}}>Aanmelding</span><h2 className="font-display font-bold text-3xl mt-3" style={{color:"#FDFAF6"}}>Meld Je Aan Als Gilde-Partner</h2><div style={{width:"4rem",height:"3px",background:"#C5A059",borderRadius:"999px",margin:"1rem auto"}}/><p className="text-sm mt-3" style={{color:"rgba(253,250,246,0.55)"}}>Na je aanmelding nemen wij binnen 3 werkdagen contact op.</p></div>
        {sent?(<div className="text-center py-12"><div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{background:"#d8f3dc",border:"3px solid #2d6a4f"}}><CheckCircle className="h-10 w-10" style={{color:"#2d6a4f"}}/></div><h3 className="font-display font-bold text-2xl mb-3" style={{color:"#FDFAF6"}}>Aanmelding Ontvangen!</h3><p className="text-sm mb-6" style={{color:"rgba(253,250,246,0.6)"}}>Bedankt, <strong style={{color:"#C5A059"}}>{form.firstName}</strong>! Wij nemen contact op via <strong style={{color:"#C5A059"}}>{form.email}</strong>.</p><button onClick={()=>{setForm(EMPTY);setSent(false);}} className="inline-flex items-center gap-2 h-10 px-6 text-sm font-semibold rounded" style={{color:"#C5A059",border:"2px solid #C5A059"}}>Nieuwe Aanmelding</button></div>):(
        <form onSubmit={handleSubmit} className="card-heritage p-7 md:p-9">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
            <FormField label="Voornaam" htmlFor="p-fname" required error={errors.firstName}><Input id="p-fname" placeholder="Jan" value={form.firstName} onChange={e=>set("firstName",e.target.value)}/></FormField>
            <FormField label="Achternaam" htmlFor="p-lname" required error={errors.lastName}><Input id="p-lname" placeholder="de Vries" value={form.lastName} onChange={e=>set("lastName",e.target.value)}/></FormField>
          </div>
          <FormField label="Telefoonnummer" htmlFor="p-phone" required error={errors.phone} className="mb-4"><Input id="p-phone" placeholder="06 12 34 56 78" type="tel" value={form.phone} onChange={e=>set("phone",e.target.value)}/></FormField>
          <FormField label="E-mailadres" htmlFor="p-email" required error={errors.email} className="mb-4"><Input id="p-email" placeholder="jan@example.nl" type="email" value={form.email} onChange={e=>set("email",e.target.value)}/></FormField>
          <FormField label="Werkgebied" htmlFor="p-city" required error={errors.city} className="mb-4"><Input id="p-city" placeholder="Bijv. Amsterdam, Rotterdam..." value={form.city} onChange={e=>set("city",e.target.value)}/></FormField>
          <FormField label="Vakdiploma" htmlFor="p-diploma" required error={errors.diploma} className="mb-4"><Input id="p-diploma" placeholder="Bijv. SVS Loodgieter niveau 3" value={form.diploma} onChange={e=>set("diploma",e.target.value)}/></FormField>
          <FormField label="Jaren werkervaring" htmlFor="p-exp" className="mb-4"><Input id="p-exp" placeholder="Bijv. 5 jaar" value={form.experience} onChange={e=>set("experience",e.target.value)}/></FormField>
          <FormField label="Korte motivatie (optioneel)" htmlFor="p-mot" className="mb-6"><textarea id="p-mot" placeholder="Waarom wil je gilde-partner worden?" value={form.motivation} onChange={e=>set("motivation",e.target.value)} rows={3} className="form-input resize-none"/></FormField>
          <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 h-12 px-7 text-base font-bold rounded disabled:opacity-50" style={{background:"#C5A059",color:"#1a3a6b"}}>
            {loading?"Verzenden...":(<><ChevronRight className="h-5 w-5"/>Aanmelding Versturen</>)}
          </button>
        </form>)}
        <div className="mt-8 p-5 rounded-lg text-center" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(197,160,89,0.2)"}}>
          <p className="text-sm mb-3" style={{color:"rgba(253,250,246,0.6)"}}>Liever eerst een gesprek?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-sm font-semibold" style={{color:"#C5A059"}}><Phone className="h-4 w-4"/>{PHONE_NUMBER}</a>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-sm font-semibold" style={{color:"#C5A059"}}><Mail className="h-4 w-4"/>{EMAIL}</a>
          </div>
        </div>
      </div></section>
    </main><Footer /></>
  );
}
