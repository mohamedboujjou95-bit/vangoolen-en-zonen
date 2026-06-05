"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Droplets, Waves, Flame, CheckCircle, ChevronRight,
  MapPin, Phone, Mail, Clock, MessageSquare,
} from "lucide-react";
import { Navbar }    from "@/components/layout/navbar";
import { Footer }    from "@/components/layout/footer";
import { Button }    from "@/components/ui/button";
import { Input, FormField } from "@/components/ui/input";
import { Badge }     from "@/components/ui/badge";
import { SERVICES, GILDE_TARIEVEN, PHONE_HREF, PHONE_NUMBER } from "@/lib/data";
import { checkPostalCode, formatPrice, isValidPostalCode, normalisePostalCode } from "@/lib/utils";
import type { BookingFormData, BookingStep, ServiceId, PostalCodeResult } from "@/types";

const EMPTY_FORM: BookingFormData = {
  serviceId: "", serviceLabel: "", urgency: "",
  postalCode: "", city: "", address: "", houseNumber: "",
  firstName: "", lastName: "", phone: "", email: "", notes: "",
};

const ICON_MAP: Record<ServiceId, React.ElementType> = {
  lekkage: Droplets, verstopping: Waves, "cv-storing": Flame,
};

const URGENCY_OPTIONS = [
  { id: "nu-spoed",  label: "Nu — Spoed",          desc: "Zo snel mogelijk, binnen 2 uur" },
  { id: "vandaag",   label: "Vandaag",               desc: "Ergens vandaag, geen noodsituatie" },
  { id: "deze-week", label: "Deze week",             desc: "Flexibel, komende dagen" },
] as const;

