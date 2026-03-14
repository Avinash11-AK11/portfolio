import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Share2, Check } from "lucide-react";

function CertCard({ cert }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const getTypeStyle = (type) => {
    switch (type) {
      case "Course Completion":
        return {
          badge: "bg-[#EDE3CF] text-[#6F4A2D]",
          ribbon: "bg-[#CDB77F]"
        };

      case "Internship":
        return {
          badge: "bg-[#D6C59A] text-[#6F4A2D]",
          ribbon: "bg-[#9B5F3F]"
        };

      case "Project":
        return {
          badge: "bg-[#CDB77F] text-[#6F4A2D]",
          ribbon: "bg-[#6F4A2D]"
        };

      default:
        return {
          badge: "bg-[#EDE3CF] text-[#6F4A2D]",
          ribbon: "bg-[#CDB77F]"
        };
    }
  };

  const style = getTypeStyle(cert.type);

  /* Navigate to detail page */
  function handleCardClick() {
    navigate(`/certifications/detail/${cert.id}`);
  }

  /* Share / copy-link */
  async function handleShare(e) {
    e.stopPropagation(); /* prevent card click */
    const shareUrl = `${window.location.origin}/certifications/detail/${cert.id}`;
    const shareData = {
      title: cert.title,
      text: `Check out this certification: ${cert.title} by ${cert.organization}`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        /* clipboard not available */
      }
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-card cursor-pointer"
    >

      {/* Type Ribbon */}
      <div className={`absolute top-0 left-0 px-4 py-1 text-xs font-semibold text-white z-10 ${style.ribbon}`}>
        {cert.type}
      </div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">

        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* "View Details" label on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
          <span className="px-4 py-2 rounded-full bg-white/90 text-[#6F4A2D] text-xs font-bold shadow-lg tracking-wide">
            View Details →
          </span>
        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        <div className="flex justify-between items-start mb-3">

          <div>
            <p className="text-sm text-[#9B5F3F] font-semibold mb-1">
              {cert.organization}
            </p>

            <h3 className="text-lg font-serif font-bold text-[#6F4A2D] leading-snug">
              {cert.title}
            </h3>
          </div>

          <span className="text-3xl ml-3 transform group-hover:scale-110 transition">
            {cert.badge}
          </span>

        </div>

        <p className="text-sm text-[#6F4A2D]/80 mb-5 line-clamp-2">
          {cert.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs text-[#6F4A2D]/60 mb-1">
              {cert.date}
            </p>

            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style.badge}`}>
              {cert.type}
            </span>
          </div>

          <div className="flex items-center gap-2">

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-[#F4EEDB] hover:bg-[#CDB77F] hover:scale-110 transition-all duration-300"
              title={copied ? "Link copied!" : "Share"}
            >
              {copied
                ? <Check size={16} className="text-green-600" />
                : <Share2 size={16} className="text-[#6F4A2D]" />
              }
            </button>

            {/* External credential link */}
            {cert.credentialUrl && cert.credentialUrl !== "#" && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-[#F4EEDB] hover:bg-[#CDB77F] hover:scale-110 transition-all duration-300"
                title="View Credential"
              >
                <ExternalLink size={18} className="text-[#6F4A2D]" />
              </a>
            )}

          </div>

        </div>

      </div>

      {/* Card Animation */}
      <style jsx>{`
        .animate-card {
          animation: cardFade 0.7s ease forwards;
        }

        @keyframes cardFade {
          from {
            opacity:0;
            transform: translateY(30px);
          }
          to {
            opacity:1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}

export default CertCard;
