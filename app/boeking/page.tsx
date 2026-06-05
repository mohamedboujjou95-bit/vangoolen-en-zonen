"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Droplets, Waves, Flame, CheckCircle, ChevronRight, MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Input, FormField } from "@/components/ui/input";
import { SERVICES, GILDE_TARIEVEN, PHONE_HREF, PHONE_NUMBER } from "@/lib/data";
import { checkPostalCode, formatPrice, isValidPostalCode, normalisePostalCode } from "@/lib/utils";
import type { BookingFormData, BookingStep, ServiceId, PostalCodeResult } from "@/types";

const EMPTY_FORM: BookingFormData = { serviceId:"", serviceLabel:"", urgency:"", postalCode:"", city:"", address:"", houseNumber:"", firstName:"", lastName:"", phone:"", email:"", notes:"" };
const ICON_MAP: Record<ServiceId, React.ElementType> = { lekkage: Droplets, verstopping: Waves, "cv-storing": Flame };
const URGENCY_OPTIONS = [
  { id:"nu-spoed", label:"Nu — Spoed", desc:"Zo snel mogelijk, binnen 2 uur" },
  { id:"vandaag", label:"Vandaag", desc:"Ergens vandaag, geen noodsituatie" },
  { id:"deze-week", label:"Deze week", desc:"Flexibel, komende dagen" },
] as const;
const G: React.CSSProperties = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", height:"3rem", padding:"0 1.75rem", borderRadius:"0.375rem", background:"#C5A059", color:"#1a3a6b", fontWeight:700, fontSize:"0.9375rem", border:"1px solid #C5A059", cursor:"pointer", width:"100%" };
const O: React.CSSProperties = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", height:"3rem", padding:"0 1.75rem", borderRadius:"0.375rem", background:"transparent", color:"#1a3a6b", fontWeight:600, fontSize:"0.9375rem", border:"2px solid #e3d2ae", cursor:"pointer", width:"100%" };

