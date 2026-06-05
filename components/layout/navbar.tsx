"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, PHONE_NUMBER, PHONE_HREF, EMERGENCY_LABEL } from "@/lib/data";

export function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-primary-900/98 backdrop-blur-md shadow-blue py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container-vg">
          <nav className="flex items-center justify-between h-[52px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              onClick={() => setIsOpen(false)}
            >
              {/* Gilde seal mark */}
              <div className="relative w-10 h-10 rounded-full border-2 border-gold-DEFAULT
                              flex items-center justify-center bg-primary-800
                              group-hover:border-gold-light transition-colors duration-200">
                <span className="font-display font-bold text-gold-DEFAULT text-xs leading-none">
                  VG
                </span>
              </div>
              <div className="leading-none">
                <span className="block font-display font-bold text-cream text-lg tracking-tight">
                  Van Goolen <span className="text-gold-DEFAULT">&amp;</span> Zonen
                </span>
                <span className="block text-[10px] tracking-[0.18em] uppercase text-gold-DEFAULT/80 font-body mt-0.5">
                  Algemeene Loodgieters Gilde
                </span>
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded text-sm font-medium text-cream/80",
                      "hover:text-gold-DEFAULT hover:bg-white/5",
                      "transition-all duration-150"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-cream/90 hover:text-gold-DEFAULT
                           text-sm font-medium transition-colors duration-150"
              >
                <Phone className="h-4 w-4 text-gold-DEFAULT" />
                {PHONE_NUMBER}
              </a>
              <Button
                variant="gold"
                size="md"
                asChild
              >
                <Link href="/boeking">
                  Direct Boeken
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* ── Mobile: phone + hamburger ── */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-1.5 text-cream text-sm font-semibold
                           bg-gold-DEFAULT/15 border border-gold-DEFAULT/30 rounded px-3 py-1.5
                           hover:bg-gold-DEFAULT/25 transition-colors"
                aria-label="Bel ons"
              >
                <Phone className="h-3.5 w-3.5 text-gold-DEFAULT" />
                <span className="hidden sm:inline">Bel Nu</span>
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 flex items-center justify-center rounded
                           text-cream hover:bg-white/10 transition-colors"
                aria-label="Menu openen"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </nav>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-primary-900/60 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-80 max-w-[90vw]",
            "bg-primary-900 border-l border-gold-DEFAULT/20",
            "flex flex-col transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-5 border-b border-gold-DEFAULT/15">
            <div>
              <p className="font-display font-bold text-cream">Van Goolen &amp; Zonen</p>
              <p className="text-xs text-gold-DEFAULT/80 tracking-widest uppercase mt-0.5">
                Loodgieters Gilde
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded text-cream/60
                         hover:text-cream hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto p-5">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded
                               text-cream/80 hover:text-gold-DEFAULT hover:bg-white/5
                               text-sm font-medium transition-all duration-150"
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4 opacity-40" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom CTAs */}
          <div className="p-5 border-t border-gold-DEFAULT/15 flex flex-col gap-3">
            <Button variant="gold" size="lg" asChild className="w-full">
              <Link href="/boeking" onClick={() => setIsOpen(false)}>
                Direct Boeken
              </Link>
            </Button>
            <Button variant="outline-gold" size="lg" asChild className="w-full">
              <a href={PHONE_HREF}>
                <Phone className="h-4 w-4" />
                {PHONE_NUMBER}
              </a>
            </Button>
            <p className="text-center text-xs text-gold-DEFAULT/60 tracking-widest uppercase mt-1">
              {EMERGENCY_LABEL} · 365 Dagen Per Jaar
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
