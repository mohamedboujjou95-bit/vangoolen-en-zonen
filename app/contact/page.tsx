"use client";
import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, CheckCircle, Send } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Input, FormField } from "@/components/ui/input";
import { PHONE_NUMBER, PHONE_HREF, EMAIL, OPENING_HOURS } from "@/lib/data";
import { simulateDelay } from "@/lib/utils";

interface ContactForm { name:string; email:string; phone:string; subject:string; message:string; }
const EMPTY:ContactForm = { name:"",email:"",phone:"",subject:"",message:"" };

export default function ContactPage() {
  const [form,setForm] = useState<ContactForm>(EMPTY);
  const [loading,setLoading] = useState(false);
  const [sent,setSent] = useState(false);
  const [errors,setErrors] = useState<Partial<ContactForm>>({});
  const set = (k:keyof ContactForm,v:string) => { setForm(p=>({...p,[k]:v})); setErrors(p=>({...p,[k]:""})); };
  const validate = () => { const e:Partial<ContactForm>={}; if(!form.name)e.name="Vereist"; if(!form.email||!/\S+@\S+\.\S+/.test(form.email))e.email="Geldig e-mail vereist"; if(!form.message)e.message="Vereist"; setErrors(e); return !Object.keys(e).length; };
  const handleSubmit = async(e:React.FormEvent) => { e.preventDefault(); if(!validate())return; setLoading(true); await simulateDelay(1400); setLoading(false); setSent(true); };

  return (
    <>
      <Navbar />
      <main>
        <section style={{background:"linear-gradient(160deg,#0e1f42,#1a3a6b)",paddingTop:"5rem",paddingBottom:"2.5rem"}}>
          <div className="container-vg">
            <span className="overline mb-3"><span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/>Neem Contact Op<span style={{width:"1.25rem",height:"1px",background:"#C5A059",display:"block"}}/></span>
            <h1 className="font-display font-bold" style={{fontSize:"clamp(1.75rem,4vw,3rem)",color:"#FDFAF6",marginTop:"0.75rem",marginBottom:"0.75rem"}}>Hoe Kunnen Wij U Helpen?</h1>
            <p style={{color:"rgba(253,250,246,0.65)",fontSize:"1rem",lineHeight:1.65}}>Voor spoed: bel direct. Voor vragen: gebruik het formulier.</p>
          </div>
        </section>

        <section style={{background:"#FDFAF6",padding:"2.5rem 0"}}>
          <div className="container-vg">
            {/* Emergency card — altijd bovenaan op mobiel */}
            <div style={{background:"#0e1f42",border:"1px solid rgba(197,160,89,0.2)",borderRadius:"0.75rem",padding:"1.25rem",textAlign:"center",marginBottom:"1.5rem"}}>
              <p style={{fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.18em",color:"rgba(197,160,89,0.7)",marginBottom:"0.5rem"}}>24/7 Spoedlijn</p>
              <a href={PHONE_HREF} style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"clamp(1.25rem,4vw,1.75rem)",color:"#C5A059",display:"block",textDecoration:"none",marginBottom:"0.5rem"}}>{PHONE_NUMBER}</a>
              <p style={{fontSize:"0.75rem",color:"rgba(253,250,246,0.4)",marginBottom:"1rem"}}>Dag & nacht, 365 dagen per jaar</p>
              <a href={PHONE_HREF} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"2.75rem",padding:"0 1.5rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"0.9375rem",textDecoration:"none"}}>
                <Phone style={{height:"1rem",width:"1rem"}} />Nu Bellen
              </a>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"1.5rem"}}>
              {/* Contact formulier */}
              <div className="card-heritage" style={{padding:"1.5rem"}}>
                {sent ? (
                  <div style={{textAlign:"center",padding:"2rem 1rem"}}>
                    <div style={{width:"4rem",height:"4rem",borderRadius:"50%",background:"#d8f3dc",border:"2px solid #2d6a4f",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem"}}>
                      <CheckCircle style={{height:"2rem",width:"2rem",color:"#2d6a4f"}} />
                    </div>
                    <h3 className="font-display font-bold" style={{fontSize:"1.25rem",color:"#0e1f42",marginBottom:"0.5rem"}}>Bericht Ontvangen!</h3>
                    <p style={{color:"#6e6257",fontSize:"0.875rem"}}>Wij nemen contact op via <strong>{form.email}</strong>.</p>
                    <button onClick={()=>{setForm(EMPTY);setSent(false);}} style={{marginTop:"1rem",padding:"0.5rem 1.25rem",borderRadius:"0.375rem",background:"transparent",color:"#1a3a6b",border:"2px solid #e3d2ae",cursor:"pointer",fontSize:"0.875rem",fontWeight:600}}>Nieuw Bericht</button>
                  </div>
                ):(
                  <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                    <h2 className="font-display font-bold" style={{fontSize:"1.25rem",color:"#0e1f42",marginBottom:"0.25rem"}}>Stuur Ons een Bericht</h2>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                      <FormField label="Naam" htmlFor="cn" required error={errors.name}><Input id="cn" placeholder="Jan de Vries" value={form.name} onChange={e=>set("name",e.target.value)} /></FormField>
                      <FormField label="Telefoon" htmlFor="cp"><Input id="cp" placeholder="06 12 34 56 78" value={form.phone} onChange={e=>set("phone",e.target.value)} type="tel" /></FormField>
                    </div>
                    <FormField label="E-mail" htmlFor="ce" required error={errors.email}><Input id="ce" placeholder="jan@example.nl" value={form.email} onChange={e=>set("email",e.target.value)} type="email" /></FormField>
                    <FormField label="Onderwerp" htmlFor="cs"><Input id="cs" placeholder="Bijv. vraag over tarief" value={form.subject} onChange={e=>set("subject",e.target.value)} /></FormField>
                    <FormField label="Bericht" htmlFor="cm" required error={errors.message}><textarea id="cm" placeholder="Beschrijf uw vraag..." value={form.message} onChange={e=>set("message",e.target.value)} rows={4} className="form-input resize-none" /></FormField>
                    <button type="submit" disabled={loading} style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",height:"3rem",padding:"0 1.5rem",borderRadius:"0.375rem",background:"#1a3a6b",color:"#FDFAF6",fontWeight:700,fontSize:"0.9375rem",border:"none",cursor:"pointer",opacity:loading?0.6:1}}>
                      {loading?"Verzenden...":<><Send style={{height:"1rem",width:"1rem"}} />Bericht Verzenden</>}
                    </button>
                  </form>
                )}
              </div>

              {/* Contact info + openingstijden */}
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"1rem"}}>
                <div className="card-heritage" style={{padding:"1.25rem"}}>
                  <h3 className="font-display font-semibold" style={{fontSize:"1rem",color:"#0e1f42",marginBottom:"1rem"}}>Contactgegevens</h3>
                  <div style={{display:"flex",flexDirection:"column",gap:"0.875rem"}}>
                    {[{icon:Phone,label:PHONE_NUMBER,sub:"Spoedlijn 24/7",href:PHONE_HREF},{icon:Mail,label:EMAIL,sub:"Reactie binnen 1 werkdag",href:`mailto:${EMAIL}`},{icon:MapPin,label:"Amsterdam, Rotterdam, Den Haag, Utrecht",sub:"& omgeving"},{icon:Clock,label:"365 dagen per jaar",sub:"Geen toeslag avond/nacht/weekend"}].map(({icon:Icon,label,sub,href})=>(
                      <div key={label} style={{display:"flex",gap:"0.75rem",alignItems:"flex-start"}}>
                        <Icon style={{height:"1rem",width:"1rem",color:"#C5A059",flexShrink:0,marginTop:"0.1rem"}} />
                        <div>
                          {href?<a href={href} style={{fontSize:"0.875rem",fontWeight:500,color:"#0e1f42",textDecoration:"none",display:"block"}}>{label}</a>:<p style={{fontSize:"0.875rem",fontWeight:500,color:"#0e1f42",margin:0}}>{label}</p>}
                          <p style={{fontSize:"0.75rem",color:"#a89e90",marginTop:"0.125rem"}}>{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-heritage" style={{padding:"1.25rem"}}>
                  <h3 className="font-display font-semibold" style={{fontSize:"1rem",color:"#0e1f42",marginBottom:"0.875rem",display:"flex",alignItems:"center",gap:"0.5rem"}}><Clock style={{height:"1rem",width:"1rem",color:"#C5A059"}} />Beschikbaarheid</h3>
                  {OPENING_HOURS.map(row=>(
                    <div key={row.day} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.5rem 0",borderBottom:"1px solid rgba(197,160,89,0.1)",fontSize:"0.875rem"}}>
                      <span style={{color:"#6e6257"}}>{row.day}</span>
                      <span style={{fontSize:"0.75rem",fontWeight:700,color:"#2d6a4f",background:"#d8f3dc",padding:"0.15rem 0.625rem",borderRadius:"0.25rem"}}>{row.hours}</span>
                    </div>
                  ))}
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