function BoekingForm() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("service") as ServiceId | null;
  const [step, setStep] = useState<BookingStep>(1);
  const [form, setForm] = useState<BookingFormData>({ ...EMPTY_FORM, serviceId: preselect ?? "", serviceLabel: SERVICES.find(s => s.id === preselect)?.title ?? "" });
  const [pcResult, setPcResult] = useState<PostalCodeResult | null>(null);
  const [pcLoading, setPcLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const set = (k: keyof BookingFormData, v: string) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: "" })); };
  const v1 = () => !!form.serviceId && !!form.urgency;
  const v3 = () => { const e: Partial<BookingFormData> = {}; if (!form.firstName) e.firstName="Vereist"; if (!form.lastName) e.lastName="Vereist"; if (!form.phone) e.phone="Vereist"; if (!form.email||!/\S+@\S+\.\S+/.test(form.email)) e.email="Geldig e-mail vereist"; setErrors(e); return !Object.keys(e).length; };
  const handlePC = async () => {
    const n = normalisePostalCode(form.postalCode);
    if (!isValidPostalCode(n)) { setErrors(p => ({ ...p, postalCode:"Geldige postcode vereist" })); return; }
    setPcLoading(true); const r = await checkPostalCode(n); setPcResult(r); if (r.city) set("city", r.city); setPcLoading(false);
  };
  const handleSubmit = async () => {
    if (!v3()) return; setSubmitting(true);
    try { await fetch("/api/boeking", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) }); } catch(e) {}
    await new Promise(r => setTimeout(r, 800)); setSubmitting(false); setDone(true);
  };
  const tarief = GILDE_TARIEVEN.find(t => t.serviceId === form.serviceId);

  if (done) return (
    <><Navbar /><main style={{minHeight:"100vh",background:"#FDFAF6",display:"flex",alignItems:"center",justifyContent:"center",padding:"6rem 1rem"}}>
      <div style={{maxWidth:"480px",width:"100%",textAlign:"center"}}>
        <div style={{width:"5rem",height:"5rem",borderRadius:"50%",background:"#d8f3dc",border:"3px solid #2d6a4f",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem"}}><CheckCircle style={{height:"2.5rem",width:"2.5rem",color:"#2d6a4f"}} /></div>
        <h1 className="font-display font-bold" style={{fontSize:"1.875rem",color:"#0e1f42",marginBottom:"0.75rem"}}>Aanvraag Bevestigd!</h1>
        <p style={{color:"#6e6257",marginBottom:"1.25rem",lineHeight:1.65}}>Wij nemen zo snel mogelijk contact op via <strong style={{color:"#0e1f42"}}>{form.phone}</strong>.</p>
        <div style={{background:"#0e1f42",borderRadius:"0.625rem",padding:"1.125rem",textAlign:"left",marginBottom:"1.5rem",border:"1px solid rgba(197,160,89,0.2)"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#C5A059",fontSize:"0.75rem",fontWeight:600,marginBottom:"0.625rem"}}><MessageSquare style={{height:"1rem",width:"1rem"}} /> Bevestiging Verzonden</div>
          <p style={{fontSize:"0.8125rem",color:"rgba(253,250,246,0.65)",lineHeight:1.6}}>"Van Goolen & Zonen: Uw aanvraag voor {form.serviceLabel} is ontvangen. Verwachte aankomsttijd: {pcResult?.estimatedArrival ?? "< 2 uur"}."</p>
        </div>
        <div style={{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="/" style={{...G,width:"auto",padding:"0 1.5rem"}}>Terug naar Home</a>
          <a href={PHONE_HREF} style={{...O,width:"auto",padding:"0 1.5rem"}}><Phone style={{height:"1rem",width:"1rem"}} /> Direct Bellen</a>
        </div>
      </div>
    </main><Footer /></>
  );

  return (
    <><Navbar /><main style={{minHeight:"100vh",background:"#FDFAF6",paddingTop:"6rem",paddingBottom:"4rem"}}>
      <div className="container-vg" style={{maxWidth:"640px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
          <span className="overline mb-3">Snelle Boeking</span>
          <h1 className="font-display font-bold" style={{fontSize:"clamp(1.75rem,3vw,2.25rem)",color:"#0e1f42",marginTop:"0.75rem"}}>Gilde-Loodgieter Boeken</h1>
          <div className="gold-rule-center" />
          <p style={{color:"#a89e90",fontSize:"0.875rem",marginTop:"0.75rem"}}>In 3 stappen geregeld · Geen aanbetaling · Afrekenen aan de deur</p>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"2.5rem"}}>
          {([1,2,3] as BookingStep[]).map((s,i) => {
            const isDone=step>s; const isActive=step===s;
            return (<React.Fragment key={s}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.375rem"}}>
                <div style={{width:"2.25rem",height:"2.25rem",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.875rem",fontWeight:700,border:`2px solid ${isDone?"#1a3a6b":isActive?"#C5A059":"#e3d2ae"}`,background:isDone?"#1a3a6b":isActive?"#C5A059":"transparent",color:isDone?"#FDFAF6":isActive?"#1a3a6b":"#a89e90",fontFamily:"var(--font-display)"}}>{isDone?"✓":s}</div>
              </div>
              {i<2&&<div style={{width:"5rem",height:"2px",margin:"0 0.25rem 0.5rem",background:step>s?"#C5A059":"#e3d2ae"}} />}
            </React.Fragment>);
          })}
        </div>

        {step===1&&<div className="card-heritage" style={{padding:"2rem"}}>
          <h2 className="font-display font-bold" style={{fontSize:"1.25rem",color:"#0e1f42",marginBottom:"1.5rem"}}>Stap 1: Wat is het probleem?</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.75rem",marginBottom:"1.75rem"}}>
            {SERVICES.map(sv => { const SI=ICON_MAP[sv.id]; const sel=form.serviceId===sv.id; return (
              <button key={sv.id} onClick={()=>{set("serviceId",sv.id);set("serviceLabel",sv.title);}} style={{padding:"1rem 0.75rem",borderRadius:"0.625rem",border:`2px solid ${sel?"#1a3a6b":"#e3d2ae"}`,background:sel?"#1a3a6b":"#f7f1e4",cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
                <SI style={{height:"1.5rem",width:"1.5rem",color:sel?"#C5A059":"#1a3a6b",margin:"0 auto 0.5rem"}} />
                <span style={{display:"block",fontSize:"0.75rem",fontWeight:600,color:sel?"#FDFAF6":"#0e1f42",lineHeight:1.3}}>{sv.title}</span>
                <span style={{display:"block",fontSize:"0.9375rem",fontWeight:700,color:sel?"#C5A059":"#1a3a6b",marginTop:"0.25rem",fontFamily:"var(--font-display)"}}>{formatPrice(sv.basePrice)}</span>
              </button>);
            })}
          </div>
          <p style={{fontSize:"0.875rem",fontWeight:600,color:"#0e1f42",marginBottom:"0.75rem"}}>Hoe urgent is het?</p>
          <div style={{display:"flex",flexDirection:"column",gap:"0.625rem",marginBottom:"2rem"}}>
            {URGENCY_OPTIONS.map(opt => { const sel=form.urgency===opt.id; return (
              <button key={opt.id} onClick={()=>set("urgency",opt.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.875rem 1rem",borderRadius:"0.5rem",border:`2px solid ${sel?"#C5A059":"#e3d2ae"}`,background:sel?"rgba(197,160,89,0.08)":"#f7f1e4",cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
                <div><span style={{fontSize:"0.875rem",fontWeight:600,color:"#0e1f42",display:"block"}}>{opt.label}</span><span style={{fontSize:"0.75rem",color:"#6e6257",display:"block"}}>{opt.desc}</span></div>
                {sel&&<CheckCircle style={{height:"1.125rem",width:"1.125rem",color:"#C5A059",flexShrink:0}} />}
              </button>);
            })}
          </div>
          <button onClick={()=>setStep(2)} disabled={!v1()} style={{...G,opacity:v1()?1:0.45}}>Volgende: Uw Adres <ChevronRight style={{height:"1rem",width:"1rem"}} /></button>
        </div>}

        {step===2&&<div className="card-heritage" style={{padding:"2rem"}}>
          <h2 className="font-display font-bold" style={{fontSize:"1.25rem",color:"#0e1f42",marginBottom:"1.5rem"}}>Stap 2: Uw Adres &amp; Postcode-check</h2>
          <FormField label="Postcode" htmlFor="postcode" required error={errors.postalCode} className="mb-4">
            <div style={{display:"flex",gap:"0.625rem"}}>
              <Input id="postcode" placeholder="1234 AB" value={form.postalCode} onChange={e=>{set("postalCode",e.target.value.toUpperCase());setPcResult(null);}} maxLength={7} style={{flex:1}} />
              <button onClick={handlePC} disabled={!form.postalCode||pcLoading} style={{height:"2.75rem",padding:"0 1rem",borderRadius:"0.375rem",background:"transparent",color:"#1a3a6b",border:"2px solid #e3d2ae",fontWeight:600,fontSize:"0.875rem",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.375rem",flexShrink:0,opacity:(!form.postalCode||pcLoading)?0.5:1}}>
                <MapPin style={{height:"1rem",width:"1rem"}} />{pcLoading?"...":"Controleer"}
              </button>
            </div>
          </FormField>
          {pcResult&&<div style={{padding:"0.75rem 1rem",borderRadius:"0.5rem",border:`1px solid ${pcResult.inServiceArea?"rgba(45,106,79,0.25)":"rgba(155,34,38,0.2)"}`,background:pcResult.inServiceArea?"#d8f3dc":"#fde8e8",color:pcResult.inServiceArea?"#2d6a4f":"#9b2226",fontSize:"0.8125rem",marginBottom:"1rem",display:"flex",alignItems:"flex-start",gap:"0.5rem"}}>
            {pcResult.inServiceArea?<CheckCircle style={{height:"1rem",width:"1rem",flexShrink:0,marginTop:"0.1rem"}} />:<MapPin style={{height:"1rem",width:"1rem",flexShrink:0}} />}
            <div>{pcResult.inServiceArea?<><strong>Goed nieuws!</strong> Wij zijn actief in {pcResult.city}. ⏱ Aankomsttijd: <strong>{pcResult.estimatedArrival}</strong></>:"Helaas valt deze postcode buiten ons verzorgingsgebied."}</div>
          </div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
            <FormField label="Straatnaam" htmlFor="address" required error={errors.address}><Input id="address" placeholder="Keizersgracht" value={form.address} onChange={e=>set("address",e.target.value)} /></FormField>
            <FormField label="Huisnummer" htmlFor="houseNumber" required error={errors.houseNumber}><Input id="houseNumber" placeholder="123A" value={form.houseNumber} onChange={e=>set("houseNumber",e.target.value)} /></FormField>
          </div>
          {pcResult?.city&&<div style={{padding:"0.5rem 1rem",background:"#f7f1e4",borderRadius:"0.375rem",fontSize:"0.875rem",color:"#6e6257",marginBottom:"1rem"}}>Stad: <strong style={{color:"#0e1f42"}}>{pcResult.city}</strong></div>}
          <div style={{display:"flex",gap:"0.75rem",marginTop:"1.5rem"}}>
            <button onClick={()=>setStep(1)} style={O}>← Terug</button>
            <button onClick={()=>{if(form.address&&form.houseNumber&&pcResult?.inServiceArea)setStep(3);}} disabled={!pcResult?.inServiceArea||!form.address||!form.houseNumber} style={{...G,opacity:(!pcResult?.inServiceArea||!form.address||!form.houseNumber)?0.45:1}}>Volgende: Gegevens <ChevronRight style={{height:"1rem",width:"1rem"}} /></button>
          </div>
        </div>}

        {step===3&&<div className="card-heritage" style={{padding:"2rem"}}>
          <h2 className="font-display font-bold" style={{fontSize:"1.25rem",color:"#0e1f42",marginBottom:"1.5rem"}}>Stap 3: Uw Contactgegevens</h2>
          {form.serviceId&&tarief&&<div style={{background:"#0e1f42",borderRadius:"0.5rem",padding:"0.875rem 1rem",marginBottom:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:"0.875rem",color:"rgba(253,250,246,0.75)"}}>{form.serviceLabel}</span>
            <span style={{fontSize:"0.75rem",fontWeight:700,color:"#C5A059",background:"rgba(197,160,89,0.15)",border:"1px solid rgba(197,160,89,0.3)",padding:"0.2rem 0.75rem",borderRadius:"0.25rem"}}>{formatPrice(tarief.vastTarief)} vast tarief</span>
          </div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
            <FormField label="Voornaam" htmlFor="fn" required error={errors.firstName}><Input id="fn" placeholder="Jan" value={form.firstName} onChange={e=>set("firstName",e.target.value)} /></FormField>
            <FormField label="Achternaam" htmlFor="ln" required error={errors.lastName}><Input id="ln" placeholder="de Vries" value={form.lastName} onChange={e=>set("lastName",e.target.value)} /></FormField>
          </div>
          <FormField label="Telefoonnummer" htmlFor="ph" required error={errors.phone} className="mb-4"><div style={{position:"relative"}}><Phone style={{position:"absolute",left:"0.75rem",top:"50%",transform:"translateY(-50%)",height:"1rem",width:"1rem",color:"#a89e90"}} /><Input id="ph" placeholder="06 12 34 56 78" value={form.phone} onChange={e=>set("phone",e.target.value)} style={{paddingLeft:"2.25rem"}} type="tel" /></div></FormField>
          <FormField label="E-mailadres" htmlFor="em" required error={errors.email} className="mb-4"><div style={{position:"relative"}}><Mail style={{position:"absolute",left:"0.75rem",top:"50%",transform:"translateY(-50%)",height:"1rem",width:"1rem",color:"#a89e90"}} /><Input id="em" placeholder="jan@example.nl" value={form.email} onChange={e=>set("email",e.target.value)} style={{paddingLeft:"2.25rem"}} type="email" /></div></FormField>
          <FormField label="Opmerkingen (optioneel)" htmlFor="nt" className="mb-6"><textarea id="nt" placeholder="Bijv. toegangscode, verdieping..." value={form.notes} onChange={e=>set("notes",e.target.value)} rows={3} className="form-input resize-none" /></FormField>
          <div style={{display:"flex",gap:"0.75rem"}}>
            <button onClick={()=>setStep(2)} style={O}>← Terug</button>
            <button onClick={handleSubmit} disabled={submitting} style={{...G,opacity:submitting?0.6:1}}>{submitting?"Verzenden...":<><ChevronRight style={{height:"1rem",width:"1rem"}} />Bevestig Aanvraag</>}</button>
          </div>
        </div>}
      </div>
    </main><Footer /></>
  );
}

export default function BoekingPage() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#FDFAF6"}}><p style={{color:"#6e6257"}}>Laden...</p></div>}>
      <BoekingForm />
    </Suspense>
  );
}
