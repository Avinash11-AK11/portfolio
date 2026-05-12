import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const CATEGORY_COLORS = {
  "Data Analysis":   { pill: "rgba(155,95,63,0.15)", text: "#9B5F3F", border: "rgba(155,95,63,0.25)" },
  "App Development": { pill: "rgba(126,72,38,0.15)",  text: "#7A4826", border: "rgba(126,72,38,0.25)" },
  "Web Development": { pill: "rgba(205,183,127,0.20)",text: "#7A6030", border: "rgba(205,183,127,0.35)" },
};

function ProjectCard({ project, index = 0, visible = false }) {
  const cat = CATEGORY_COLORS[project.category] || CATEGORY_COLORS["Data Analysis"];
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    setMousePos({ x, y });
    setRotateX((y / centerY) * 8);
    setRotateY((-x / centerX) * 8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="group relative h-full perspective"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible 
          ? `translateY(0) scale(1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` 
          : "translateY(50px) scale(0.95)",
        transition: isHovered 
          ? "transform 0.15s ease-out" 
          : `opacity 0.65s cubic-bezier(.4,0,.2,1) ${index * 120}ms, transform 0.65s cubic-bezier(.4,0,.2,1) ${index * 120}ms`,
        transformStyle: "preserve-3d",
      }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col bg-white rounded-3xl overflow-hidden focus:outline-none relative h-full"
        style={{
          boxShadow: isHovered 
            ? "0 40px 100px rgba(111,74,45,0.28), 0 16px 56px rgba(155,95,63,0.22)" 
            : "0 8px 32px rgba(111,74,45,0.12), 0 2px 8px rgba(0,0,0,0.08)",
          border: isHovered ? "1.5px solid rgba(205,183,127,0.5)" : "1.5px solid rgba(205,183,127,0.25)",
          transition: "box-shadow 0.6s cubic-bezier(.34,1.56,.64,1), border 0.6s ease",
        }}
      >
        {/* Animated background light effect */}
        <div
          className="absolute -inset-20 opacity-0 group-hover:opacity-35 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePos.x + 50}% ${mousePos.y + 50}%, rgba(155,95,63,0.45) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

      {/* ── Image ── */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#E8D5BF] to-[#D4C4B0]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700"
          style={{ 
            transform: isHovered 
              ? "scale(1.18) rotate(1deg)" 
              : "scale(1) rotate(0deg)",
            filter: isHovered ? "brightness(0.88) saturate(1.2) contrast(1.1)" : "brightness(1) saturate(1) contrast(1)"
          }}
        />
        
        {/* Multiple gradient overlays */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{ 
            background: isHovered 
              ? "linear-gradient(135deg, rgba(155,95,63,0.55) 0%, rgba(155,95,63,0.25) 50%, rgba(205,183,127,0.15) 100%)" 
              : "linear-gradient(to top, rgba(50,20,5,0.65) 0%, rgba(50,20,5,0.2) 45%, transparent 100%)"
          }}
        />
        
        {/* Animated spotlight effect */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ 
            background: isHovered
              ? "radial-gradient(ellipse 600px 400px at center, rgba(255,255,255,0.25) 0%, rgba(205,183,127,0.15) 30%, transparent 70%)"
              : "radial-gradient(ellipse 600px 400px at center, rgba(255,255,255,0.1) 0%, rgba(205,183,127,0.05) 30%, transparent 70%)",
          }}
        />

        {/* Enhanced shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
          }}
        />

        {/* Category pill — top left with better styling */}
        <div
          className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-lg transition-all duration-300 transform z-20"
          style={{ 
            background: isHovered 
              ? "rgba(155,95,63,0.45)" 
              : "rgba(20,8,0,0.7)", 
            color: "#F5E6D3",
            border: `1.5px solid ${isHovered ? "rgba(245,230,211,0.6)" : "rgba(245,230,211,0.35)"}`,
            transform: isHovered ? "translateY(-10px) scale(1.08)" : "translateY(0) scale(1)",
            boxShadow: isHovered ? "0 12px 32px rgba(155,95,63,0.4)" : "0 4px 12px rgba(0,0,0,0.15)",
            backdropFilter: "blur(10px)"
          }}
        >
          {project.category}
        </div>

        {/* External link button — top right */}
        <div
          className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 z-20"
          style={{ 
            background: isHovered 
              ? "rgba(255,255,255,0.98)" 
              : "rgba(255,255,255,0.8)", 
            boxShadow: isHovered 
              ? "0 16px 40px rgba(155,95,63,0.35), inset 0 1px 1px rgba(255,255,255,0.6)" 
              : "0 6px 16px rgba(0,0,0,0.15)",
            opacity: isHovered ? 1 : 0.75,
            transform: isHovered ? "scale(1.2) translateY(-12px) rotate(45deg)" : "scale(0.8) translateY(0) rotate(0deg)",
            backdropFilter: "blur(6px)"
          }}
        >
          <ExternalLink 
            size={16} 
            style={{ 
              color: "#9B5F3F", 
              transition: "transform 0.5s cubic-bezier(.34,1.56,.64,1)",
              transform: isHovered ? "rotate(-45deg) scale(1.3)" : "rotate(0deg) scale(1)"
            }}
          />
        </div>

        {/* Date with enhanced styling */}
        <p
          className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-300 z-10"
          style={{ 
            color: isHovered 
              ? "rgba(255,255,255,1)" 
              : "rgba(255,255,255,0.8)",
            transform: isHovered ? "translateY(-10px) translateX(4px)" : "translateY(0) translateX(0)",
            textShadow: isHovered 
              ? "0 6px 16px rgba(0,0,0,0.4)" 
              : "0 2px 6px rgba(0,0,0,0.25)"
          }}
        >
          {project.date}
        </p>
      </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-7 relative z-10">

          {/* Project type + title */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300"
                style={{ 
                  color: isHovered ? cat.text : `${cat.text}BB`,
                  transform: isHovered ? "translateX(5px)" : "translateX(0)",
                  letterSpacing: isHovered ? "0.22em" : "0.18em"
                }}
              >
                Personal Project
              </span>
              <ArrowUpRight
                size={18}
                className="transition-all duration-500"
                style={{ 
                  color: "#9B5F3F",
                  opacity: isHovered ? 1 : 0.4,
                  transform: isHovered 
                    ? "translate(8px, -8px) rotate(0deg) scale(1.15)" 
                    : "translate(0, 0) rotate(-45deg) scale(0.6)",
                  filter: isHovered ? "drop-shadow(0 4px 12px rgba(155,95,63,0.3))" : "drop-shadow(none)"
                }}
              />
            </div>
            <h3 
              className="text-[1.25rem] font-serif font-bold leading-snug transition-all duration-500" 
              style={{
                color: isHovered ? "#9B5F3F" : "#3D200E",
                transform: isHovered ? "translateX(3px)" : "translateX(0)",
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Enhanced animated accent line */}
          <div
            className="mb-5 rounded-full transition-all duration-700"
            style={{ 
              background: `linear-gradient(90deg, ${cat.text} 0%, ${cat.text}88 40%, transparent 100%)`,
              height: isHovered ? "3px" : "2px",
              width: isHovered ? "100%" : "55px",
              opacity: isHovered ? 1 : 0.7,
              boxShadow: isHovered ? `0 0 16px ${cat.text}44` : "none"
            }}
          />

          <p 
            className="text-[13px] mb-6 line-clamp-2 leading-relaxed flex-1 transition-all duration-500" 
            style={{
              color: isHovered ? "#6F4A2D" : "#6F4A2DB8",
            }}
          >
            {project.description}
          </p>

          {/* Tech tags with enhanced animation */}
          <div className="flex flex-wrap gap-2.5 mt-auto">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-2 text-[11px] font-semibold rounded-lg transition-all duration-300 transform"
                style={{
                  background: isHovered 
                    ? cat.pill.replace("0.15", "0.35").replace("0.20", "0.4")
                    : cat.pill,
                  color: cat.text,
                  border: `1.5px solid ${isHovered ? cat.border.replace("0.25", "0.45") : cat.border}`,
                  transform: isHovered 
                    ? `translateY(-8px) scale(1.1) rotate(${idx % 2 === 0 ? 1.5 : -1.5}deg)` 
                    : "translateY(0) scale(1) rotate(0deg)",
                  boxShadow: isHovered 
                    ? `0 8px 20px ${cat.text}28, inset 0 1.5px 0 rgba(255,255,255,0.4)` 
                    : "none",
                  transitionDelay: isHovered ? `${idx * 70}ms` : "0ms",
                  fontWeight: isHovered ? "700" : "600"
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span
                className="px-3.5 py-2 text-[11px] font-semibold rounded-lg transition-all duration-300 transform"
                style={{ 
                  background: isHovered 
                    ? "rgba(205,183,127,0.35)" 
                    : "rgba(205,183,127,0.15)", 
                  color: isHovered ? "#9B6030" : "#8A6030", 
                  border: `1.5px solid ${isHovered ? "rgba(205,183,127,0.5)" : "rgba(205,183,127,0.35)"}`,
                  transform: isHovered 
                    ? `translateY(-8px) scale(1.1) rotate(1.5deg)` 
                    : "translateY(0) scale(1) rotate(0deg)",
                  boxShadow: isHovered 
                    ? "0 8px 20px rgba(138,96,48,0.28), inset 0 1.5px 0 rgba(255,255,255,0.4)" 
                    : "none",
                  transitionDelay: isHovered ? `${3 * 70}ms` : "0ms",
                  fontWeight: isHovered ? "700" : "600"
                }}
              >
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </a>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .perspective {
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
}

export default ProjectCard;
