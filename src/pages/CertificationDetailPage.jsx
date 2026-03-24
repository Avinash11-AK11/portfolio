import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  CheckCircle2,
  Wrench,
  FolderOpen,
  Calendar,
  Building2,
  Award,
  Check,
  ChevronRight,
  ZoomIn,
  X,
  Maximize2,
} from "lucide-react";
import { certificationsData } from "../data/certifications";

/* ── type colour map ── */
const typeStyles = {
  "Course Completion": {
    badge: "bg-[#EDE3CF] text-[#6F4A2D] border border-[#CDB77F]/40",
    glow: "#CDB77F",
    ribbon: "from-[#CDB77F] to-[#9B5F3F]",
  },
  Internship: {
    badge: "bg-[#D6C59A] text-[#6F4A2D] border border-[#9B5F3F]/30",
    glow: "#9B5F3F",
    ribbon: "from-[#9B5F3F] to-[#6F4A2D]",
  },
  Project: {
    badge: "bg-[#CDB77F] text-[#6F4A2D] border border-[#6F4A2D]/30",
    glow: "#6F4A2D",
    ribbon: "from-[#6F4A2D] to-[#3D200E]",
  },
};

/* ── helper: get style or fallback ── */
function getTypeStyle(type) {
  return (
    typeStyles[type] || {
      badge: "bg-[#EDE3CF] text-[#6F4A2D] border border-[#CDB77F]/40",
      glow: "#CDB77F",
      ribbon: "from-[#CDB77F] to-[#9B5F3F]",
    }
  );
}

