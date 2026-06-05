import { HeroSection }            from "@/components/sections/hero";
import { GildeBeloftenSection }   from "@/components/sections/gilde-beloften";
import { TariefCalculatorSection } from "@/components/sections/tarief-calculator";
import { ReviewsSection }         from "@/components/sections/reviews";
import { FaqSection }             from "@/components/sections/faq";
import { CtaBannerSection }       from "@/components/sections/cta-banner";
import { Navbar }                 from "@/components/layout/navbar";
import { Footer }                 from "@/components/layout/footer";
import type { Metadata }          from "next";

export const metadata: Metadata = {
  title: "Van Goolen & Zonen — Algemeene Loodgieters Gilde | Binnen 2 Uur",
  description:
    "Gecertificeerde gilde-loodgieters binnen 2 uur aan uw deur. Vaste gildetarieven zonder verrassingen. Lekkages, rioolverstopping, cv-ketel storing.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <GildeBeloftenSection />
        <TariefCalculatorSection />
        <ReviewsSection />
        <FaqSection />
        <CtaBannerSection />
      </main>
      <Footer />
    </>
  );
}
