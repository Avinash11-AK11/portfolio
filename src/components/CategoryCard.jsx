import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { BarChart2, Smartphone, Globe, GraduationCap, ArrowUpRight } from "lucide-react";

const ICON_MAP = {
  "data-analysis":   { Icon: BarChart2,     bg: "from-[#C4845A] via-[#B5704A] to-[#9B5F3F]", accent: "#F5E0CC", shine: "rgba(245,224,204,0.20)" },
  "app-development": { Icon: Smartphone,    bg: "from-[#9B5F3F] via-[#8A5235] to-[#7A4530]", accent: "#EDCFB0", shine: "rgba(237,207,176,0.20)" },
  "web-development": { Icon: Globe,         bg: "from-[#7A4530] via-[#6B3C28] to-[#5C3318]", accent: "#E8C9A0", shine: "rgba(232,201,160,0.18)" },
  "others":          { Icon: GraduationCap, bg: "from-[#CDB77F] via-[#C0A86A] to-[#A8923E]", accent: "#FFF4D6", shine: "rgba(255,244,214,0.25)" },
};

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function CategoryCard({ category, index = 0, visible = false }) {
  const meta = ICON_MAP[category.id] || ICON_MAP["others"];
  const { Icon, bg, accent, shine } = meta;
  const count = useCounter(category.count, 1200, visible);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    setMousePos({ x, y });
    setRotateX((y / centerY) * 6);
    setRotateY((-x / centerX) * 6);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Link
      to={`/certifications/${category.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="group block h-full focus:outline-none perspective"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible 
          ? `translateY(0) scale(1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` 
          : "translateY(50px) scale(0.93)",
        transition: isHovered 
          ? "transform 0.15s ease-out" 
          : `opacity 0.65s cubic-bezier(.4,0,.2,1) ${index * 120}ms, transform 0.65s cubic-bezier(.4,0,.2,1) ${index * 120}ms`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={`relative bg-gradient-to-br ${bg} rounded-3xl overflow-hidden h-full`}
        style={{
          boxShadow: isHovered 
            ? "0 24px 80px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.15)" 
            : "0 8px 40px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
          border: isHovered ? "1.5px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.07)",
          minHeight: 240,
          transition: "all 0.6s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* Dynamic radial shine on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
          style={{ 
            background: `radial-gradient(ellipse 800px 600px at ${mousePos.x + 50}% ${mousePos.y + 50}%, ${shine} 0%, transparent 70%)`
          }}
        />

        {/* Animated glow dot */}
        <div
          className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-180"
          style={{ 
            background: accent, 
            boxShadow: `0 0 12px ${accent}`,
            transform: isHovered ? "scale(1.3)" : "scale(1)"
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,.5) 0,rgba(255,255,255,.5) 1px,transparent 1px,transparent 28px),repeating-linear-gradient(90deg,rgba(255,255,255,.5) 0,rgba(255,255,255,.5) 1px,transparent 1px,transparent 28px)" }}
        />

        <div className="relative p-6 sm:p-8 flex flex-col justify-between h-full">
          {/* Top: icon + title + arrow */}
          <div className="flex items-start justify-between">
            <div>
              {/* Icon box */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500"
                style={{ 
                  background: "rgba(255,255,255,0.1)", 
                  border: isHovered ? "1.5px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.15)", 
                  boxShadow: isHovered ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1.5px 0 rgba(255,255,255,0.15)" : "0 4px 20px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.12)",
                  transform: isHovered ? "scale(1.12) rotate(8deg)" : "scale(1) rotate(0deg)"
                }}
              >
                <Icon 
                  size={28} 
                  color={accent} 
                  strokeWidth={1.7}
                  style={{ transition: "transform 0.5s cubic-bezier(.34,1.56,.64,1)" }}
                />
              </div>
              
              <h3 className="text-[1.5rem] font-serif font-bold text-white mb-2 tracking-wide transition-all duration-500" style={{transform: isHovered ? "translateX(4px)" : "translateX(0)"}}>
                {category.name}
              </h3>

              {/* Animated accent line */}
              <div
                className="h-[2.5px] rounded-full transition-all duration-500"
                style={{ 
                  width: isHovered ? "100%" : "40px",
                  background: `linear-gradient(90deg, ${accent}, transparent)`,
                  boxShadow: isHovered ? `0 0 12px ${accent}66` : "none"
                }}
              />
            </div>

            {/* Arrow button */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{ 
                border: `1.5px solid ${accent}66`, 
                background: `${accent}20`,
                opacity: isHovered ? 1 : 0.6,
                transform: isHovered ? "translate(6px, -6px) scale(1.15) rotate(45deg)" : "translate(0, 0) scale(1) rotate(0deg)"
              }}
            >
              <ArrowUpRight 
                size={18} 
                color={accent}
                style={{ 
                  transition: "transform 0.5s cubic-bezier(.34,1.56,.64,1)",
                  transform: isHovered ? "rotate(-45deg) scale(1.2)" : "rotate(0deg) scale(1)"
                }}
              />
            </div>
          </div>

          {/* Bottom: animated count + dots */}
          <div className="mt-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-2 transition-all duration-300" style={{ color: `${accent}BB`, letterSpacing: isHovered ? "0.22em" : "0.2em" }}>
                Certifications
              </p>
              <div className="flex items-baseline gap-1">
                <span 
                  className="text-6xl font-bold leading-none transition-all duration-500" 
                  style={{ 
                    color: accent,
                    textShadow: isHovered ? `0 6px 20px ${accent}44` : "none",
                    transform: isHovered ? "scale(1.1)" : "scale(1)"
                  }}
                >
                  {count}
                </span>
                <span className="text-white/40 text-xl font-light mb-2 transition-all duration-300" style={{opacity: isHovered ? 0.6 : 0.3}}>+</span>
              </div>
            </div>

            {/* Animated dot indicators */}
            <div className="flex gap-2 mb-2">
              {Array.from({ length: Math.min(category.count, 5) }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === 0 ? (isHovered ? 12 : 10) : (isHovered ? 8 : 6),
                    height: i === 0 ? (isHovered ? 12 : 10) : (isHovered ? 8 : 6),
                    background: i === 0 ? accent : `${accent}66`,
                    boxShadow: i === 0 ? (isHovered ? `0 0 10px ${accent}` : `0 0 6px ${accent}80`) : "none",
                    transform: isHovered ? `scale(${i === 0 ? 1.2 : 1.1})` : "scale(1)"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
      `}</style>
    </Link>
  );
}

export default CategoryCard;