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

function ProjectsOverview() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.08);
  const [ctaRef, ctaVisible] = useInView(0.3);

  return (
    <section
      className="relative py-16 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F2EAD6 0%, #EDE3C8 60%, #E6D9BC 100%)" }}
    >
      {/* Background glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.18] top-0 -left-48 pointer-events-none" style={{ background: "#CDB77F" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.14] -bottom-32 -right-40 pointer-events-none" style={{ background: "#9B5F3F" }} />

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
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(155,95,63,0.10)", border: "1px solid rgba(155,95,63,0.20)" }}
          >
            <Layers size={13} style={{ color: "#9B5F3F" }} />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#9B5F3F]">
              Featured Work
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3D200E] mb-5 leading-tight">
            My <span style={{ color: "#9B5F3F" }}>Projects</span>
          </h2>

          <p className="text-lg text-[#6F4A2D]/75 max-w-2xl mx-auto leading-relaxed">
            Featured projects showcasing my expertise across web development,
            app development, and data analysis with real-world applications.
          </p>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #CDB77F)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#9B5F3F", boxShadow: "0 0 8px #9B5F3F80" }} />
            <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, #CDB77F, transparent)" }} />
          </div>

          {/* Stats row */}
          <div
            className="flex items-center justify-center gap-8 mt-10 flex-wrap"
          >
            {[
              { label: "Projects Built", value: projectsData.length + "+" },
              { label: "Technologies", value: "10+" },
              { label: "Project Types", value: "3" },
            ].map(({ label, value }, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-6 py-3 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.45)",
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

        {/* ── Projects Grid ── */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {projectsData.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              visible={gridVisible}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          ref={ctaRef}
          className="flex justify-center"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <Link
            to="/projects"
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #9B5F3F 0%, #7A4530 100%)",
              boxShadow: "0 8px 32px rgba(155,95,63,0.38)",
            }}
          >
            <span className="relative z-10 tracking-wide">View All Projects</span>
            <ArrowRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 proj-shimmer" />
          </Link>
        </div>

      </div>

      {/* Bottom fade into Certifications section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#D8CFB0] pointer-events-none" />

      <style>{`
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
