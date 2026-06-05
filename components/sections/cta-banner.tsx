import React from "react";
import Link from "next/link";
import { Phone, ChevronRight } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/data";

export function CtaBannerSection() {
  return (
    <section style={{background:"#1a3a6b",padding:"4rem 0",position:"relative",overflow:"hidden",borderTop:"1px solid rgba(197,160,89,0.2)",borderBottom:"1px solid rgba(197,160,89,0.2)"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 80% at 50% 50%, rgba(197,160,89,0.07) 0%, transparent 70%)",pointerEvents:"none"}} />
      <div className="container-vg" style={{position:"relative",zIndex:1,textAlign:"center"}}>
        <h2 className="font-display font-bold" style={{color:"#FDFAF6",fontSize:"clamp(1.75rem,3vw,2.4rem)",marginBottom:"1rem"}}>
          Heeft u een acute noodsituatie?
        </h2>
        <p style={{color:"rgba(253,250,246,0.75)",marginBottom:"2rem",maxWidth:"400px",margin:"0 auto 2rem",fontSize:"1rem"}}>
          Bel direct of boek online. Wij zijn er altijd — dag en nacht, ook in het weekend.
        </p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="/boeking" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"3.5rem",padding:"0 2.25rem",borderRadius:"0.375rem",background:"#C5A059",color:"#1a3a6b",fontWeight:700,fontSize:"1rem",textDecoration:"none",border:"1px solid #C5A059"}}>
            Nu Online Boeken <ChevronRight style={{height:"1.25rem",width:"1.25rem"}} />
          </Link>
          <a href={PHONE_HREF} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",height:"3.5rem",padding:"0 2.25rem",borderRadius:"0.375rem",background:"transparent",color:"#FDFAF6",fontWeight:600,fontSize:"1rem",textDecoration:"none",border:"2px solid rgba(255,255,255,0.5)"}}>
            <Phone style={{height:"1.25rem",width:"1.25rem"}} /> {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  );
}
