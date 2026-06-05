"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, CheckCircle, Send } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Input, FormField } from "@/components/ui/input";
import { PHONE_NUMBER, PHONE_HREF, EMAIL, OPENING_HOURS } from "@/lib/data";
import { simulateDelay } from "@/lib/utils";

interface ContactForm { name: string; email: string; phone: string; subject: string; message: string; }
const EMPTY: ContactForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const set = (k: keyof ContactForm, v: string) => { setForm(prev => ({ ...prev, [k]: v })); setErrors(prev => ({ ...prev, [k]: "" })); };

  const validate = () => {
    const errs: Partial<ContactForm> = {};
    if (!form.name) errs.name = "Naam is vereist";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Geldig e-mailadres vereist";
    if (!form.message) errs.message = "Bericht is vereist";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await simulateDelay(1400);
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="hero-bg pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container-vg max-w-2xl">
            <span className="overline mb-4"><span className="w-5 h-px bg-gold-DEFAULT/60" />Neem Contact Op<span className="w-5 h-px bg-gold-DEFAULT/60" /></span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-cream mt-3 mb-4">Hoe Kunnen Wij U Helpen?</h1>
            <p className="text-cream/70 text-lg leading-relaxed">Voor spoed: bel direct. Voor vragen: gebruik het formulier.</p>
          </div>
        </section>

        <section className="section bg-cream">
          <div className="container-vg">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <div className="card-heritage p-7 md:p-9">
                  {sent ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-success-light border-2 border-success-DEFAULT flex items-center justify-center mx-auto mb-5">
                        <CheckCircle className="h-8 w-8 text-success-DEFAULT" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-primary-800 mb-2">Bericht Ontvangen!</h3>
                      <p className="text-secondary-600 text-sm leading-relaxed">Bedankt. Wij nemen contact op via <strong className="text-primary-800">{form.email}</strong>.</p>
                      <button onClick={() => { setForm(EMPTY); setSent(false); }} className="mt-6 inline-flex items-center gap-2 h-10 px-5 text-sm font-semibold rounded bg-transparent text-primary-DEFAULT border border-primary-200 hover:bg-primary-50 hover:border-primary-DEFAULT transition-all duration-200">
                        Nieuw Bericht
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <h2 className="font-display font-bold text-xl text-primary-800 mb-1">Stuur Ons een Bericht</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Naam" htmlFor="c-name" required error={errors.name}>
                          <Input id="c-name" placeholder="Jan de Vries" value={form.name} onChange={e => set("name", e.target.value)} />
                        </FormField>
                        <FormField label="Telefoonnummer" htmlFor="c-phone">
                          <Input id="c-phone" placeholder="06 12 34 56 78" value={form.phone} onChange={e => set("phone", e.target.value)} type="tel" />
                        </FormField>
                      </div>
                      <FormField label="E-mailadres" htmlFor="c-email" required error={errors.email}>
                        <Input id="c-email" placeholder="jan@example.nl" value={form.email} onChange={e => set("email", e.target.value)} type="email" />
                      </FormField>
                      <FormField label="Onderwerp" htmlFor="c-subject">
                        <Input id="c-subject" placeholder="Bijv. Vraag over tarief" value={form.subject} onChange={e => set("subject", e.target.value)} />
                      </FormField>
                      <FormField label="Bericht" htmlFor="c-message" required error={errors.message}>
                        <textarea id="c-message" placeholder="Beschrijf uw vraag..." value={form.message} onChange={e => set("message", e.target.value)} rows={5} className="form-input resize-none" />
                      </FormField>
                      <button type="submit" disabled={loading} className="self-start inline-flex items-center gap-2 h-12 px-7 text-base font-semibold rounded bg-primary-DEFAULT text-cream border border-primary-DEFAULT hover:bg-primary-700 transition-all duration-200 disabled:opacity-50">
                        {loading ? "Verzenden..." : <><Send className="h-4 w-4" />Bericht Verzenden</>}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="bg-primary-800 border border-gold-DEFAULT/20 rounded-lg p-6 text-center">
                  <p className="text-xs tracking-widest uppercase text-gold-DEFAULT/70 mb-2 font-body">24/7 Spoedlijn</p>
                  <a href={PHONE_HREF} className="font-display font-bold text-2xl text-gold-DEFAULT hover:text-gold-light transition-colors block mb-2">{PHONE_NUMBER}</a>
                  <p className="text-cream/50 text-xs mb-4">Dag &amp; nacht, 365 dagen per jaar</p>
                  <a href={PHONE_HREF} className="w-full inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-bold rounded bg-gold-DEFAULT text-primary-800 border border-gold-DEFAULT hover:bg-gold-dark hover:text-white transition-all duration-200">
                    <Phone className="h-4 w-4" />Nu Bellen
                  </a>
                </div>
                <div className="card-heritage p-6">
                  <h3 className="font-display font-semibold text-base text-primary-800 mb-4">Contactgegevens</h3>
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-start gap-3"><Phone className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" /><div><p className="text-sm font-medium text-primary-800">{PHONE_NUMBER}</p><p className="text-xs text-secondary-400">Spoedlijn 24/7</p></div></li>
                    <li className="flex items-start gap-3"><Mail className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" /><a href={`mailto:${EMAIL}`} className="text-sm font-medium text-primary-800 hover:text-gold-DEFAULT transition-colors">{EMAIL}</a></li>
                    <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" /><p className="text-sm text-primary-800">Amsterdam, Rotterdam, Den Haag, Utrecht &amp; omgeving</p></li>
                  </ul>
                </div>
                <div className="card-heritage p-6">
                  <div className="flex items-center gap-2 mb-4"><Clock className="h-4 w-4 text-gold-DEFAULT" /><h3 className="font-display font-semibold text-base text-primary-800">Beschikbaarheid</h3></div>
                  <ul className="flex flex-col gap-2.5">
                    {OPENING_HOURS.map((row) => (
                      <li key={row.day} className="flex items-center justify-between text-sm">
                        <span className="text-secondary-600">{row.day}</span>
                        <span className="font-semibold text-success-DEFAULT bg-success-light px-2 py-0.5 rounded text-xs">{row.hours}</span>
                      </li>
                    ))}
                  </ul>
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