export default function CertificationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const cert = certificationsData.find((c) => String(c.id) === String(id));

  /* scroll to top on mount */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  /* close lightbox on Escape */
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setLightboxOpen(false);
  }, []);
  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, handleKeyDown]);

  if (!cert) {
    return (
      <div className="min-h-screen bg-[#D8CFB0] flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">📄</div>
        <h2 className="text-2xl font-serif font-bold text-[#6F4A2D]">
          Certification not found
        </h2>
        <button
          onClick={() => navigate("/certifications")}
          className="px-8 py-3 rounded-full bg-[#9B5F3F] text-white font-semibold hover:scale-105 transition"
        >
          Back to Certifications
        </button>
      </div>
    );
  }

  const style = getTypeStyle(cert.type);

  /* ── Share handler ── */
  async function handleShare() {
    const shareUrl = window.location.href;
    const shareData = {
      title: cert.title,
      text: `Check out this certification: ${cert.title} by ${cert.organization}`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled — no action needed */
      }
    } else {
      /* clipboard fallback */
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        /* silent — clipboard API not available */
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#D8CFB0] relative overflow-hidden">
      {/* ── Background glows ── */}
      <div className="pointer-events-none fixed w-[700px] h-[700px] rounded-full blur-[200px] opacity-20 -top-40 -left-40"
        style={{ background: style.glow }} />
      <div className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-[180px] opacity-15 bottom-0 -right-40"
        style={{ background: "#9B5F3F" }} />

      {/* ── TOP NAV BAR ── */}
      <div className="sticky top-0 z-50 bg-[#D8CFB0]/80 backdrop-blur-xl border-b border-[#CDB77F]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-[#6F4A2D]/70 flex-wrap">
            <button 
              onClick={() => navigate("/certifications")}
              className="hover:text-[#9B5F3F] transition font-medium cursor-pointer bg-none border-none p-0"
            >
              Certifications
            </button>
            <ChevronRight size={14} className="opacity-50 shrink-0" />
            <span className="text-[#6F4A2D] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {cert.title}
            </span>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 hover:bg-white border border-[#CDB77F]/40 text-[#6F4A2D] text-sm font-semibold shadow-sm hover:shadow transition-all duration-300 group"
              title="Share this certification"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-600" />
                  <span className="hidden sm:inline text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} className="group-hover:scale-110 transition" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {cert.credentialUrl && cert.credentialUrl !== "#" && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#9B5F3F] hover:bg-[#6F4A2D] text-white text-sm font-semibold shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">View Credential</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative">
        {cert.isRealCertificate ? (
          /* Gradient hero for real certificate cards — consistent gold theme */
          <div
            className="relative overflow-hidden"
            style={{
              height: "clamp(140px, 22vw, 240px)",
              background: `linear-gradient(135deg, #2C1505 0%, #5A3018 35%, #CDB77F 65%, #3D200E 100%)`,
            }}
          >
            {/* subtle dot-grid texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* diagonal stripe accent */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #CDB77F 0, #CDB77F 1px, transparent 0, transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* glow pulse */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full blur-[80px] opacity-30"
              style={{ background: "#CDB77F" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#D8CFB0]" />
          </div>
        ) : (
          /* Image hero for stock-photo cards */
          <div className="relative h-[38vh] sm:h-[46vh] md:h-[52vh] overflow-hidden">
            <img
              src={cert.image}
              alt={cert.title}
              onLoad={() => setHeroLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-1000 ${
                heroLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#D8CFB0]" />
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/20 to-transparent" />
          </div>
        )}

        {/* ── IDENTITY CARD — overlaps hero ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 pb-4">
          <div
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#CDB77F]/30 p-6 sm:p-8 md:p-10"
            style={{ boxShadow: `0 32px 80px -12px ${style.glow}30, 0 12px 32px -8px rgba(0,0,0,0.12)` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              {/* Badge / emoji */}
              <div
                className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shadow-lg border border-[#CDB77F]/30"
                style={{ background: `linear-gradient(135deg, #F4EEDB, #EDE3CF)` }}
              >
                {cert.badge}
              </div>

              <div className="flex-1 min-w-0">
                {/* Organisation */}
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={14} className="text-[#9B5F3F] shrink-0" />
                  <span className="text-sm font-semibold text-[#9B5F3F] uppercase tracking-wider">
                    {cert.organization}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#3D200E] mb-4 leading-snug">
                  {cert.title}
                </h1>

                {/* Meta chips */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${style.badge}`}
                  >
                    <Award size={11} />
                    {cert.type}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F4EEDB] text-[#6F4A2D] border border-[#CDB77F]/40">
                    <Calendar size={11} />
                    {cert.date}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F4EEDB] text-[#6F4A2D] border border-[#CDB77F]/40">
                    {cert.category}
                  </span>

                  {cert.isRealCertificate && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#CDB77F] to-[#9B5F3F] text-white shadow-sm">
                      ✓ Verified Certificate
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-8 relative z-10">

        {/* ── REAL CERTIFICATE DISPLAY ── */}
        {cert.isRealCertificate && (
          <div
            className="rounded-3xl border border-[#CDB77F]/30 overflow-hidden"
            style={{ boxShadow: `0 24px 60px -12px ${style.glow}25, 0 8px 24px rgba(0,0,0,0.10)` }}
          >
            {/* Section header bar */}
            <div
              className="px-6 sm:px-8 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(90deg, #F4EEDB, #EDE3CF)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow"
                  style={{ background: "linear-gradient(135deg, #9B5F3F, #6F4A2D)" }}>
                  <Award size={16} />
                </div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#3D200E]">
                  Certificate
                </h2>
              </div>
              <button
                onClick={() => setLightboxOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#6F4A2D] border border-[#CDB77F]/60 hover:bg-[#CDB77F]/20 transition-all duration-300 group"
                title="View full size"
              >
                <Maximize2 size={13} className="group-hover:scale-110 transition" />
                <span className="hidden sm:inline">View Full Size</span>
              </button>
            </div>

            {/* Certificate image frame */}
            <div
              className="relative bg-gradient-to-br from-[#F9F5EC] to-[#EDE3CF] p-4 sm:p-6 md:p-8"
            >
              {/* Decorative corner ornaments */}
              {["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 right-3 rotate-180", "bottom-3 left-3 -rotate-90"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-8 h-8 pointer-events-none opacity-40`}>
                  <svg viewBox="0 0 32 32" fill="none">
                    <path d="M2 30V4C2 2.9 2.9 2 4 2H30" stroke="#9B5F3F" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="4" cy="4" r="2" fill="#CDB77F"/>
                  </svg>
                </div>
              ))}

              {/* The actual certificate — clickable to open lightbox */}
              <div
                className="relative group cursor-zoom-in rounded-2xl overflow-hidden"
                onClick={() => setLightboxOpen(true)}
                style={{
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
                }}
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.015]"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />

                {/* Hover glass overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur text-[#6F4A2D] text-sm font-bold shadow-xl">
                    <ZoomIn size={16} />
                    Click to expand
                  </div>
                </div>
              </div>

              {/* Certificate watermark line */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CDB77F]/50 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5F3F]/60 font-semibold">
                  Issued · {cert.date}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#CDB77F]/50 to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* ── About ── */}
        <Section icon={<Award size={18} />} title="About This Certification">
          <p className="text-[#6F4A2D]/85 text-base sm:text-lg leading-relaxed">
            {cert.longDescription || cert.description}
          </p>
        </Section>

        {/* ── What I Learned ── */}
        {cert.whatILearned && cert.whatILearned.length > 0 && (
          <Section icon={<CheckCircle2 size={18} />} title="What I Learned">
            <ul className="grid sm:grid-cols-2 gap-3">
              {cert.whatILearned.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-white/60 backdrop-blur rounded-2xl px-4 py-3.5 border border-[#CDB77F]/25 hover:bg-white/90 hover:shadow-md transition-all duration-300 group"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span
                    className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow"
                    style={{ background: `linear-gradient(135deg, ${style.glow}, #6F4A2D)` }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#6F4A2D]/85 leading-relaxed group-hover:text-[#3D200E] transition-colors">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Skills ── */}
        {cert.skills && cert.skills.length > 0 && (
          <Section icon={<Wrench size={18} />} title="Skills &amp; Technologies">
            <div className="flex flex-wrap gap-2.5">
              {cert.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default"
                  style={{
                    background: "linear-gradient(135deg, #F4EEDB, #EDE3CF)",
                    borderColor: `${style.glow}50`,
                    color: "#6F4A2D",
                    boxShadow: `0 2px 8px ${style.glow}20`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* ── Projects Built ── */}
        {cert.projectsBuilt && cert.projectsBuilt.length > 0 && (
          <Section icon={<FolderOpen size={18} />} title="Projects I Built">
            <div className="grid sm:grid-cols-2 gap-4">
              {cert.projectsBuilt.map((project, i) => (
                <div
                  key={i}
                  className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#CDB77F]/30 hover:bg-white hover:shadow-xl transition-all duration-400 overflow-hidden group"
                >
                  {/* Decorative corner accent */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 group-hover:opacity-20 transition"
                    style={{ background: `radial-gradient(circle at top right, ${style.glow}, transparent)` }}
                  />
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md"
                      style={{ background: `linear-gradient(135deg, ${style.glow}, #6F4A2D)` }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-[#3D200E] mb-2 text-base leading-snug group-hover:text-[#6F4A2D] transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-[#6F4A2D]/75 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Bottom CTA ── */}
        <div
          className="rounded-3xl p-8 sm:p-10 text-center border border-[#CDB77F]/30 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #3D200E 0%, #6F4A2D 50%, #9B5F3F 100%)`,
            boxShadow: `0 24px 60px -12px ${style.glow}40`,
          }}
        >
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ boxShadow: `inset 0 0 60px ${style.glow}20` }} />

          <div className="text-4xl mb-4">{cert.badge}</div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
            {cert.title}
          </h3>
          <p className="text-white/70 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Issued by {cert.organization} · {cert.date}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-semibold backdrop-blur transition-all duration-300 hover:scale-105"
            >
              {copied ? <Check size={15} /> : <Share2 size={15} />}
              {copied ? "Link Copied!" : "Share Certificate"}
            </button>

            {cert.credentialUrl && cert.credentialUrl !== "#" && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#6F4A2D] text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <ExternalLink size={15} />
                View Official Credential
              </a>
            )}

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-semibold backdrop-blur transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={15} />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "rgba(15,8,2,0.93)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-110"
            onClick={() => setLightboxOpen(false)}
            title="Close (Esc)"
          >
            <X size={18} />
          </button>

          {/* Caption */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-0.5">
              Certificate
            </p>
            <p className="text-white text-sm font-bold">{cert.title}</p>
          </div>

          {/* Certificate image */}
          <div
            className="relative max-w-[95vw] max-h-[92vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ornamental glow frame */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: `0 0 80px 20px ${style.glow}40, 0 0 0 1px ${style.glow}30`,
              }}
            />
            <img
              src={cert.image}
              alt={`${cert.title} — full certificate`}
              className="max-w-full max-h-[88vh] w-auto h-auto rounded-xl shadow-2xl object-contain"
              style={{ border: `2px solid ${style.glow}50` }}
            />
          </div>

          {/* Keyboard hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-wider">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">Esc</kbd> or click outside to close
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Reusable section wrapper ── */
function Section({ icon, title, children }) {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#CDB77F]/25 shadow-sm hover:shadow-lg transition-shadow duration-500">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow"
          style={{ background: "linear-gradient(135deg, #9B5F3F, #6F4A2D)" }}>
          {icon}
        </div>
        <h2 className="text-lg sm:text-xl font-serif font-bold text-[#3D200E]">{title}</h2>
        {/* decorative line */}
        <div className="flex-1 h-px bg-gradient-to-r from-[#CDB77F]/50 to-transparent ml-2" />
      </div>
      {children}
    </div>
  );
}
