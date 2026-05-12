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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
        className="relative py-20 md:py-40 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #D8CFB0 0%, #E8DFBF 35%, #EFEAD8 100%)" }}
        onMouseMove={handleMouseMove}
      >
        {/* Top fade from previous section */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#D8CFB0] to-transparent pointer-events-none" />

        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient mesh layer 1 */}
          <div className="absolute inset-0 animate-ctaGradientShift" 
            style={{ background: "linear-gradient(135deg, rgba(205,183,127,0.15) 0%, rgba(155,95,63,0.08) 50%, rgba(232,201,160,0.12) 100%)" }} 
          />
          
          {/* Morphing blob - top left */}
          <div className="absolute w-[600px] h-[600px] -top-1/3 -left-1/4 rounded-full blur-3xl opacity-20 animate-ctaBlobMorph1" 
            style={{ background: "radial-gradient(circle at 30% 30%, rgba(205,183,127,0.4), rgba(155,95,63,0.1))" }} 
          />
          
          {/* Morphing blob - bottom right */}
          <div className="absolute w-[700px] h-[700px] -bottom-1/3 -right-1/4 rounded-full blur-3xl opacity-18 animate-ctaBlobMorph2" 
            style={{ background: "radial-gradient(circle at 70% 70%, rgba(155,95,63,0.35), rgba(232,201,160,0.08))" }} 
          />

          {/* Additional Morphing blob - top right */}
          <div className="absolute w-[500px] h-[500px] -top-1/4 -right-1/3 rounded-full blur-3xl opacity-15 animate-ctaBlobMorph3" 
            style={{ background: "radial-gradient(circle at 40% 60%, rgba(205,183,127,0.3), rgba(155,95,63,0.08))" }} 
          />

          {/* Additional Morphing blob - bottom left */}
          <div className="absolute w-[550px] h-[550px] -bottom-1/4 -left-1/3 rounded-full blur-3xl opacity-12 animate-ctaBlobMorph4" 
            style={{ background: "radial-gradient(circle at 60% 40%, rgba(155,95,63,0.25), rgba(232,201,160,0.06))" }} 
          />
          
          {/* Orbital ring element */}
          <div className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ctaOrbitalRotate pointer-events-none">
            <div className="absolute inset-0 rounded-full" 
              style={{ 
                border: "1px solid rgba(205,183,127,0.12)",
                boxShadow: "inset 0 0 120px rgba(205,183,127,0.08)"
              }} 
            />
            <div className="absolute w-3 h-3 bg-[#CDB77F] rounded-full top-0 left-1/2 -translate-x-1/2 blur-sm opacity-40" />
          </div>

          {/* Reverse orbital ring */}
          <div className="absolute w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ctaOrbitalRotateReverse pointer-events-none">
            <div className="absolute inset-0 rounded-full" 
              style={{ 
                border: "1px solid rgba(205,183,127,0.08)",
                boxShadow: "inset 0 0 150px rgba(205,183,127,0.05)"
              }} 
            />
          </div>
          
          {/* Subtle depth layer */}
          <div className="absolute inset-0 animate-ctaDepthShift" 
            style={{ background: "linear-gradient(180deg, transparent 0%, rgba(155,95,63,0.03) 50%, transparent 100%)" }} 
          />
        </div>

        {/* Decorative rings with animations */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full pointer-events-none animate-ctaRingPulse"
          style={{
            border: "1px solid rgba(205,183,127,0.18)",
            boxShadow: "inset 0 0 80px rgba(205,183,127,0.06)",
          }}
        />
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ 
            border: "1px solid rgba(155,95,63,0.12)",
            animation: "ctaRingPulse 6s ease-in-out infinite"
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10" ref={sectionRef}>
          {/* Animated floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-30"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  background: i % 2 === 0 ? "#CDB77F" : "#9B5F3F",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `ctaFloatParticle${(i % 6) + 1} ${4 + i}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full mb-10 animate-ctaSlideInDown hover:scale-105 transition-transform duration-300 group"
            style={{
              background: "rgba(155,95,63,0.14)",
              border: "1.5px solid rgba(155,95,63,0.28)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 24px rgba(155,95,63,0.12)",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.34,1.56,.64,1)"
            }}
          >
            <Sparkles size={14} style={{ color: "#9B5F3F" }} className="animate-ctaPulseIcon" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#9B5F3F]">
              % Open to Opportunities
            </span>
          </div>

          {/* Animated lines above heading */}
          <div className="flex items-center justify-center gap-4 mb-8" style={{ opacity: sectionVisible ? 1 : 0, transition: "opacity 0.8s ease 0.15s" }}>
            <div className="h-px w-12 rounded-full animate-ctaLineExpandLeft" style={{ background: "linear-gradient(90deg, transparent, rgba(155,95,63,0.5))" }} />
            <div className="w-2 h-2 rounded-full animate-ctaPulseGlowSmall" style={{ background: "#CDB77F", boxShadow: "0 0 8px rgba(205,183,127,0.6)" }} />
            <div className="h-px w-12 rounded-full animate-ctaLineExpandRight" style={{ background: "linear-gradient(90deg, rgba(155,95,63,0.5), transparent)" }} />
          </div>

          {/* Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-[#3D200E] leading-tight mb-8 animate-ctaSlideInDown"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(.34,1.56,.64,1) 0.1s",
              animationDelay: "0.1s"
            }}
          >
            Let's Work{" "}
            <span
              className="relative inline-block animate-ctaGlowText"
              style={{ color: "#9B5F3F" }}
            >
              Together
              {/* Animated underline accent */}
              <span
                className="absolute -bottom-3 left-0 h-[4px] rounded-full"
                style={{
                  width: sectionVisible ? "100%" : "0%",
                  background: "linear-gradient(90deg, #CDB77F, #9B5F3F, #CDB77F)",
                  boxShadow: sectionVisible ? "0 0 16px rgba(155,95,63,0.5)" : "none",
                  transition: "width 0.8s cubic-bezier(.34,1.56,.64,1) 0.4s, box-shadow 0.8s ease 0.4s",
                }}
              />
            </span>
          </h2>

          {/* Body text */}
          <p
            className="text-lg md:text-xl text-[#6F4A2D]/80 leading-relaxed max-w-3xl mx-auto mb-14 font-light animate-ctaFadeInUp"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(.34,1.56,.64,1) 0.2s",
            }}
          >
            I'm always open to collaborating on exciting projects, internships,
            and innovative ideas. If you have an opportunity or project in mind,
            feel free to reach out.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.35s, transform 0.8s cubic-bezier(.34,1.56,.64,1) 0.35s",
            }}
          >
            {/* Primary CTA */}
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #9B5F3F 0%, #7A4530 100%)",
                boxShadow: "0 16px 48px rgba(155,95,63,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)"
              }}
            >
              <Mail size={18} className="relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-ctaIconBounce" />
              <span className="relative z-10 tracking-wide text-lg transition-all duration-300">Get In Touch</span>
              <ArrowRight 
                size={18} 
                className="relative z-10 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-110" 
              />
              {/* Shine effect */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700" 
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} 
                />
              </div>
              {/* Glow on hover */}
              <div className="absolute -inset-2 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-full" 
                style={{background: "linear-gradient(135deg, rgba(155,95,63,0.5), rgba(205,183,127,0.3))"}} 
              />
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold transition-all duration-500 hover:scale-110"
              style={{
                color: "#3D200E",
                border: "2px solid rgba(155,95,63,0.35)",
                background: "rgba(255,255,255,0.45)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)"
              }}
            >
              <span className="relative z-10 tracking-wide text-lg transition-all duration-300">View My Work</span>
              <ArrowRight 
                size={18} 
                className="relative z-10 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-110"
                style={{ color: "#9B5F3F" }}
              />
              {/* Hover background shift */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                style={{ background: "rgba(155,95,63,0.06)" }}
              />
            </Link>
          </div>

          {/* Bottom animated ornament with more elements */}
          <div
            className="flex items-center justify-center gap-4 mt-20"
            style={{
              opacity: sectionVisible ? 0.7 : 0,
              transition: "opacity 0.8s ease 0.6s",
            }}
          >
            <div className="h-px w-12 rounded-full animate-ctaLineExpandLeft" style={{ background: "linear-gradient(90deg, transparent, rgba(155,95,63,0.6))" }} />
            
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === 1 ? 10 : 8,
                    height: i === 1 ? 10 : 8,
                    background: i === 1 ? "#9B5F3F" : "#CDB77F",
                    boxShadow: i === 1 ? "0 0 12px rgba(155,95,63,0.6)" : "0 0 8px rgba(205,183,127,0.4)",
                    animation: `ctaDotsFloat 2s ease-in-out ${i * 0.2}s infinite`
                  }}
                />
              ))}
            </div>

            <div className="h-px w-12 rounded-full animate-ctaLineExpandRight" style={{ background: "linear-gradient(90deg, rgba(155,95,63,0.6), transparent)" }} />
          </div>
          
          {/* Animated accent line above buttons */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full animate-ctaAccentLineWidth" 
            style={{ background: "linear-gradient(90deg, transparent, rgba(205,183,127,0.4), transparent)", opacity: sectionVisible ? 0.6 : 0, transition: "opacity 0.8s ease 0.5s" }} 
          />

        </div>

        <style>{`
          /* Entrance animations */
          .animate-ctaSlideInDown {
            animation: ctaSlideInDown 0.8s cubic-bezier(.34,1.56,.64,1) forwards;
          }

          .animate-ctaFadeInUp {
            opacity: 0;
            animation: ctaFadeInUp 0.8s cubic-bezier(.34,1.56,.64,1) forwards;
          }

          .animate-ctaPulseGlowSmall {
            animation: ctaPulseGlowSmall 2.5s ease-in-out infinite;
          }

          .animate-ctaLineExpandLeft {
            animation: ctaLineExpandLeft 0.9s cubic-bezier(.34,1.56,.64,1) forwards;
            transform-origin: right;
          }

          .animate-ctaLineExpandRight {
            animation: ctaLineExpandRight 0.9s cubic-bezier(.34,1.56,.64,1) forwards;
            transform-origin: left;
          }

          .animate-ctaIconBounce {
            animation: ctaIconBounce 2s ease-in-out infinite;
          }

          .animate-ctaAccentLineWidth {
            animation: ctaAccentLineWidth 1.2s cubic-bezier(.34,1.56,.64,1) forwards;
            animation-delay: 0.7s;
          }

          /* Professional background animations */
          .animate-ctaGradientShift {
            animation: ctaGradientShift 12s ease-in-out infinite;
          }

          .animate-ctaBlobMorph1 {
            animation: ctaBlobMorph1 16s ease-in-out infinite;
          }

          .animate-ctaBlobMorph2 {
            animation: ctaBlobMorph2 18s ease-in-out infinite;
          }

          .animate-ctaBlobMorph3 {
            animation: ctaBlobMorph3 17s ease-in-out infinite;
          }

          .animate-ctaBlobMorph4 {
            animation: ctaBlobMorph4 19s ease-in-out infinite;
          }

          .animate-ctaOrbitalRotate {
            animation: ctaOrbitalRotate 20s linear infinite;
          }

          .animate-ctaOrbitalRotateReverse {
            animation: ctaOrbitalRotateReverse 28s linear infinite;
          }

          .animate-ctaDepthShift {
            animation: ctaDepthShift 14s ease-in-out infinite;
          }

          /* ─── Keyframes ─── */
          @keyframes ctaSlideInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes ctaFadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes ctaGlowTextAnim {
            0%, 100% {
              color: #9B5F3F;
              text-shadow: 0 0 0px rgba(155,95,63,0);
            }
            50% {
              color: #B57347;
              text-shadow: 0 0 28px rgba(155,95,63,0.6);
            }
          }

          @keyframes ctaPulseIcon {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.7;
            }
          }

          @keyframes ctaExpandLeft {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              width: 48px;
              opacity: 1;
            }
          }

          @keyframes ctaExpandRight {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              width: 48px;
              opacity: 1;
            }
          }

          @keyframes ctaRingPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.18;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.28;
            }
          }

          @keyframes ctaGradientShift {
            0%, 100% {
              filter: hue-rotate(0deg) saturate(1);
              opacity: 0.8;
            }
            50% {
              filter: hue-rotate(8deg) saturate(1.1);
              opacity: 0.95;
            }
          }

          @keyframes ctaBlobMorph1 {
            0%, 100% {
              transform: translate(0, 0) scale(1) blur(200px);
              border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            }
            25% {
              transform: translate(-30px, -40px) scale(1.05) blur(200px);
              border-radius: 35% 65% 60% 40% / 35% 45% 55% 65%;
            }
            50% {
              transform: translate(40px, 30px) scale(1.1) blur(200px);
              border-radius: 60% 40% 45% 55% / 50% 60% 30% 60%;
            }
            75% {
              transform: translate(-20px, 50px) scale(1.02) blur(200px);
              border-radius: 45% 55% 50% 50% / 60% 35% 65% 40%;
            }
          }

          @keyframes ctaBlobMorph2 {
            0%, 100% {
              transform: translate(0, 0) scale(1) blur(200px);
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            25% {
              transform: translate(50px, -30px) scale(0.98) blur(200px);
              border-radius: 50% 50% 40% 60% / 50% 40% 60% 50%;
            }
            50% {
              transform: translate(-40px, 40px) scale(1.08) blur(200px);
              border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
            }
            75% {
              transform: translate(30px, -50px) scale(1.03) blur(200px);
              border-radius: 40% 60% 60% 40% / 40% 70% 30% 60%;
            }
          }

          @keyframes ctaBlobMorph3 {
            0%, 100% {
              transform: translate(0, 0) scale(1) blur(200px);
              border-radius: 50% 50% 40% 60% / 40% 60% 40% 60%;
            }
            33% {
              transform: translate(-50px, -50px) scale(1.1) blur(200px);
              border-radius: 30% 70% 50% 50% / 50% 50% 70% 30%;
            }
            66% {
              transform: translate(50px, 50px) scale(0.95) blur(200px);
              border-radius: 70% 30% 60% 40% / 40% 60% 30% 70%;
            }
          }

          @keyframes ctaBlobMorph4 {
            0%, 100% {
              transform: translate(0, 0) scale(1) blur(200px);
              border-radius: 60% 40% 50% 50% / 50% 50% 40% 60%;
            }
            25% {
              transform: translate(60px, -60px) scale(1.05) blur(200px);
              border-radius: 40% 60% 50% 50% / 50% 50% 60% 40%;
            }
            50% {
              transform: translate(-60px, 60px) scale(1.08) blur(200px);
              border-radius: 50% 50% 60% 40% / 60% 40% 50% 50%;
            }
            75% {
              transform: translate(40px, -40px) scale(0.98) blur(200px);
              border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%;
            }
          }

          @keyframes ctaOrbitalRotate {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          @keyframes ctaOrbitalRotateReverse {
            from {
              transform: translate(-50%, -50%) rotate(360deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(0deg);
            }
          }

          @keyframes ctaDepthShift {
            0%, 100% {
              opacity: 0.03;
            }
            50% {
              opacity: 0.08;
            }
          }

          @keyframes ctaDotsFloat {
            0%, 100% {
              transform: translateY(0);
              opacity: 1;
            }
            50% {
              transform: translateY(-8px);
              opacity: 0.6;
            }
          }

          @keyframes ctaPulseGlowSmall {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 8px rgba(205,183,127,0.6);
            }
            50% {
              transform: scale(1.3);
              box-shadow: 0 0 16px rgba(205,183,127,0.8);
            }
          }

          @keyframes ctaLineExpandLeft {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              width: 48px;
              opacity: 1;
            }
          }

          @keyframes ctaLineExpandRight {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              width: 48px;
              opacity: 1;
            }
          }

          @keyframes ctaIconBounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-4px);
            }
          }

          @keyframes ctaAccentLineWidth {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              width: 128px;
              opacity: 1;
            }
          }

          @keyframes ctaFloatParticle1 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-50px) translateX(50px); opacity: 0.4; }
          }

          @keyframes ctaFloatParticle2 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
            50% { transform: translateY(-60px) translateX(-60px); opacity: 0.45; }
          }

          @keyframes ctaFloatParticle3 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-70px) translateX(30px); opacity: 0.4; }
          }

          @keyframes ctaFloatParticle4 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
            50% { transform: translateY(-40px) translateX(-50px); opacity: 0.45; }
          }

          @keyframes ctaFloatParticle5 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
            50% { transform: translateY(-65px) translateX(45px); opacity: 0.4; }
          }

          @keyframes ctaFloatParticle6 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-55px) translateX(-45px); opacity: 0.4; }
          }

          @keyframes ctaShimmerHP {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      </section>

    </div>
  );
}

export default HomePage;