import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const CATEGORY_COLORS = {
  "Data Analysis":   { pill: "rgba(155,95,63,0.15)", text: "#9B5F3F", border: "rgba(155,95,63,0.25)" },
  "App Development": { pill: "rgba(126,72,38,0.15)",  text: "#7A4826", border: "rgba(126,72,38,0.25)" },
  "Web Development": { pill: "rgba(205,183,127,0.20)",text: "#7A6030", border: "rgba(205,183,127,0.35)" },
};

function ProjectCard({ project, index = 0, visible = false }) {
  const cat = CATEGORY_COLORS[project.category] || CATEGORY_COLORS["Data Analysis"];

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden focus:outline-none"
      style={{
        boxShadow: "0 4px 24px rgba(111,74,45,0.10), 0 1px 4px rgba(0,0,0,0.06)",
        border: "1px solid rgba(205,183,127,0.25)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(44px) scale(0.97)",
        transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${index * 120}ms, transform 0.65s cubic-bezier(.4,0,.2,1) ${index * 120}ms, box-shadow 0.3s ease`,
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 48px rgba(111,74,45,0.18), 0 4px 12px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(111,74,45,0.10), 0 1px 4px rgba(0,0,0,0.06)"}
    >
      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transition: "transform 0.7s cubic-bezier(.4,0,.2,1)" }}
        />
        {/* Gradient overlay always visible at bottom */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(50,20,5,0.55) 0%, rgba(50,20,5,0.10) 50%, transparent 100%)" }}
        />
        {/* Hover full overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "rgba(155,95,63,0.15)" }}
        />

        {/* Category pill — top left */}
        <div
          className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"
          style={{ background: "rgba(20,8,0,0.55)", color: "#E8C9A0", border: "1px solid rgba(232,201,160,0.25)" }}
        >
          {project.category}
        </div>

        {/* Arrow button — top right, appears on hover */}
        <div
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5"
          style={{ background: "rgba(255,255,255,0.90)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          <ExternalLink size={13} style={{ color: "#9B5F3F" }} />
        </div>

        {/* Date — bottom left floating on image */}
        <p
          className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.70)" }}
        >
          {project.date}
        </p>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-6">

        {/* Project type + title */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: cat.text }}
            >
              Personal Project
            </span>
            <ArrowUpRight
              size={16}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: "#9B5F3F" }}
            />
          </div>
          <h3 className="text-[1.05rem] font-serif font-bold text-[#3D200E] leading-snug group-hover:text-[#9B5F3F] transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        {/* Thin accent line */}
        <div
          className="h-[1.5px] mb-4 rounded-full w-10 group-hover:w-20 transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${cat.text}, transparent)` }}
        />

        <p className="text-[13px] text-[#6F4A2D]/70 mb-5 line-clamp-2 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg"
              style={{
                background: cat.pill,
                color: cat.text,
                border: `1px solid ${cat.border}`,
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg"
              style={{ background: "rgba(205,183,127,0.15)", color: "#8A6030", border: "1px solid rgba(205,183,127,0.25)" }}
            >
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
