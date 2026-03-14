import React from "react";

const levelConfig = {
  Advanced: {
    badge: "bg-[#9B5F3F]/10 text-[#9B5F3F] border border-[#9B5F3F]/25",
    bar: "from-[#9B5F3F] to-[#C4873D]",
  },
  Intermediate: {
    badge: "bg-[#CDB77F]/25 text-[#7A5510] border border-[#CDB77F]/50",
    bar: "from-[#B07D2E] to-[#CDB77F]",
  },
  Beginner: {
    badge: "bg-[#D8CFB0]/40 text-[#7A6A50] border border-[#C4A882]/35",
    bar: "from-[#C4A882] to-[#D8CFB0]",
  },
};

function SkillCard({ skill, index = 0 }) {
  const config = levelConfig[skill.level] || levelConfig.Intermediate;

  return (
    <div
      className="group relative bg-white rounded-xl border border-[#EDE3CF] p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#9B5F3F]/10 hover:border-[#CDB77F]/60 hover:-translate-y-0.5 animate-card"
      style={{ animationDelay: `${index * 0.06}s` }}
    >

      {/* Hover accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#9B5F3F] to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-[15px] font-semibold text-[#1C0F08] leading-snug tracking-tight">
          {skill.name}
        </h3>
        <span className={`shrink-0 mt-0.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${config.badge}`}>
          {skill.level}
        </span>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#6F4A2D]/65 leading-relaxed mb-5">
        {skill.description}
      </p>

      {/* Proficiency Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#6F4A2D]/40">
            Proficiency
          </span>
          <span className="text-[13px] font-bold text-[#9B5F3F]">
            {skill.proficiency}%
          </span>
        </div>
        <div className="w-full bg-[#F4EEDB] rounded-full h-1 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${config.bar} transition-all duration-700`}
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3.5 border-t border-[#F4EEDB]">
        <span className="text-[10px] uppercase tracking-widest text-[#9B5F3F]/50 font-medium">
          {skill.category}
        </span>
      </div>

    </div>
  );
}

export default SkillCard;
