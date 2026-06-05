import React from "react";
import { REVIEWS } from "@/lib/data";

export function ReviewsSection() {
  return (
    <section style={{background:"#f7f1e4",padding:"5rem 0"}}>
      <div className="container-vg">
        <div style={{textAlign:"center",maxWidth:"540px",margin:"0 auto 3rem"}}>
          <span className="overline mb-3">Klantbeoordelingen</span>
          <h2 className="font-display font-bold" style={{fontSize:"clamp(1.75rem,3vw,2.4rem)",color:"#0e1f42",marginTop:"0.75rem"}}>Wat Onze Klanten Zeggen</h2>
          <div className="gold-rule-center" />
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.75rem",marginTop:"1rem"}}>
            <span style={{color:"#C5A059",fontSize:"1.25rem",letterSpacing:"2px"}}>★★★★★</span>
            <strong style={{fontFamily:"var(--font-display)",fontSize:"1.2rem",color:"#0e1f42"}}>4.8 / 5</strong>
            <span style={{color:"#6e6257",fontSize:"0.875rem"}}>op basis van 900+ beoordelingen</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.25rem"}}>
          {REVIEWS.map((review) => (
            <div key={review.id} className="card-heritage" style={{padding:"1.5rem",display:"flex",flexDirection:"column"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.875rem"}}>
                <span style={{color:"#C5A059",fontSize:"1rem",letterSpacing:"1px"}}>{"★".repeat(review.rating)}</span>
                <span style={{fontSize:"0.7rem",color:"#6e6257",background:"#f7f1e4",padding:"0.2rem 0.625rem",borderRadius:"999px"}}>{review.service}</span>
              </div>
              <p style={{fontSize:"0.875rem",color:"#334155",lineHeight:1.7,paddingLeft:"1rem",borderLeft:"2px solid #C5A059",flex:1,marginBottom:"1.25rem"}}>{review.text}</p>
              <div style={{display:"flex",alignItems:"center",gap:"0.75rem",paddingTop:"1rem",borderTop:"1px solid rgba(197,160,89,0.15)"}}>
                <div style={{width:"2.25rem",height:"2.25rem",borderRadius:"50%",background:"#1a3a6b",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.875rem",fontWeight:700,color:"#FDFAF6",fontFamily:"var(--font-display)",flexShrink:0}}>{review.author.charAt(0)}</div>
                <div>
                  <p style={{fontSize:"0.8125rem",fontWeight:600,color:"#0e1f42"}}>{review.author}</p>
                  <p style={{fontSize:"0.7rem",color:"#a89e90",marginTop:"0.1rem"}}>{review.location} · {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
