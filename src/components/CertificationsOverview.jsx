import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "./CategoryCard";
import { categories } from "../data/certifications";
import { Link } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";

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

function StatCounter({ targetValue, label, delay, visible }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(targetValue);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!visible) return;
    
    let start = 0;
    const increment = Math.ceil(numericValue / 30);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [visible, targetValue, delay, numericValue]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col items-center px-7 py-5 rounded-2xl transition-all duration-400 transform overflow-hidden"
      style={{
        background: isHovered 
          ? "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(205,183,127,0.3) 100%)" 
          : "rgba(255,255,255,0.45)",
        border: `1.5px solid ${isHovered ? "rgba(155,95,63,0.45)" : "rgba(205,183,127,0.3)"}`,
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(.34,1.56,.64,1) ${delay}s, all 0.4s cubic-bezier(.34,1.56,.64,1)`,
        boxShadow: isHovered 
          ? "0 12px 40px rgba(155,95,63,0.22), inset 0 1px 0 rgba(255,255,255,0.5)" 
          : "0 4px 16px rgba(111,74,45,0.08)"
      }}
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle at center, rgba(205,183,127,0.4) 0%, transparent 70%)" }}
      />

      <span 
        className="text-4xl font-bold font-serif relative z-10 transition-all duration-400" 
        style={{ 
          color: isHovered ? "#B57347" : "#9B5F3F",
          textShadow: isHovered ? "0 4px 12px rgba(155,95,63,0.3)" : "none"
        }}
      >
        {count}{targetValue.includes("+") ? "+" : ""}
      </span>
      <span 
        className="text-[11px] uppercase tracking-widest font-semibold text-[#6F4A2D]/70 mt-2 relative z-10 transition-all duration-400 group-hover:text-[#9B5F3F]"
      >
        {label}
      </span>

      <div 
        className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500"
        style={{
          width: isHovered ? "100%" : "0%",
          background: "linear-gradient(90deg, #9B5F3F 0%, #CDB77F 50%, #9B5F3F 100%)"
        }}
      />
    </div>
  );
}

function CertificationsOverview() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.1);
  const [ctaRef, ctaVisible] = useInView(0.3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const totalCerts = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <section 
      className="relative pt-16 pb-24 md:pt-32 md:pb-40 bg-[#D8CFB0] overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient mesh layer 1 */}
        <div className="absolute inset-0 animate-certGradientShift" 
          style={{ background: "linear-gradient(135deg, rgba(205,183,127,0.15) 0%, rgba(155,95,63,0.08) 50%, rgba(232,201,160,0.12) 100%)" }} 
        />
        
        {/* Morphing blob - top left */}
        <div className="absolute w-[600px] h-[600px] -top-1/3 -left-1/4 rounded-full blur-3xl opacity-20 animate-certBlobMorph1" 
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(205,183,127,0.4), rgba(155,95,63,0.1))" }} 
        />
        
        {/* Morphing blob - bottom right */}
        <div className="absolute w-[700px] h-[700px] -bottom-1/3 -right-1/4 rounded-full blur-3xl opacity-18 animate-certBlobMorph2" 
          style={{ background: "radial-gradient(circle at 70% 70%, rgba(155,95,63,0.35), rgba(232,201,160,0.08))" }} 
        />
        
        {/* Orbital ring element */}
        <div className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-certOrbitalRotate pointer-events-none">
          <div className="absolute inset-0 rounded-full" 
            style={{ 
              border: "1px solid rgba(205,183,127,0.12)",
              boxShadow: "inset 0 0 120px rgba(205,183,127,0.08)"
            }} 
          />
          <div className="absolute w-3 h-3 bg-[#CDB77F] rounded-full top-0 left-1/2 -translate-x-1/2 blur-sm opacity-40" />
        </div>
        
        {/* Subtle depth layer */}
        <div className="absolute inset-0 animate-certDepthShift" 
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(155,95,63,0.03) 50%, transparent 100%)" }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Animated floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-25"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: i % 2 === 0 ? "#CDB77F" : "#9B5F3F",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `certFloatParticle${i + 1} ${4 + i}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          className="text-center mb-10 md:mb-24"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-8 animate-certSlideInDown hover:scale-105 transition-transform duration-300"
            style={{ 
              background: "rgba(155,95,63,0.12)", 
              border: "1.5px solid rgba(155,95,63,0.25)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 24px rgba(155,95,63,0.1)"
            }}
          >
            <Award size={15} style={{ color: "#9B5F3F" }} />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#9B5F3F]">
              Credentials &amp; Achievements
            </span>
          </div>

          {/* Main Heading */}
          <div className="relative mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3D200E] leading-tight animate-certSlideInDown" style={{animationDelay: "0.1s"}}>
              My <span style={{ color: "#9B5F3F" }} className="inline-block animate-certGlowText relative">
                Certifications
                <span className="absolute inset-0 animate-certGlowBehind" style={{ background: "linear-gradient(90deg, transparent, rgba(155,95,63,0.2), transparent)", filter: "blur(12px)" }} />
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-[#6F4A2D]/75 text-lg max-w-2xl mx-auto leading-relaxed animate-certFadeInUp" style={{animationDelay: "0.2s"}}>
            Professional certifications and learning milestones across development,
            application engineering, and modern data technologies.
          </p>

          {/* Enhanced Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-10 animate-certFadeInUp" style={{animationDelay: "0.25s"}}>
            <div className="h-px w-16 rounded-full animate-certExpandLeft" style={{ background: "linear-gradient(90deg, transparent, rgba(205,183,127,0.8))" }} />
            <div className="w-2 h-2 rounded-full animate-certPulseGlow" style={{ background: "#9B5F3F", boxShadow: "0 0 16px rgba(155,95,63,0.6)" }} />
            <div className="h-px w-16 rounded-full animate-certExpandRight" style={{ background: "linear-gradient(90deg, rgba(205,183,127,0.8), transparent)" }} />
          </div>

          {/* Stats strip with better styling */}
          <div className="flex items-center justify-center gap-8 mt-14 flex-wrap">
            <StatCounter targetValue={totalCerts + ""} label="Total Certifications" delay={0.4} visible={headerVisible} />
            <StatCounter targetValue={categories.length + ""} label="Categories" delay={0.5} visible={headerVisible} />
            <StatCounter targetValue="3+" label="Years Learning" delay={0.6} visible={headerVisible} />
          </div>
        </div>

        {/* ── Category Grid ── */}
        <div 
          ref={gridRef} 
          className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-20"
        >
          {categories.map((category, index) => (
            <div key={category.id} className="h-full animate-certCardReveal" style={{ animationDelay: `${index * 150}ms` }}>
              <CategoryCard
                category={category}
                index={index}
                visible={gridVisible}
              />
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          ref={ctaRef}
          className="flex justify-center"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(.34,1.56,.64,1) 0.15s",
          }}
        >
          <Link
            to="/certifications"
            className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #9B5F3F 0%, #7A4530 100%)",
              boxShadow: "0 16px 48px rgba(155,95,63,0.4)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />
            </div>

            <span className="relative z-10 tracking-wide text-lg">View All Certifications</span>
            <ArrowRight 
              size={18} 
              className="relative z-10 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-110" 
            />
            
            <div className="absolute -inset-2 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-full" style={{background: "linear-gradient(135deg, rgba(205,183,127,0.4), rgba(155,95,63,0.4))"}} />
          </Link>
        </div>

      </div>

      <style>{`
        /* Entrance animations */
        .animate-certSlideInDown {
          animation: certSlideInDown 0.7s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        .animate-certFadeInUp {
          opacity: 0;
          animation: certFadeInUp 0.7s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        .animate-certExpandLeft {
          animation: certExpandLeft 0.8s cubic-bezier(.34,1.56,.64,1) forwards;
          transform-origin: right;
        }

        .animate-certExpandRight {
          animation: certExpandRight 0.8s cubic-bezier(.34,1.56,.64,1) forwards;
          transform-origin: left;
        }

        .animate-certCardReveal {
          animation: certCardReveal 0.6s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        .animate-certPulseGlow {
          animation: certPulseGlow 2s ease-in-out infinite;
        }

        .animate-certGlowBehind {
          animation: certGlowBehind 2.5s ease-in-out infinite;
        }

        .animate-certGlowText {
          animation: certGlowTextAnim 3s ease-in-out infinite;
        }

        /* Keyframes */
        @keyframes certSlideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes certFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes certExpandLeft {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 64px;
            opacity: 1;
          }
        }

        @keyframes certExpandRight {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 64px;
            opacity: 1;
          }
        }

        @keyframes certCardReveal {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.93);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes certPulseGlow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(155,95,63,0.4), 0 0 24px rgba(155,95,63,0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 20px rgba(155,95,63,0.6), 0 0 40px rgba(155,95,63,0.3);
            transform: scale(1.1);
          }
        }

        @keyframes certGlowBehind {
          0%, 100% {
            opacity: 0.3;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 0.6;
            transform: scaleX(1.2);
          }
        }

        @keyframes certGlowTextAnim {
          0%, 100% {
            text-shadow: 0 0 0px rgba(155, 95, 63, 0);
            color: #9B5F3F;
          }
          50% {
            text-shadow: 0 0 24px rgba(155, 95, 63, 0.5);
            color: #B57347;
          }
        }

        /* Professional background animations */
        .animate-certGradientShift {
          animation: certGradientShift 12s ease-in-out infinite;
        }

        .animate-certBlobMorph1 {
          animation: certBlobMorph1 16s ease-in-out infinite;
        }

        .animate-certBlobMorph2 {
          animation: certBlobMorph2 18s ease-in-out infinite;
        }

        .animate-certOrbitalRotate {
          animation: certOrbitalRotate 20s linear infinite;
        }

        .animate-certDepthShift {
          animation: certDepthShift 14s ease-in-out infinite;
        }

        @keyframes certGradientShift {
          0%, 100% {
            filter: hue-rotate(0deg) saturate(1);
            opacity: 0.8;
          }
          50% {
            filter: hue-rotate(8deg) saturate(1.1);
            opacity: 0.95;
          }
        }

        @keyframes certBlobMorph1 {
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

        @keyframes certBlobMorph2 {
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

        @keyframes certOrbitalRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes certDepthShift {
          0%, 100% {
            opacity: 0.03;
          }
          50% {
            opacity: 0.08;
          }
        }

        @keyframes certFloatParticle1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-50px) translateX(50px); opacity: 0.4; }
        }

        @keyframes certFloatParticle2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-60px) translateX(-60px); opacity: 0.45; }
        }

        @keyframes certFloatParticle3 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-70px) translateX(30px); opacity: 0.4; }
        }

        @keyframes certFloatParticle4 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-40px) translateX(-50px); opacity: 0.45; }
        }

        @keyframes certFloatParticle5 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-65px) translateX(45px); opacity: 0.4; }
        }

        @keyframes certFloatParticle6 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-55px) translateX(-45px); opacity: 0.4; }
        }

      `}</style>
    </section>
  );
}

export default CertificationsOverview;