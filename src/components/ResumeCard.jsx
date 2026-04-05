import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Award, ArrowRight, Download } from "lucide-react";

function ResumeCard({ resume }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/resume/detail/${resume.id}`);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fadeUp">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#9B5F3F] to-[#CDB77F]"></div>

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{resume.icon}</span>
              {resume.badge && (
                <span className="px-3 py-1 bg-[#9B5F3F] text-white text-xs font-semibold rounded-full">
                  {resume.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#6F4A2D] mb-2">
              {resume.title}
            </h3>
            <p className="text-lg font-semibold text-[#9B5F3F]">
              {resume.company}
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="space-y-2 mb-6 pb-6 border-b border-[#EDE3CF]">
          <div className="flex items-center gap-2 text-[#6F4A2D]/70">
            <Calendar size={16} />
            <span className="text-sm">{resume.period}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6F4A2D]/70">
            <MapPin size={16} />
            <span className="text-sm">{resume.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#6F4A2D]/80 mb-6 leading-relaxed">
          {resume.description}
        </p>

        {/* Responsibilities */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[#6F4A2D] mb-3 flex items-center gap-2">
            <Award size={16} />
            Key Responsibilities
          </h4>
          <ul className="space-y-2">
            {(resume.responsibilities || []).slice(0, 3).map((resp, index) => (
              <li key={index} className="text-sm text-[#6F4A2D]/70 flex gap-3">
                <span className="text-[#9B5F3F] font-bold">•</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[#6F4A2D] mb-3">
            Technical Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {(resume.skills || []).slice(0, 6).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#EDE3CF] text-[#6F4A2D] text-xs font-semibold rounded-full hover:bg-[#D6C59A] transition"
              >
                {skill}
              </span>
            ))}
            {(resume.skills || []).length > 6 && (
              <span className="px-3 py-1 text-[#9B5F3F] text-xs font-semibold">
                +{(resume.skills || []).length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className={`flex gap-3 ${resume.resumeUrl ? "flex-col sm:flex-row" : ""}`}>
          <button
            onClick={handleViewDetails}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#9B5F3F] to-[#8B5736] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 group/btn"
          >
            View Full Experience
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition" />
          </button>
          {resume.resumeUrl && (
            <a
              href={resume.resumeUrl}
              download="ios_app_developer_resume.pdf"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#CDB77F] to-[#9B5F3F] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 group/btn"
            >
              <Download size={18} />
              Download Resume
            </a>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#9B5F3F]/0 via-[#9B5F3F]/5 to-[#9B5F3F]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}

export default ResumeCard;
