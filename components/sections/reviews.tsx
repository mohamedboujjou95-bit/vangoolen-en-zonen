import React from "react";
import { Quote } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { REVIEWS } from "@/lib/data";

export function ReviewsSection() {
  return (
    <section className="section bg-cream-200">
      <div className="container-vg">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="overline mb-3">Klantbeoordelingen</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-800 mt-3">
            Wat Onze Klanten Zeggen
          </h2>
          <div className="gold-rule-center mt-4" />
          <div className="flex items-center justify-center gap-3 mt-4">
            <StarRating rating={4.8} size="lg" />
            <span className="font-display font-bold text-primary-800 text-lg">4.8 / 5</span>
            <span className="text-secondary-500 text-sm">op basis van 900+ beoordelingen</span>
          </div>
        </div>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className={[
                "card-heritage p-6 flex flex-col",
                i === 0 ? "lg:col-span-1 md:col-span-2 lg:md:col-span-1" : "",
              ].join(" ")}
            >
              {/* Top: stars + service */}
              <div className="flex items-start justify-between mb-4">
                <StarRating rating={review.rating} />
                <span className="text-xs text-secondary-400 bg-cream-200 px-2 py-0.5 rounded font-body">
                  {review.service}
                </span>
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quote className="h-6 w-6 text-gold-DEFAULT/30 absolute -top-1 -left-1" />
                <p className="text-sm text-secondary-700 leading-relaxed pl-4 font-body">
                  {review.text}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gold-DEFAULT/15">
                <div className="w-9 h-9 rounded-full bg-primary-800 flex items-center justify-center
                                text-cream text-sm font-display font-bold shrink-0">
                  {review.author.charAt(0)}
                </div>
                <div className="leading-none">
                  <p className="text-sm font-semibold text-primary-800">{review.author}</p>
                  <p className="text-xs text-secondary-400 mt-0.5">{review.location} · {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
