import React, { useEffect, useRef, useState } from "react";
import { projectsData } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import { Layers, ArrowRight } from "lucide-react";

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

function CounterStat({ targetValue, label, delay, visible }) {
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
          ? "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(205,183,127,0.2) 100%)" 
          : "rgba(255,255,255,0.5)",
        border: `1.5px solid ${isHovered ? "rgba(155,95,63,0.4)" : "rgba(205,183,127,0.3)"}`,
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(.34,1.56,.64,1) ${delay}s, all 0.4s cubic-bezier(.34,1.56,.64,1)`,
        boxShadow: isHovered 
          ? "0 12px 40px rgba(155,95,63,0.2), inset 0 1px 0 rgba(255,255,255,0.5)" 
          : "0 4px 16px rgba(111,74,45,0.08)"
      }}
    >
      {/* Glow background on hover */}
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

      {/* Animated border accent */}
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

function ProjectsOverview() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.08);
  const [ctaRef, ctaVisible] = useInView(0.3);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      className="relative py-16 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F2EAD6 0%, #EDE3C8 60%, #E6D9BC 100%)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Primary Animated Background Glows */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-20 top-0 -left-48 pointer-events-none animate-glowDrift" 
        style={{ background: "radial-gradient(circle, #CDB77F 0%, transparent 70%)" }} 
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-15 -bottom-32 -right-40 pointer-events-none animate-glowDriftSlow" 
        style={{ background: "radial-gradient(circle, #9B5F3F 0%, transparent 70%)" }} 
      />

      {/* Secondary Accent Glows */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.12] top-1/2 -right-24 pointer-events-none animate-floatGlow" 
        style={{ background: "#E8C9A0" }} 
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.1] bottom-1/4 -left-32 pointer-events-none animate-floatGlowSlow" 
        style={{ background: "#9B5F3F" }} 
      />

      {/* Floating Geometric Shapes */}
      <div className="absolute w-32 h-32 opacity-5 top-1/4 right-1/4 pointer-events-none animate-float" style={{ background: "#9B5F3F", borderRadius: "20% 80% 80% 20% / 20% 20% 80% 80%" }} />
      <div className="absolute w-24 h-24 opacity-4 bottom-1/3 left-1/3 pointer-events-none animate-floatReverse" style={{ background: "#CDB77F", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }} />
      <div className="absolute w-40 h-40 opacity-3 top-1/2 left-1/4 pointer-events-none animate-rotate" style={{ background: "#E8C9A0", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }} />

      {/* Mouse-Following Light Effect */}
      <div
        className="fixed pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(155,95,63,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          filter: "blur(80px)",
          zIndex: 1,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          className="text-center mb-10 md:mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          {/* Eyebrow Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-8 animate-slideInDown hover:scale-105 transition-transform duration-300"
            style={{ 
              background: "rgba(155,95,63,0.12)", 
              border: "1.5px solid rgba(155,95,63,0.25)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 24px rgba(155,95,63,0.1)"
            }}
          >
            <Layers size={14} style={{ color: "#9B5F3F" }} />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#9B5F3F]">
              Featured Work
            </span>
          </div>

          {/* Main Heading */}
          <div className="relative mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3D200E] leading-tight animate-slideInDown" style={{animationDelay: "0.1s"}}>
              My <span style={{ color: "#9B5F3F" }} className="inline-block animate-glowText relative">
                Projects
                <span className="absolute inset-0 animate-glowBehind" style={{ background: "linear-gradient(90deg, transparent, rgba(155,95,63,0.2), transparent)", filter: "blur(12px)" }} />
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-[#6F4A2D]/75 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{animationDelay: "0.2s"}}>
            Featured projects showcasing my expertise across web development,
            app development, and data analysis with real-world applications.
          </p>

          {/* Enhanced Ornamental Divider */}
          <div className="flex items-center justify-center gap-4 mt-10 animate-fadeInUp" style={{animationDelay: "0.25s"}}>
            <div className="h-px w-16 rounded-full animate-expandLeft" style={{ background: "linear-gradient(90deg, transparent, rgba(205,183,127,0.8))" }} />
            <div className="w-2 h-2 rounded-full animate-pulseGlow" style={{ background: "#9B5F3F", boxShadow: "0 0 16px rgba(155,95,63,0.6)" }} />
            <div className="h-px w-16 rounded-full animate-expandRight" style={{ background: "linear-gradient(90deg, rgba(205,183,127,0.8), transparent)" }} />
          </div>

          {/* Stats row with enhanced styling */}
          <div className="flex items-center justify-center gap-8 mt-14 flex-wrap">
            <CounterStat targetValue={projectsData.length + "+"} label="Projects Built" delay={0.4} visible={headerVisible} />
            <CounterStat targetValue="10+" label="Technologies" delay={0.5} visible={headerVisible} />
            <CounterStat targetValue="3" label="Project Types" delay={0.6} visible={headerVisible} />
          </div>
        </div>

        {/* ── Projects Grid ── */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {projectsData.slice(0, 3).map((project, index) => (
            <div key={project.id} className="h-full animate-cardReveal" style={{ animationDelay: `${index * 150}ms` }}>
              <ProjectCard
                project={project}
                index={index}
                visible={gridVisible}
              />
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          ref={ctaRef}
          className="flex justify-center mt-8"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(.34,1.56,.64,1) 0.15s",
          }}
        >
          <Link
            to="/projects"
            className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #9B5F3F 0%, #7A4530 100%)",
              boxShadow: "0 16px 48px rgba(155,95,63,0.4)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            {/* Animated background shine */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />
            </div>

            <span className="relative z-10 tracking-wide text-lg">View All Projects</span>
            <ArrowRight 
              size={18} 
              className="relative z-10 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-110" 
            />
            <span className="absolute inset-0 proj-shimmer" />
            
            {/* Glow effect on hover */}
            <div className="absolute -inset-2 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-full" style={{background: "linear-gradient(135deg, rgba(205,183,127,0.4), rgba(155,95,63,0.4))"}} />
          </Link>
        </div>

      </div>

      {/* Animated Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-transparent to-[#D8CFB0] pointer-events-none" style={{animation: "fadeInBottom 1s ease forwards", animationDelay: "0.8s"}} />

      <style>{`
        /* Entrance animations */
        .animate-slideInDown {
          animation: slideInDown 0.7s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.7s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        .animate-expandLeft {
          animation: expandLeft 0.8s cubic-bezier(.34,1.56,.64,1) forwards;
          transform-origin: right;
        }

        .animate-expandRight {
          animation: expandRight 0.8s cubic-bezier(.34,1.56,.64,1) forwards;
          transform-origin: left;
        }

        .animate-cardReveal {
          animation: cardReveal 0.6s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        .animate-pulseGlow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .animate-glowBehind {
          animation: glowBehind 2.5s ease-in-out infinite;
        }

        /* Keyframes */
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInBottom {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes expandLeft {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 64px;
            opacity: 1;
          }
        }

        @keyframes expandRight {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 64px;
            opacity: 1;
          }
        }

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.93);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(155,95,63,0.4), 0 0 24px rgba(155,95,63,0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 20px rgba(155,95,63,0.6), 0 0 40px rgba(155,95,63,0.3);
            transform: scale(1.1);
          }
        }

        @keyframes glowBehind {
          0%, 100% {
            opacity: 0.3;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 0.6;
            transform: scaleX(1.2);
          }
        }

        /* Background glow drift animations */
        .animate-glowDrift {
          animation: glowDrift 9s ease-in-out infinite;
        }

        .animate-glowDriftSlow {
          animation: glowDriftSlow 12s ease-in-out infinite;
        }

        .animate-floatGlow {
          animation: floatGlow 7s ease-in-out infinite;
        }

        .animate-floatGlowSlow {
          animation: floatGlowSlow 11s ease-in-out infinite;
        }

        @keyframes glowDrift {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-40px) translateX(20px);
          }
          50% {
            transform: translateY(-20px) translateX(40px);
          }
          75% {
            transform: translateY(-30px) translateX(10px);
          }
        }

        @keyframes glowDriftSlow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(30px) translateX(-30px);
          }
          50% {
            transform: translateY(50px) translateX(-50px);
          }
          75% {
            transform: translateY(20px) translateX(-20px);
          }
        }

        @keyframes floatGlow {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.12;
          }
          50% {
            transform: translateY(-50px) translateX(-30px);
            opacity: 0.2;
          }
        }

        @keyframes floatGlowSlow {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(40px) translateX(50px);
            opacity: 0.18;
          }
        }

        /* Shape animations */
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-floatReverse {
          animation: floatReverse 8s ease-in-out infinite;
        }

        .animate-rotate {
          animation: rotate 10s linear infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes floatReverse {
          0%, 100% {
            transform: translateY(0) rotate(360deg);
          }
          50% {
            transform: translateY(20px) rotate(180deg);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Text glow effect */
        .animate-glowText {
          animation: glowTextAnim 3s ease-in-out infinite;
        }

        @keyframes glowTextAnim {
          0%, 100% {
            text-shadow: 0 0 0px rgba(155, 95, 63, 0);
            color: #9B5F3F;
          }
          50% {
            text-shadow: 0 0 24px rgba(155, 95, 63, 0.5);
            color: #B57347;
          }
        }

        .proj-shimmer {
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.20) 50%, transparent 65%);
          background-size: 250% 100%;
          animation: projShimmer 2.8s infinite linear;
        }

        @keyframes projShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
}

export default ProjectsOverview;
