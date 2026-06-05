import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Shield, Award } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF, EMAIL, NAV_ITEMS } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-cream/80 border-t border-gold-DEFAULT/15">

      {/* ── Top band — emergency strip ── */}
      <div className="bg-primary-800 border-b border-gold-DEFAULT/20">
        <div className="container-vg py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-success-DEFAULT animate-pulse" />
              <span className="text-sm font-semibold text-cream">
                24/7 Beschikbaar — Nu gilde-loodgieters vrij in uw regio
              </span>
            </div>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-gold-DEFAULT font-bold text-lg
                         hover:text-gold-light transition-colors duration-150"
            >
              <Phone className="h-5 w-5" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container-vg py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            {/* Logo mark */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full border-2 border-gold-DEFAULT
                              flex items-center justify-center bg-primary-700 shrink-0">
                <span className="font-display font-bold text-gold-DEFAULT text-sm">VG</span>
              </div>
              <div>
                <p className="font-display font-bold text-cream text-base leading-none">
                  Van Goolen &amp; Zonen
                </p>
                <p className="text-[10px] tracking-[0.16em] uppercase text-gold-DEFAULT/70 mt-1">
                  Algemeene Loodgieters Gilde
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-cream/60 mb-5">
              Gecertificeerde gilde-loodgieters voor acute problemen. Vaste tarieven,
              geen verrassingen — al generaties lang betrouwbaar in nood.
            </p>
            {/* Trust badges */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-gold-DEFAULT/80">
                <Shield className="h-3.5 w-3.5 text-gold-DEFAULT shrink-0" />
                Erkend Vakmanschap · Gilde-Keurmerk
              </div>
              <div className="flex items-center gap-2 text-xs text-gold-DEFAULT/80">
                <Award className="h-3.5 w-3.5 text-gold-DEFAULT shrink-0" />
                Gecertificeerde ZZP Gilde-Partners
              </div>
            </div>
          </div>

          {/* Col 2 — Diensten */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-4">
              Onze Diensten
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Lekkage Opsporen & Dichten", href: "/diensten#lekkage" },
                { label: "Riool- & Afvoerverstopping", href: "/diensten#verstopping" },
                { label: "Cv-Ketel Storingsdiagnose",  href: "/diensten#cv-storing" },
                { label: "Alle Diensten Bekijken",     href: "/diensten" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold-DEFAULT transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Links */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-4">
              Navigatie
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ...NAV_ITEMS,
                { label: "Direct Boeken", href: "/boeking" },
                { label: "Privacybeleid", href: "/privacy" },
                { label: "Algemene Voorwaarden", href: "/voorwaarden" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold-DEFAULT transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-display font-semibold text-cream text-base mb-4">
              Contact & Spoed
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-start gap-3 text-sm group"
                >
                  <Phone className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" />
                  <span className="text-cream/70 group-hover:text-gold-DEFAULT transition-colors">
                    {PHONE_NUMBER}
                    <span className="block text-xs text-cream/40 mt-0.5">24/7 Spoedlijn</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-3 text-sm group"
                >
                  <Mail className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" />
                  <span className="text-cream/70 group-hover:text-gold-DEFAULT transition-colors">
                    {EMAIL}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" />
                <span className="text-cream/70">
                  Amsterdam, Rotterdam, Den Haag, Utrecht &amp; omgeving
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="h-4 w-4 text-gold-DEFAULT mt-0.5 shrink-0" />
                <span className="text-cream/70">
                  365 dagen per jaar
                  <span className="block text-xs text-cream/40 mt-0.5">
                    Geen toeslag voor avond/nacht/weekend
                  </span>
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gold-DEFAULT/10">
        <div className="container-vg py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/40">
            <p>
              &copy; {currentYear} Van Goolen &amp; Zonen B.V. — Algemeene Loodgieters Gilde.
              Alle rechten voorbehouden.
            </p>
            <p className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-DEFAULT/50" />
              KvK 12345678 · BTW NL123456789B01
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
