import React from "react";
import Link from "next/link";
import { Phone, ChevronRight } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/data";

export function CtaBannerSection() {
  return (
    <section className="section-sm bg-primary-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-DEFAULT to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-DEFAULT to-transparent opacity-40" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(197,160,89,0.06) 0%, transparent 70%)" }} />
      <div className="container-vg relative z-10 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-cream mb-4">
          Heeft u een acute noodsituatie?
        </h2>
        <p className="text-cream/60 mb-8 max-w-md mx-auto">
          Bel direct of boek online. Wij zijn er altijd — dag en nacht, ook in het weekend en op feestdagen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/boeking" className="inline-flex items-center justify-center gap-2 h-14 px-9 text-base font-bold rounded bg-gold-DEFAULT text-primary-800 border border-gold-DEFAULT hover:bg-gold-dark hover:text-white transition-all duration-200 shadow-gold">
            Nu Online Boeken
            <ChevronRight className="h-5 w-5" />
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 h-14 px-9 text-base font-semibold rounded bg-transparent text-gold-DEFAULT border-2 border-gold-DEFAULT hover:bg-gold-DEFAULT hover:text-primary-800 transition-all duration-200">
            <Phone className="h-5 w-5" />
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  );
}
