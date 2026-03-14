import React, { useEffect, useState } from "react";
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

  return (
    <Link
      to={`/certifications/${category.id}`}
      className="group block h-full focus:outline-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.96)",
        transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${index * 120}ms, transform 0.65s cubic-bezier(.4,0,.2,1) ${index * 120}ms`,
      }}
    >
      <div
        className={`relative bg-gradient-to-br ${bg} rounded-3xl overflow-hidden h-full`}
        style={{
          boxShadow: "0 8px 40px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.07)",
          minHeight: 220,
        }}
      >
        {/* Radial shine on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
          style={{ background: `radial-gradient(ellipse at 30% 30%, ${shine} 0%, transparent 70%)` }}
        />
        {/* Glow dot */}
        <div
          className="absolute top-5 right-5 w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,.5) 0,rgba(255,255,255,.5) 1px,transparent 1px,transparent 28px),repeating-linear-gradient(90deg,rgba(255,255,255,.5) 0,rgba(255,255,255,.5) 1px,transparent 1px,transparent 28px)" }}
        />

        <div className="relative p-5 sm:p-8 flex flex-col justify-between h-full">
          {/* Top: icon + title + arrow */}
          <div className="flex items-start justify-between">
            <div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.12)" }}
              >
                <Icon size={26} color={accent} strokeWidth={1.8} />
              </div>
              <h3 className="text-[1.45rem] font-serif font-bold text-white mb-1 tracking-wide">
                {category.name}
              </h3>
              <div
                className="h-[2px] w-8 rounded-full transition-all duration-500 group-hover:w-16"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              />
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ border: `1px solid ${accent}50`, background: `${accent}15` }}
            >
              <ArrowUpRight size={18} color={accent} />
            </div>
          </div>

          {/* Bottom: animated count + dots */}
          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-1" style={{ color: `${accent}99` }}>
                Certifications
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold leading-none" style={{ color: accent }}>
                  {count}
                </span>
                <span className="text-white/40 text-lg font-light mb-1">+</span>
              </div>
            </div>
            <div className="flex gap-1.5 mb-2">
              {Array.from({ length: Math.min(category.count, 5) }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: i === 0 ? 10 : 6,
                    height: i === 0 ? 10 : 6,
                    background: i === 0 ? accent : `${accent}55`,
                    boxShadow: i === 0 ? `0 0 6px ${accent}80` : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;