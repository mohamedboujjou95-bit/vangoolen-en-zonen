"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Droplets, Waves, Flame, CheckCircle, ChevronRight, Clock, Euro } from "lucide-react";
import { Navbar }    from "@/components/layout/navbar";
import { Footer }    from "@/components/layout/footer";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { SERVICES, GILDE_TARIEVEN } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { ServiceId } from "@/types";

const ICON_MAP: Record<ServiceId, React.ElementType> = {
  lekkage:      Droplets,
  verstopping:  Waves,
  "cv-storing": Flame,
};

export default function DienstenPage() {
  const [activeTab, setActiveTab] = useState<ServiceId>("lekkage");
  const activeService = SERVICES.find((s) => s.id === activeTab)!;
  const activeTarief  = GILDE_TARIEVEN.find((t) => t.serviceId === activeTab)!;
  const Icon          = ICON_MAP[activeTab];

  return (
    <>
      <Navbar />
      <main>

        {/* ── Page hero ── */}
        <section className="hero-bg pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container-vg">
            <div className="max-w-2xl">
              <span className="overline mb-4">
                <span className="w-5 h-px bg-gold-DEFAULT/60" />
                Onze Specialisaties
                <span className="w-5 h-px bg-gold-DEFAULT/60" />
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-cream mt-3 mb-4">
                Acute Loodgietersdiensten
              </h1>
              <p className="text-cream/70 text-lg leading-relaxed max-w-xl">
                Drie specialisaties. Elk met vaste tarieven, gecertificeerde vakmannen en
                een gegarandeerde aankomsttijd van binnen twee uur.
              </p>
            </div>
          </div>
        </section>

        {/* ── Tabbed services ── */}
        <section className="section bg-cream">
          <div className="container-vg">

            {/* Tab selector */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              {SERVICES.map((service) => {
                const TabIcon = ICON_MAP[service.id];
                const isActive = activeTab === service.id;
                return (
                  <button
                    key={service.id}
                    id={service.slug}
                    onClick={() => setActiveTab(service.id)}
                    className={[
                      "flex items-center gap-3 px-5 py-4 rounded-lg border-2 text-left",
                      "transition-all duration-200 flex-1",
                      isActive
                        ? "bg-primary-800 border-primary-800 text-cream shadow-blue"
                        : "bg-white border-border text-secondary-700 hover:border-primary-200",
                    ].join(" ")}
                  >
                    <TabIcon className={`h-5 w-5 shrink-0 ${isActive ? "text-gold-DEFAULT" : "text-primary-DEFAULT"}`} />
                    <div>
                      <p className={`text-sm font-semibold ${isActive ? "text-cream" : "text-primary-800"}`}>
                        {service.title}
                      </p>
                      <p className={`text-xs mt-0.5 ${isActive ? "text-cream/60" : "text-secondary-400"}`}>
                        Vast tarief {formatPrice(service.basePrice)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active service panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Main content */}
              <div className="lg:col-span-2 card-heritage p-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary-800 border-2 border-gold-DEFAULT
                                  flex items-center justify-center shrink-0">
                    <Icon className="h-7 w-7 text-gold-DEFAULT" />
                  </div>
                  <div>
                    <Badge variant="gold" className="mb-1.5">
                      <Clock className="h-3 w-3" /> {activeService.responseTime}
                    </Badge>
                    <h2 className="font-display font-bold text-2xl text-primary-800">
                      {activeService.title}
                    </h2>
                    <p className="text-sm text-secondary-500">{activeService.subtitle}</p>
                  </div>
                </div>

                <div className="w-full h-px bg-gold-DEFAULT/20 mb-6" />

                <p className="text-secondary-600 leading-relaxed mb-7">
                  {activeService.description}
                </p>

                <h4 className="font-display font-bold text-primary-800 mb-4">
                  Wat is inbegrepen:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {activeService.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-secondary-700">
                      <CheckCircle className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="primary" size="lg" asChild>
                  <Link href={`/boeking?service=${activeService.id}`}>
                    Boek {activeService.title}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Tarief sidebar */}
              <div className="flex flex-col gap-4">
                {/* Tarief card */}
                <div className="bg-primary-800 border border-gold-DEFAULT/20 rounded-lg p-6 text-center">
                  <p className="text-xs tracking-widest uppercase text-gold-DEFAULT/70 mb-2 font-body">
                    Vast Gildetarief
                  </p>
                  <p className="font-display font-bold text-4xl text-gold-DEFAULT mb-1">
                    {formatPrice(activeTarief.vastTarief)}
                  </p>
                  <p className="text-xs text-cream/50 mb-5">{activeTarief.unit}</p>
                  <div className="bg-white/5 rounded-md p-3 mb-5 text-left">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cream/60">Vervolgtarief</span>
                      <span className="text-cream font-semibold">
                        {formatPrice(activeTarief.vervolgtarief)} / 15 min
                      </span>
                    </div>
                  </div>
                  <Button variant="gold" size="md" asChild className="w-full">
                    <Link href={`/boeking?service=${activeService.id}`}>
                      Direct Boeken
                    </Link>
                  </Button>
                </div>

                {/* No-surprise card */}
                <div className="card-heritage p-5">
                  <div className="flex items-start gap-3">
                    <Euro className="h-5 w-5 text-gold-DEFAULT mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-primary-800 mb-1">
                        Geen verborgen kosten
                      </p>
                      <p className="text-xs text-secondary-500 leading-relaxed">
                        Geen voorrijkosten, geen nachttoeslagen, geen verassingen achteraf.
                        U betaalt exact het gildetarief.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-heritage p-5">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gold-DEFAULT mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-primary-800 mb-1">
                        Gegarandeerd binnen {activeService.responseTime}
                      </p>
                      <p className="text-xs text-secondary-500 leading-relaxed">
                        Ons dispatch-systeem stuurt direct de dichtstbijzijnde vrije vakman naar u toe.
                      </p>
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
