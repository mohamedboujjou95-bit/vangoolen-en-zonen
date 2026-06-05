"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/lib/data";

export function FaqSection() {
  return (
    <section className="section bg-cream">
      <div className="container-vg">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="overline mb-3">Veel Gestelde Vragen</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-800 mt-3">
              Alles Wat U Wilt Weten
            </h2>
            <div className="gold-rule-center mt-4" />
          </div>

          {/* Accordion */}
          <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className={cn(
                  "card-heritage overflow-hidden",
                  "data-[state=open]:border-gold-DEFAULT/40",
                  "data-[state=open]:shadow-card-md"
                )}
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "w-full flex items-center justify-between gap-4",
                      "px-6 py-4 text-left",
                      "font-display font-semibold text-base text-primary-800",
                      "hover:text-gold-dark transition-colors duration-150",
                      "group focus-visible:outline-none"
                    )}
                  >
                    {item.question}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gold-DEFAULT shrink-0 transition-transform duration-300",
                        "group-data-[state=open]:rotate-180"
                      )}
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  className={cn(
                    "overflow-hidden text-sm text-secondary-600 leading-relaxed",
                    "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-in"
                  )}
                >
                  <p className="px-6 pb-5 pt-0">{item.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

        </div>
      </div>
    </section>
  );
}
