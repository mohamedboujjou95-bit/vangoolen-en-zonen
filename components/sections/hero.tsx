"use client";

import React from "react";
import Link from "next/link";
import { Phone, ChevronRight, Clock, ShieldCheck, Star } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-bg">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(197,160,89,0.03) 60px, rgba(197,160,89,0.03) 61px)" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(197,160,89,0.07) 0%, transparent 65%)" }} />

      <div className="container-vg relative z-10 pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-5 h-px bg-gold-DEFAULT" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-DEFAULT font-body">
              Algemeene Loodgieters Gilde — Gecertificeerd Vakmanschap
            </span>
            <span className="w-5 h-px bg-gold-DEFAULT" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-display font-bold text-cream leading-[1.08] tracking-tight mb-6">
            Binnen{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-gold-gradient">2 uur</span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-DEFAULT/50 rounded" />
            </span>{" "}
            een gecertificeerde<br className="hidden sm:block" />{" "}
            gilde-loodgieter aan de deur.
          </h1>

          <p className="text-lg md:text-xl text-cream/70 font-body leading-relaxed mb-8 max-w-xl">
            Vaste gildetarieven, geen verrassingen achteraf. Lekkages, rioolverstopping,
            cv-storing — wij lossen het definitief op bij het eerste bezoek.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { icon: ShieldCheck, text: "100% Transparante Tarieven" },
              { icon: Clock, text: "Geen Toeslag Avond & Weekend" },
              { icon: Star, text: "4.8 / 5 Klantbeoordeling" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-cream/60">
                <Icon className="h-4 w-4 text-gold-DEFAULT shrink-0" />
                {text}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/boeking" className="inline-flex items-center justify-center gap-2 h-14 px-9 text-base font-bold rounded bg-gold-DEFAULT text-primary-800 border border-gold-DEFAULT hover:bg-gold-dark hover:text-white transition-all duration-200 shadow-gold hover:shadow-gold-lg">
              Direct Gilde-Loodgieter Boeken
              <ChevronRight className="h-5 w-5" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 h-14 px-9 text-base font-semibold rounded bg-transparent text-gold-DEFAULT border-2 border-gold-DEFAULT hover:bg-gold-DEFAULT hover:text-primary-800 transition-all duration-200">
              <Phone className="h-5 w-5" />
              {PHONE_NUMBER}
            </a>
          </div>

          <p className="mt-5 text-xs text-cream/40 font-body">
            Boek online in 2 minuten · Geen aanbetaling vereist · Afrekening aan de deur
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-14 text-cream" preserveAspectRatio="none">
          <path d="M0 56L48 48C96 40 192 24 288 18.7C384 13.3 480 18.7 576 26.7C672 34.7 768 45.3 864 45.3C960 45.3 1056 34.7 1152 29.3C1248 24 1344 24 1392 24L1440 24V56H1392C1344 56 1248 56 1152 56C1056 56 960 56 864 56C768 56 672 56 576 56C480 56 384 56 288 56C192 56 96 56 48 56H0V56Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
}