// ── Inner component — uses useSearchParams safely inside Suspense ──
function BoekingForm() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("service") as ServiceId | null;

  const [step,          setStep]          = useState<BookingStep>(1);
  const [form,          setForm]          = useState<BookingFormData>({
    ...EMPTY_FORM,
    serviceId:    preselect ?? "",
    serviceLabel: SERVICES.find(s => s.id === preselect)?.title ?? "",
  });
  const [pcResult,      setPcResult]      = useState<PostalCodeResult | null>(null);
  const [pcLoading,     setPcLoading]     = useState(false);
  const [submitting,    setSubmitting]    = useState(false);
  const [done,          setDone]          = useState(false);
  const [errors,        setErrors]        = useState<Partial<BookingFormData>>({});

  // ── Update form field ──
  const set = (key: keyof BookingFormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: "" }));
  };

  // ── Step 1: validate ──
  const validateStep1 = () => {
    if (!form.serviceId) return false;
    if (!form.urgency)   return false;
    return true;
  };

  // ── Step 2: postal check ──
  const handlePostalCheck = async () => {
    const norm = normalisePostalCode(form.postalCode);
    if (!isValidPostalCode(norm)) {
      setErrors(prev => ({ ...prev, postalCode: "Voer een geldige postcode in (bijv. 1234 AB)" }));
      return;
    }
    setPcLoading(true);
    const result = await checkPostalCode(norm);
    setPcResult(result);
    if (result.city) set("city", result.city);
    setPcLoading(false);
  };

  const validateStep2 = () => {
    const errs: Partial<BookingFormData> = {};
    if (!isValidPostalCode(form.postalCode)) errs.postalCode = "Geldige postcode vereist";
    if (!form.address)     errs.address     = "Straatnaam is vereist";
    if (!form.houseNumber) errs.houseNumber = "Huisnummer is vereist";
    if (!pcResult?.inServiceArea) return false;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Step 3: validate + submit ──
  const validateStep3 = () => {
    const errs: Partial<BookingFormData> = {};
    if (!form.firstName) errs.firstName = "Voornaam is vereist";
    if (!form.lastName)  errs.lastName  = "Achternaam is vereist";
    if (!form.phone)     errs.phone     = "Telefoonnummer is vereist";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Geldig e-mailadres vereist";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitting(true);
    try { await fetch("/api/boeking", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) }); } catch(e) {} await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setDone(true);
  };

  const tarief = GILDE_TARIEVEN.find(t => t.serviceId === form.serviceId);

  // ── Success screen ──
  if (done) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream flex items-center justify-center py-24 px-4">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 rounded-full bg-success-light border-4 border-success-DEFAULT
                            flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success-DEFAULT" />
            </div>
            <h1 className="font-display font-bold text-3xl text-primary-800 mb-3">
              Aanvraag Bevestigd!
            </h1>
            <p className="text-secondary-600 mb-6 leading-relaxed">
              Uw aanvraag is ontvangen. Wij sturen een SMS-bevestiging naar{" "}
              <strong className="text-primary-800">{form.phone}</strong> met de gegevens
              van de dichtstbijzijnde vrije gilde-loodgieter.
            </p>
            <div className="bg-primary-800 rounded-lg p-5 text-left mb-6 border border-gold-DEFAULT/20">
              <div className="flex items-center gap-2 text-gold-DEFAULT text-sm font-semibold mb-3">
                <MessageSquare className="h-4 w-4" />
                SMS Bevestiging Verzonden (mock)
              </div>
              <p className="text-cream/70 text-sm leading-relaxed font-body">
                "Van Goolen & Zonen: Uw aanvraag voor {form.serviceLabel} is ontvangen.
                Gilde-vakman onderweg — verwachte aankomsttijd: {pcResult?.estimatedArrival ?? "< 2 uur"}.
                Vragen? Bel {PHONE_NUMBER}."
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" asChild>
                <a href="/">Terug naar Home</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={PHONE_HREF}>
                  <Phone className="h-4 w-4" /> Direct Bellen
                </a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-24 pb-16">
        <div className="container-vg max-w-2xl">

          {/* Page header */}
          <div className="text-center mb-10">
            <span className="overline mb-3">Snelle Boeking</span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-primary-800 mt-3">
              Gilde-Loodgieter Boeken
            </h1>
            <div className="gold-rule-center mt-4" />
            <p className="text-secondary-500 text-sm mt-3">
              In 3 stappen geregeld · Geen aanbetaling · Afrekenen aan de deur
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0 mb-10">
            {([1, 2, 3] as BookingStep[]).map((s, i) => {
              const labels = ["Kies Probleem", "Uw Adres", "Gegevens"];
              const isDone    = step > s;
              const isActive  = step === s;
              return (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={[
                      "step-indicator",
                      isDone   ? "completed" : "",
                      isActive ? "active"    : "",
                    ].join(" ")}>
                      {isDone ? <CheckCircle className="h-4 w-4" /> : s}
                    </div>
                    <span className={`text-xs hidden sm:block ${isActive ? "text-primary-800 font-semibold" : "text-secondary-400"}`}>
                      {labels[i]}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`w-16 md:w-24 h-px mx-1 mb-5 transition-colors duration-300 ${step > s ? "bg-gold-DEFAULT" : "bg-border"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="card-heritage p-6 md:p-8">
              <h2 className="font-display font-bold text-xl text-primary-800 mb-6">
                Stap 1: Wat is het probleem?
              </h2>

              {/* Service selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
                {SERVICES.map(service => {
                  const SIcon = ICON_MAP[service.id];
                  const isSelected = form.serviceId === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => { set("serviceId", service.id); set("serviceLabel", service.title); }}
                      className={[
                        "flex flex-col items-center gap-2 p-4 rounded-lg border-2 text-center",
                        "transition-all duration-200",
                        isSelected
                          ? "bg-primary-800 border-primary-800 text-cream shadow-blue"
                          : "bg-cream-100 border-border text-secondary-700 hover:border-primary-200",
                      ].join(" ")}
                    >
                      <SIcon className={`h-6 w-6 ${isSelected ? "text-gold-DEFAULT" : "text-primary-DEFAULT"}`} />
                      <span className={`text-xs font-semibold leading-tight ${isSelected ? "text-cream" : "text-primary-800"}`}>
                        {service.title}
                      </span>
                      <span className={`text-sm font-bold font-display ${isSelected ? "text-gold-DEFAULT" : "text-primary-DEFAULT"}`}>
                        {formatPrice(service.basePrice)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Urgency */}
              <p className="text-sm font-semibold text-primary-800 mb-3">Hoe urgent is het?</p>
              <div className="flex flex-col gap-2 mb-8">
                {URGENCY_OPTIONS.map(opt => {
                  const isSelected = form.urgency === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => set("urgency", opt.id)}
                      className={[
                        "flex items-center justify-between px-4 py-3 rounded-lg border-2 text-left",
                        "transition-all duration-150",
                        isSelected
                          ? "border-gold-DEFAULT bg-gold-DEFAULT/10"
                          : "border-border bg-cream-100 hover:border-gold-DEFAULT/40",
                      ].join(" ")}
                    >
                      <div>
                        <span className={`text-sm font-semibold ${isSelected ? "text-primary-800" : "text-secondary-700"}`}>
                          {opt.label}
                        </span>
                        <span className={`block text-xs ${isSelected ? "text-secondary-500" : "text-secondary-400"}`}>
                          {opt.desc}
                        </span>
                      </div>
                      {isSelected && <CheckCircle className="h-4 w-4 text-gold-DEFAULT shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="primary" size="lg"
                className="w-full"
                disabled={!validateStep1()}
                onClick={() => setStep(2)}
              >
                Volgende: Uw Adres
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="card-heritage p-6 md:p-8">
              <h2 className="font-display font-bold text-xl text-primary-800 mb-6">
                Stap 2: Uw Adres & Postcode-check
              </h2>

              {/* Postcode input + check */}
              <FormField label="Postcode" htmlFor="postcode" required error={errors.postalCode}>
                <div className="flex gap-2">
                  <Input
                    id="postcode"
                    placeholder="1234 AB"
                    value={form.postalCode}
                    onChange={e => { set("postalCode", e.target.value.toUpperCase()); setPcResult(null); }}
                    maxLength={7}
                    error={errors.postalCode}
                    className="flex-1"
                  />
                  <Button
                    variant="outline" size="md"
                    onClick={handlePostalCheck}
                    loading={pcLoading}
                    disabled={!form.postalCode || pcLoading}
                    className="shrink-0"
                  >
                    <MapPin className="h-4 w-4" />
                    Controleer
                  </Button>
                </div>
              </FormField>

              {/* Postcode result */}
              {pcResult && (
                <div className={[
                  "mt-3 p-3 rounded-lg border flex items-start gap-2.5 text-sm",
                  pcResult.inServiceArea
                    ? "bg-success-light border-success-DEFAULT/30 text-success-DEFAULT"
                    : "bg-danger-light border-danger-DEFAULT/30 text-danger-DEFAULT",
                ].join(" ")}>
                  {pcResult.inServiceArea
                    ? <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    : <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  }
                  <div>
                    {pcResult.inServiceArea ? (
                      <>
                        <strong>Goed nieuws!</strong> Wij zijn actief in {pcResult.city}.{" "}
                        <span className="flex items-center gap-1 mt-0.5">
                          <Clock className="h-3.5 w-3.5" />
                          Verwachte aankomsttijd: <strong>{pcResult.estimatedArrival}</strong>
                        </span>
                      </>
                    ) : (
                      <>Helaas valt deze postcode momenteel buiten ons verzorgingsgebied.</>
                    )}
                  </div>
                </div>
              )}

              {/* Address fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <FormField label="Straatnaam" htmlFor="address" required error={errors.address}>
                  <Input id="address" placeholder="Keizersgracht" value={form.address} onChange={e => set("address", e.target.value)} />
                </FormField>
                <FormField label="Huisnummer" htmlFor="houseNumber" required error={errors.houseNumber}>
                  <Input id="houseNumber" placeholder="123A" value={form.houseNumber} onChange={e => set("houseNumber", e.target.value)} />
                </FormField>
              </div>

              {pcResult?.city && (
                <div className="mt-3 px-4 py-2 bg-cream-200 rounded text-sm text-secondary-600">
                  Stad: <strong className="text-primary-800">{pcResult.city}</strong>
                </div>
              )}

              <div className="flex gap-3 mt-7">
                <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                  Terug
                </Button>
                <Button
                  variant="primary" size="lg" className="flex-1"
                  disabled={!pcResult?.inServiceArea || !validateStep2()}
                  onClick={() => setStep(3)}
                >
                  Volgende: Gegevens
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div className="card-heritage p-6 md:p-8">
              <h2 className="font-display font-bold text-xl text-primary-800 mb-6">
                Stap 3: Uw Contactgegevens
              </h2>

              {/* Summary pill */}
              {form.serviceId && tarief && (
                <div className="bg-primary-800 rounded-lg px-4 py-3 mb-6 flex flex-wrap gap-3 items-center justify-between">
                  <span className="text-sm text-cream/80 font-body">{form.serviceLabel}</span>
                  <Badge variant="gold">{formatPrice(tarief.vastTarief)} vast tarief</Badge>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormField label="Voornaam" htmlFor="firstName" required error={errors.firstName}>
                  <Input id="firstName" placeholder="Jan" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
                </FormField>
                <FormField label="Achternaam" htmlFor="lastName" required error={errors.lastName}>
                  <Input id="lastName" placeholder="de Vries" value={form.lastName} onChange={e => set("lastName", e.target.value)} />
                </FormField>
              </div>

              <FormField label="Telefoonnummer" htmlFor="phone" required error={errors.phone} className="mb-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400" />
                  <Input id="phone" placeholder="06 12 34 56 78" value={form.phone}
                    onChange={e => set("phone", e.target.value)} className="pl-9" type="tel" />
                </div>
              </FormField>

              <FormField label="E-mailadres" htmlFor="email" required error={errors.email} className="mb-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400" />
                  <Input id="email" placeholder="jan@example.nl" value={form.email}
                    onChange={e => set("email", e.target.value)} className="pl-9" type="email" />
                </div>
              </FormField>

              <FormField label="Opmerkingen (optioneel)" htmlFor="notes" className="mb-7">
                <textarea
                  id="notes"
                  placeholder="Bijv. toegangscode, verdieping, extra informatie..."
                  value={form.notes}
                  onChange={e => set("notes", e.target.value)}
                  rows={3}
                  className="form-input resize-none"
                />
              </FormField>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">
                  Terug
                </Button>
                <Button
                  variant="gold" size="lg" className="flex-1"
                  onClick={handleSubmit}
                  loading={submitting}
                  disabled={submitting}
                >
                  {submitting
                    ? "Aanvraag verzenden..."
                    : "Bevestig Aanvraag"
                  }
                  {!submitting && <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>

              <p className="text-center text-xs text-secondary-400 mt-4">
                Door te bevestigen gaat u akkoord met onze{" "}
                <a href="/voorwaarden" className="underline hover:text-primary-DEFAULT">Algemene Voorwaarden</a>.
              </p>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Page export — wraps BoekingForm in Suspense (required for useSearchParams in Next.js 14) ──
export default function BoekingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-gold-DEFAULT border-t-transparent
                            rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-secondary-500">Laden...</p>
          </div>
        </div>
      }
    >
      <BoekingForm />
    </Suspense>
  );
}
