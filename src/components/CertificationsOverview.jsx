import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "./CategoryCard";
import { categories } from "../data/certifications";
import { Link } from "react-router-dom";
import { Award, ArrowRight, Sparkles } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function CertificationsOverview() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.1);
  const [ctaRef, ctaVisible] = useInView(0.3);

  const totalCerts = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 bg-[#D8CFB0] overflow-hidden">

      {/* Background glows */}
      <div className="absolute w-[600px] h-[600px] bg-[#CDB77F] rounded-full blur-[180px] opacity-[0.18] top-0 -left-60 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] rounded-full blur-[160px] opacity-[0.15] bottom-0 -right-40 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-[#7A4530] rounded-full blur-[120px] opacity-[0.10] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          className="text-center mb-10 md:mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(155,95,63,0.12)", border: "1px solid rgba(155,95,63,0.2)" }}
          >
            <Award size={14} style={{ color: "#9B5F3F" }} />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#9B5F3F]">
              Credentials &amp; Achievements
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3D200E] mb-5 leading-tight">
            My <span style={{ color: "#9B5F3F" }}>Certifications</span>
          </h2>

          <p className="text-[#6F4A2D]/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Professional certifications and learning milestones across development,
            application engineering, and modern data technologies.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #CDB77F)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#9B5F3F", boxShadow: "0 0 8px #9B5F3F80" }} />
            <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, #CDB77F, transparent)" }} />
          </div>

          {/* Stats strip */}
          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
            {[
              { label: "Total Certifications", value: totalCerts },
              { label: "Categories", value: categories.length },
              { label: "Years Learning", value: "3+" },
            ].map(({ label, value }, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-6 py-3 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.35)",
                  border: "1px solid rgba(205,183,127,0.25)",
                  backdropFilter: "blur(12px)",
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <span className="text-2xl font-bold font-serif" style={{ color: "#9B5F3F" }}>{value}</span>
                <span className="text-[11px] uppercase tracking-widest font-medium text-[#6F4A2D]/60 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Category Grid ── */}
        <div ref={gridRef} className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              visible={gridVisible}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          ref={ctaRef}
          className="flex justify-center mt-16"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          <Link
            to="/certifications"
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #9B5F3F 0%, #7A4530 100%)",
              boxShadow: "0 8px 32px rgba(155,95,63,0.4)",
            }}
          >
            <span className="relative z-10">View All Certifications</span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            {/* Shimmer */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)", backgroundSize: "250% 100%", animation: "ctaShimmer 1.8s infinite linear" }}
            />
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes ctaShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
}

export default CertificationsOverview;