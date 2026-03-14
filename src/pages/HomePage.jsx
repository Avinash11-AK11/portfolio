import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import ProjectsOverview from "../components/ProjectsOverview";
import CertificationsOverview from "../components/CertificationsOverview";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Sparkles } from "lucide-react";

function useInView(threshold = 0.2) {
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

function HomePage() {
  const [sectionRef, sectionVisible] = useInView(0.15);

  return (
    <div className="bg-[#D8CFB0]">

      {/* Hero Section */}
      <Hero />

      {/* Projects */}
      <ProjectsOverview />

      {/* Certifications */}
      <CertificationsOverview />

      {/* ── Let's Work Together ── */}
      <section
        id="contact"
        className="relative py-20 md:py-36 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #D8CFB0 0%, #E8DFBF 40%, #EFE7CF 100%)" }}
      >
        {/* Top fade from previous section */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#D8CFB0] to-transparent pointer-events-none" />

        {/* Background glows */}
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.22] -top-32 -left-48 pointer-events-none"
          style={{ background: "#CDB77F" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.18] -bottom-40 -right-40 pointer-events-none"
          style={{ background: "#9B5F3F" }} />

        {/* Decorative ring — top center */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(205,183,127,0.18)",
            boxShadow: "inset 0 0 80px rgba(205,183,127,0.06)",
          }}
        />
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(155,95,63,0.12)" }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10" ref={sectionRef}>

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(155,95,63,0.10)",
              border: "1px solid rgba(155,95,63,0.20)",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <Sparkles size={13} style={{ color: "#9B5F3F" }} />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#9B5F3F]">
              Open to Opportunities
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-[#3D200E] leading-tight mb-6"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            Let's Work{" "}
            <span
              className="relative inline-block"
              style={{ color: "#9B5F3F" }}
            >
              Together
              {/* Underline accent */}
              <span
                className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, #CDB77F, #9B5F3F, transparent)",
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
                }}
              />
            </span>
          </h2>

          {/* Body text */}
          <p
            className="text-lg md:text-xl text-[#6F4A2D]/75 leading-relaxed max-w-2xl mx-auto mb-12"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            I'm always open to collaborating on exciting projects, internships,
            and innovative ideas. If you have an opportunity or project in mind,
            feel free to reach out.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.32s, transform 0.7s ease 0.32s",
            }}
          >
            {/* Primary CTA */}
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #9B5F3F 0%, #7A4530 100%)",
                boxShadow: "0 8px 32px rgba(155,95,63,0.38), 0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              <Mail size={18} className="relative z-10" />
              <span className="relative z-10 tracking-wide">Get In Touch</span>
              <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              {/* Shimmer */}
              <span className="absolute inset-0 cta-shimmer" />
            </Link>

            {/* Secondary outline */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{
                color: "#6F4A2D",
                border: "1.5px solid rgba(155,95,63,0.35)",
                background: "rgba(255,255,255,0.35)",
                backdropFilter: "blur(10px)",
              }}
            >
              View My Work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Bottom ornament */}
          <div
            className="flex items-center justify-center gap-3 mt-16"
            style={{
              opacity: sectionVisible ? 0.5 : 0,
              transition: "opacity 0.8s ease 0.5s",
            }}
          >
            <div className="h-px w-12 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #9B5F3F)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CDB77F" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "#9B5F3F" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CDB77F" }} />
            <div className="h-px w-12 rounded-full" style={{ background: "linear-gradient(90deg, #9B5F3F, transparent)" }} />
          </div>

        </div>

        <style>{`
          .cta-shimmer {
            background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.20) 50%, transparent 65%);
            background-size: 250% 100%;
            animation: ctaShimmerHP 2.8s infinite linear;
          }
          @keyframes ctaShimmerHP {
            0%   { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      </section>

    </div>
  );
}

export default HomePage;