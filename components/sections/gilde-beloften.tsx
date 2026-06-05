import React from "react";
import { Clock, ShieldCheck, Award } from "lucide-react";
import { GILDE_BELOFTEN, STATS } from "@/lib/data";

type GildeIconName = "Clock" | "ShieldCheck" | "Award";

const ICON_MAP: Record<GildeIconName, React.ElementType> = {
  Clock, ShieldCheck, Award,
};

export function GildeBeloftenSection() {
  return (
    <section className="section bg-cream">
      <div className="container-vg">

        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="overline mb-4">Onze Garanties</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-800 mt-3">
            De Drie Gilde-Beloften
          </h2>
          <div className="gold-rule-center mt-4" />
          <p className="text-secondary-600 mt-4 leading-relaxed">
            Het fundament van Van Goolen &amp; Zonen is gebouwd op drie onwrikbare principes.
            Hier houden wij ons aan — zonder uitzonderingen.
          </p>
        </div>

        {/* Three promise cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {GILDE_BELOFTEN.map((belofte) => {
            const Icon = ICON_MAP[belofte.iconName as GildeIconName] ?? ShieldCheck;
            return (
              <div
                key={belofte.number}
                className="card-heritage p-8 text-center group"
              >
                {/* Roman numeral */}
                <div className="inline-flex items-center justify-center w-14 h-14
                                rounded-full border-2 border-gold-DEFAULT
                                bg-primary-800 text-gold-DEFAULT
                                font-display font-bold text-xl mb-5
                                group-hover:bg-gold-DEFAULT group-hover:text-primary-800
                                transition-all duration-300">
                  {belofte.number}
                </div>
                <h3 className="font-display font-bold text-xl text-primary-800 mb-3">
                  {belofte.title}
                </h3>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  {belofte.description}
                </p>
                {/* Gold accent line */}
                <div className="gold-rule-center mt-5 opacity-0 group-hover:opacity-100
                                transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-primary-800 rounded-lg p-6 text-center border border-gold-DEFAULT/15"
            >
              <p className="font-display font-bold text-2xl md:text-3xl text-gold-DEFAULT mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-cream/60 uppercase tracking-wider font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
