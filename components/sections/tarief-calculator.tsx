"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Droplets, Waves, Flame, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GILDE_TARIEVEN } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { ServiceId } from "@/types";

const SERVICE_ICONS: Record<ServiceId, React.ElementType> = {
  lekkage:     Droplets,
  verstopping: Waves,
  "cv-storing": Flame,
};

export function TariefCalculatorSection() {
  const [selected,     setSelected]     = useState<ServiceId>("lekkage");
  const [extraMinutes, setExtraMinutes] = useState<number>(0);

  const tarief = GILDE_TARIEVEN.find((t) => t.serviceId === selected)!;
  const extraBlocks   = Math.ceil(extraMinutes / 15);
  const totalPrice    = tarief.vastTarief + extraBlocks * tarief.vervolgtarief;

  return (
    <section id="tarieven" className="section bg-primary-900 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(197,160,89,0.05) 0%, transparent 70%)" }} />

      <div className="container-vg relative z-10">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="overline mb-4 text-gold-DEFAULT/80">
            <span className="w-5 h-px bg-gold-DEFAULT/60" />
            Volledige Transparantie
            <span className="w-5 h-px bg-gold-DEFAULT/60" />
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-cream mt-3">
            Vaste Gildetarieven
          </h2>
          <div className="w-16 h-0.5 bg-gold-DEFAULT rounded mx-auto mt-4" />
          <p className="text-cream/60 mt-4 text-sm leading-relaxed">
            Bereken direct wat uw reparatie kost. Geen vage schattingen,
            geen verborgen kosten — u weet het vooraf.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">

          {/* Service selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {GILDE_TARIEVEN.map((t) => {
              const Icon = SERVICE_ICONS[t.serviceId];
              const isActive = selected === t.serviceId;
              return (
                <button
                  key={t.serviceId}
                  onClick={() => { setSelected(t.serviceId); setExtraMinutes(0); }}
                  className={[
                    "relative flex flex-col items-center gap-2.5 p-5 rounded-lg border-2",
                    "transition-all duration-200 cursor-pointer text-center group",
                    isActive
                      ? "bg-gold-DEFAULT border-gold-DEFAULT text-primary-800"
                      : "bg-white/5 border-white/10 text-cream/70 hover:border-gold-DEFAULT/40 hover:bg-white/8",
                  ].join(" ")}
                >
                  <Icon className={`h-7 w-7 ${isActive ? "text-primary-800" : "text-gold-DEFAULT"}`} />
                  <span className={`text-sm font-semibold font-body leading-tight ${isActive ? "text-primary-800" : ""}`}>
                    {t.service}
                  </span>
                  <span className={`text-xl font-display font-bold ${isActive ? "text-primary-800" : "text-gold-DEFAULT"}`}>
                    {formatPrice(t.vastTarief)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 md:p-8">

            <div className="flex flex-col md:flex-row gap-6">

              {/* Price breakdown */}
              <div className="flex-1">
                <h3 className="font-display font-bold text-cream text-xl mb-4">
                  {tarief.service}
                </h3>

                {/* Breakdown rows */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                    <span className="text-sm text-cream/70">Vast gildetarief (incl. eerste 30 min)</span>
                    <span className="font-bold text-gold-DEFAULT font-display">
                      {formatPrice(tarief.vastTarief)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                    <span className="text-sm text-cream/70">Vervolgtarief (per 15 min)</span>
                    <span className="font-semibold text-cream/80 font-body">
                      {formatPrice(tarief.vervolgtarief)}
                    </span>
                  </div>
                  {extraBlocks > 0 && (
                    <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                      <span className="text-sm text-cream/70">
                        Extra werk ({extraMinutes} min = {extraBlocks}× blok)
                      </span>
                      <span className="font-semibold text-cream/80">
                        {formatPrice(extraBlocks * tarief.vervolgtarief)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-semibold text-cream">Totaal geschat</span>
                    <span className="font-display font-bold text-2xl text-gold-DEFAULT">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-gold-DEFAULT/10 rounded-md border border-gold-DEFAULT/20">
                  <Info className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" />
                  <p className="text-xs text-cream/60 leading-relaxed">
                    Prijzen zijn inclusief btw. De loodgieter bevestigt de eindprijs vooraf op locatie.
                    Geen toeslag voor avond-, nacht- of weekendwerk.
                  </p>
                </div>
              </div>

              {/* Extra time slider */}
              <div className="md:w-52 flex flex-col">
                <p className="text-sm font-semibold text-cream mb-3">
                  Schat extra werktijd:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                  {[0, 15, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setExtraMinutes(mins)}
                      className={[
                        "px-3 py-2 rounded text-xs font-medium text-left transition-all duration-150 border",
                        mins === 0 ? "col-span-2 md:col-span-1" : "",
                        extraMinutes === mins
                          ? "bg-gold-DEFAULT text-primary-800 border-gold-DEFAULT font-bold"
                          : "bg-white/5 text-cream/60 border-white/10 hover:border-gold-DEFAULT/30",
                      ].join(" ")}
                    >
                      {mins === 0 ? "Eerste 30 min (inbegrepen)" : `+ ${mins} min extra`}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Button variant="gold" size="lg" asChild className="flex-1">
                <Link href={`/boeking?service=${selected}`}>
                  Boek Nu voor {formatPrice(tarief.vastTarief)}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline-gold" size="lg" asChild>
                <Link href="/diensten">Meer Info</Link>
              </Button>
            </div>

          </div>

          {/* Footnote */}
          <p className="text-center text-xs text-cream/30 mt-4">
            Vaste tarieven — geen voorrijkosten · Geen toeslag avond/nacht/weekend · Direct afrekenen aan de deur
          </p>
        </div>
      </div>
    </section>
  );
}
