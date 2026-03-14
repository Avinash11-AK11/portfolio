import React, { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Github, Phone, ArrowUp, Sparkles } from "lucide-react";
import { personalInfo } from "../data/certifications";

function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const NAV_LINKS = [
  { label: "Home",           href: "/" },
  { label: "Projects",       href: "/projects" },
  { label: "Skills",         href: "/skills" },
  { label: "Certifications", href: "/certifications" },
  { label: "Resume",         href: "/resume" },
  { label: "Contact",        href: "/contact" },
];

const SOCIAL_LINKS = [
  { Icon: Mail,     label: "Email",    href: `mailto:${personalInfo.email}`,          external: false },
  { Icon: Phone,    label: "Call",     href: `tel:${personalInfo.phone.replace(/\s/g,"")}`, external: false },
  { Icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin,                   external: true  },
  { Icon: Github,   label: "GitHub",   href: personalInfo.github,                     external: true  },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const [rootRef, visible] = useInView();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden text-white"
      style={{ background: "linear-gradient(160deg, #3A2010 0%, #5C3318 35%, #7A4530 70%, #9B5F3F 100%)" }}
    >

      {/* subtle texture dots */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(205,183,127,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* top gold accent line */}
      <div className="relative h-px w-full" style={{
        background: "linear-gradient(90deg, transparent 0%, #CDB77F 30%, #EDE3CF 50%, #CDB77F 70%, transparent 100%)",
      }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Brand — col span 5 */}
          <div
            className="md:col-span-5 space-y-5"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}
          >
            {/* Monogram + Name */}
            <div className="flex items-center gap-4">
              <div className="footer-monogram flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-[#3A2010]"
                style={{ background: "linear-gradient(135deg, #EDE3CF 0%, #CDB77F 50%, #EDE3CF 100%)" }}
              >
                AC
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#CDB77F] font-medium">Portfolio</p>
                <h3 className="text-2xl font-serif font-bold text-[#EDE3CF] leading-tight">Avinash Chavda</h3>
              </div>
            </div>

            <p className="text-[#F4EEDB]/70 text-sm leading-relaxed max-w-sm">
              {personalInfo.bio}
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "rgba(205,183,127,0.15)", border: "1px solid rgba(205,183,127,0.3)", color: "#EDE3CF" }}
            >
              <Sparkles size={11} style={{ color: "#CDB77F" }} />
              Available for opportunities
            </div>
          </div>

          {/* Quick Links — col span 3 */}
          <div
            className="md:col-span-3 space-y-5"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-px" style={{ background: "#CDB77F" }} />
              <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#CDB77F]">Navigation</h4>
            </div>

            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-nav-link group flex items-center gap-2 text-sm text-[#F4EEDB]/75 hover:text-[#EDE3CF] transition-colors duration-300">
                    <span className="footer-nav-dot w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300"
                      style={{ background: "rgba(205,183,127,0.4)" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect — col span 4 */}
          <div
            className="md:col-span-4 space-y-5"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-px" style={{ background: "#CDB77F" }} />
              <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#CDB77F]">Connect</h4>
            </div>

            <div className="space-y-3">
              {SOCIAL_LINKS.map(({ Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="footer-contact-btn group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="footer-icon-wrap w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: "rgba(205,183,127,0.15)" }}
                  >
                    <Icon size={15} style={{ color: "#CDB77F" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#CDB77F]/80 uppercase tracking-wide font-medium leading-none mb-0.5">{label}</p>
                    <p className="text-sm text-[#EDE3CF]/80 truncate leading-none">
                      {label === "Email"   ? personalInfo.email :
                       label === "Call"    ? personalInfo.phone :
                       label === "LinkedIn"? "linkedin.com/in/avinash-chavda" :
                                            "github.com/Avinash11-AK11"}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Ornamental Divider ── */}
        <div
          className="flex items-center gap-4 mb-8"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.45s" }}
        >
          <div className="flex-1 h-px" style={{ background: "rgba(205,183,127,0.25)" }} />
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full" style={{ background: "#CDB77F" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CDB77F" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "#CDB77F" }} />
          </div>
          <div className="flex-1 h-px" style={{ background: "rgba(205,183,127,0.25)" }} />
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s" }}
        >
          <p className="text-sm text-[#F4EEDB]/50">
            © {currentYear} <span className="text-[#EDE3CF]/80 font-medium">Avinash Chavda</span>. All rights reserved.
          </p>

          <p className="text-sm text-[#F4EEDB]/50">
            Crafted with <span className="text-[#CDB77F]">♦</span> passion & precision
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="back-top group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
            style={{ background: "rgba(205,183,127,0.15)", border: "1px solid rgba(205,183,127,0.3)", color: "#EDE3CF" }}
          >
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform duration-300" style={{ color: "#CDB77F" }} />
            Back to top
          </button>
        </div>

      </div>

      <style jsx>{`
        .footer-monogram {
          box-shadow: 0 0 18px rgba(205,183,127,0.35), inset 0 1px 0 rgba(255,255,255,0.3);
          font-family: serif;
          letter-spacing: 0.04em;
        }

        .footer-nav-link:hover .footer-nav-dot {
          background: #CDB77F !important;
          transform: scale(1.6);
        }

        .footer-contact-btn:hover {
          background: rgba(205,183,127,0.12) !important;
          border-color: rgba(205,183,127,0.4) !important;
          transform: translateX(4px);
        }

        .footer-contact-btn:hover .footer-icon-wrap {
          background: rgba(205,183,127,0.28) !important;
        }

        .back-top:hover {
          background: rgba(205,183,127,0.3) !important;
          border-color: rgba(205,183,127,0.6) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(205,183,127,0.2);
        }
      `}</style>

    </footer>
  );
}

export default Footer;