import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Code2,
  Download,
  GitBranch,
  MapPin,
  Share2,
  Trophy,
} from "lucide-react";
import { resumesData } from "../data/resumes";

export default function ResumeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shareMessage, setShareMessage] = useState("");

  const resume = resumesData.find((item) => String(item.id) === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: resume?.title || "Resume",
          text: `Check out this resume profile: ${resume?.title || "Experience"}`,
          url: shareUrl,
        });
        setShareMessage("Shared successfully.");
        setTimeout(() => setShareMessage(""), 2200);
        return;
      } catch {
        /* user cancelled */
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("Link copied to clipboard.");
      setTimeout(() => setShareMessage(""), 2200);
    } catch {
      setShareMessage("Unable to share right now.");
      setTimeout(() => setShareMessage(""), 2200);
    }
  };

  if (!resume) {
    return (
      <div className="min-h-screen bg-[#D8CFB0] flex flex-col">
        <div className="flex-1 pt-28 px-4 sm:px-6 flex items-center justify-center">
          <div className="max-w-xl w-full bg-[#F8F4EA] border border-[#CDB77F]/40 rounded-3xl shadow-xl p-10 text-center">
            <div className="text-6xl mb-4">💼</div>
            <h2 className="text-3xl font-serif font-bold text-[#6F4A2D] mb-3">
              Resume Not Found
            </h2>
            <p className="text-[#6F4A2D]/75 mb-8">
              The profile you are looking for does not exist or was removed.
            </p>
            <button
              onClick={() => navigate("/resume")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#9B5F3F] to-[#8B5736] text-white font-semibold hover:shadow-lg transition-all duration-300"
            >
              Back to Resume List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Add luxury animation classes
  const sectionCardClass =
    "bg-[#F8F4EA]/90 backdrop-blur-sm border border-[#CDB77F]/35 rounded-3xl shadow-lg p-7 sm:p-10 animate-fade-up";

  return (
    <div className="min-h-screen bg-[#D8CFB0] relative overflow-hidden pt-24">
      <div className="absolute w-[500px] h-[500px] bg-[#CDB77F] blur-[170px] opacity-25 top-28 -left-40 rounded-full" />
      <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] blur-[150px] opacity-15 bottom-[-180px] right-[-180px] rounded-full" />

      <header className="relative bg-gradient-to-r from-[#9B5F3F] via-[#8B5736] to-[#6F4A2D] text-white shadow-xl animate-fade-up" style={{ animationDelay: "60ms" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <button
            onClick={() => navigate("/resume")}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-white/15 border border-white/30 hover:bg-white/25 transition-all duration-300 text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            Back to Resume List
          </button>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/15 border border-white/35 backdrop-blur-md flex items-center justify-center text-5xl shadow-2xl animate-soft-float" style={{ animationDelay: "120ms" }}>
              {resume.icon || "💼"}
            </div>

            <div className="flex-1 w-full animate-fade-up" style={{ animationDelay: "120ms" }}>
              {resume.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-[#CDB77F]/25 border border-[#FFE4C4]/45 text-[#FFE4C4]">
                  <span className="w-2 h-2 rounded-full bg-[#FFE4C4]" />
                  <span className="text-xs sm:text-sm tracking-[0.18em] uppercase font-bold">
                    {resume.badge}
                  </span>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-2">
                {resume.title}
              </h1>
              <p className="text-2xl sm:text-3xl text-[#FFE4C4] font-serif font-semibold mb-4">
                {resume.company}
              </p>

              <p className="text-white/90 max-w-3xl leading-relaxed mb-8 text-base sm:text-lg">
                {resume.description || resume.fullDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-2xl border border-white/35 bg-white/12 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2 text-[#FFE4C4]">
                    <Calendar size={18} />
                    <span className="text-xs uppercase tracking-widest font-semibold">Period</span>
                  </div>
                  <p className="font-bold text-lg text-white">{resume.period}</p>
                </div>

                <div className="rounded-2xl border border-white/35 bg-white/12 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2 text-[#FFE4C4]">
                    <MapPin size={18} />
                    <span className="text-xs uppercase tracking-widest font-semibold">Location</span>
                  </div>
                  <p className="font-bold text-lg text-white">{resume.location}</p>
                </div>

                <div className="rounded-2xl border border-white/35 bg-white/12 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2 text-[#FFE4C4]">
                    <Briefcase size={18} />
                    <span className="text-xs uppercase tracking-widest font-semibold">Category</span>
                  </div>
                  <p className="font-bold text-lg text-white">{resume.category}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/15 border border-white/40 font-bold hover:bg-white/25 transition-all duration-300"
                >
                  <Share2 size={18} />
                  Share Resume
                </button>

                {resume.resumeUrl && (
                  <a
                    href={resume.resumeUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFE4C4] to-[#F1D9AF] text-[#6F4A2D] font-bold hover:brightness-105 transition-all duration-300 shadow-lg"
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                )}
              </div>

              {shareMessage && (
                <p className="mt-4 text-sm text-[#FFE4C4] font-semibold">{shareMessage}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="space-y-8 md:space-y-10">
          <section className={sectionCardClass} style={{ animationDelay: "180ms" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-11 rounded-full bg-gradient-to-b from-[#9B5F3F] via-[#CDB77F] to-[#8B5736]" />
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#6F4A2D]">
                Professional Overview
              </h2>
            </div>
            <p className="text-[#6F4A2D]/80 text-base sm:text-lg leading-relaxed">
              {resume.fullDescription}
            </p>
          </section>

          {resume.education && (
            <section className={sectionCardClass} style={{ animationDelay: "240ms" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#9B5F3F]/20 to-[#CDB77F]/20 border border-[#9B5F3F]/25">
                  <BookOpen size={26} className="text-[#9B5F3F]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#6F4A2D]">Education</h2>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#6F4A2D] mb-2">
                {resume.education.degree}
              </h3>
              <p className="text-lg font-semibold text-[#9B5F3F] mb-1">
                {resume.education.institution}
              </p>
              <p className="text-[#6F4A2D]/70 mb-6">{resume.education.location}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl border border-[#CDB77F]/50 bg-[#F4EEDB] p-4">
                  <p className="text-xs uppercase tracking-widest text-[#9B5F3F] font-bold mb-1">Period</p>
                  <p className="text-[#6F4A2D] font-bold">{resume.education.period}</p>
                </div>
                <div className="rounded-2xl border border-[#CDB77F]/50 bg-[#F4EEDB] p-4">
                  <p className="text-xs uppercase tracking-widest text-[#9B5F3F] font-bold mb-1">CGPA</p>
                  <p className="text-[#6F4A2D] font-bold">{resume.education.cgpa}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#CDB77F]/40 bg-[#F8F2E2] p-4">
                  <p className="text-xs uppercase tracking-wider text-[#9B5F3F] font-bold mb-2">Focus Areas</p>
                  <p className="text-[#6F4A2D]/80 leading-relaxed">{resume.education.focus}</p>
                </div>
                <div className="rounded-2xl border border-[#CDB77F]/40 bg-[#F8F2E2] p-4">
                  <p className="text-xs uppercase tracking-wider text-[#9B5F3F] font-bold mb-2">Activities</p>
                  <p className="text-[#6F4A2D]/80 leading-relaxed">{resume.education.activities}</p>
                </div>
              </div>
            </section>
          )}

          <section className={sectionCardClass} style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#9B5F3F]/20 to-[#CDB77F]/20 border border-[#9B5F3F]/25">
                <Award size={26} className="text-[#9B5F3F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#6F4A2D]">Key Responsibilities</h2>
            </div>

            <div className="space-y-3">
              {(resume.responsibilities || []).map((responsibility, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#F4EEDB]/80 to-[#F8F4EA] border border-[#CDB77F]/35"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9B5F3F] to-[#7A4F2F] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-[#6F4A2D]/82 leading-relaxed">{responsibility}</p>
                </div>
              ))}
              {/* Fallback for new data structure: show project bullets as responsibilities if not present */}
              {(!resume.responsibilities && resume.projects && resume.projects[0]?.bullets) && resume.projects[0].bullets.map((b, i) => (
                <div key={"b"+i} className="flex gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#F4EEDB]/80 to-[#F8F4EA] border border-[#CDB77F]/35">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9B5F3F] to-[#7A4F2F] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</div>
                  <p className="text-[#6F4A2D]/82 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={sectionCardClass} style={{ animationDelay: "360ms" }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#9B5F3F]/20 to-[#CDB77F]/20 border border-[#9B5F3F]/25">
                <Code2 size={26} className="text-[#9B5F3F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#6F4A2D]">Technical Skills</h2>
            </div>

            {resume.technicalSkills ? (
              <div className="space-y-7">
                {Object.entries(resume.technicalSkills).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-widest text-[#9B5F3F] mb-3 pb-2 border-b border-[#CDB77F]/60">
                      {category.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {(skills || []).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-xl bg-[#F4EEDB] text-[#6F4A2D] border border-[#CDB77F]/55 font-semibold text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {(resume.skills || []).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-[#F4EEDB] text-[#6F4A2D] border border-[#CDB77F]/55 font-semibold text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </section>

          {resume.projects && (
            <section className={sectionCardClass} style={{ animationDelay: "360ms" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#9B5F3F]/20 to-[#CDB77F]/20 border border-[#9B5F3F]/25">
                  <GitBranch size={26} className="text-[#9B5F3F]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#6F4A2D]">Projects</h2>
              </div>

              <div className="space-y-5">
                {(resume.projects || []).map((project, index) => (
                  <article
                    key={index}
                    className="rounded-2xl border border-[#CDB77F]/45 bg-[#F8F2E2] p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-[#6F4A2D]">{project.name}</h3>
                        {/* Show stack if present */}
                        {project.stack && <p className="text-[#9B5F3F] font-semibold">{project.stack.join(" • ")}</p>}
                        {project.type && <p className="text-[#9B5F3F] font-semibold">{project.type}</p>}
                      </div>
                      {project.status && (
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#9B5F3F] to-[#7A4F2F] text-white text-xs font-bold uppercase tracking-wider">
                          {project.status}
                        </span>
                      )}
                    </div>

                    {/* Prefer description, fallback to nothing */}
                    {project.description && <p className="text-[#6F4A2D]/80 mb-4 leading-relaxed">{project.description}</p>}

                    {/* Prefer details, fallback to bullets */}
                    <div className="space-y-2.5">
                      {(project.details || project.bullets || []).map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-[#6F4A2D]/80 text-sm leading-relaxed">
                          <span className="font-bold text-[#9B5F3F] mr-2">•</span>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {resume.achievements && (
            <section className={sectionCardClass} style={{ animationDelay: "420ms" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#9B5F3F]/20 to-[#CDB77F]/20 border border-[#9B5F3F]/25">
                  <Trophy size={26} className="text-[#9B5F3F]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#6F4A2D]">
                  Achievements & Competitions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(resume.achievements || []).map((achievement, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#CDB77F]/45 bg-[#F8F2E2] p-5"
                  >
                    <h3 className="text-lg font-bold text-[#6F4A2D] mb-2">{achievement.title || achievement}</h3>
                    {achievement.description && <p className="text-[#6F4A2D]/80 leading-relaxed">{achievement.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.certifications && (
            <section className={sectionCardClass}>
              <div className="flex items-center gap-3 mb-7">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#9B5F3F]/20 to-[#CDB77F]/20 border border-[#9B5F3F]/25">
                  <Award size={26} className="text-[#9B5F3F]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#6F4A2D]">Certifications</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resume.certifications.map((certification, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#CDB77F]/45 bg-[#F8F2E2] p-5"
                  >
                    <h3 className="text-lg font-bold text-[#6F4A2D] mb-1">{certification.name}</h3>
                    <p className="text-[#9B5F3F] font-semibold mb-2">{certification.provider}</p>
                    <p className="text-[#6F4A2D]/80 text-sm leading-relaxed">
                      <span className="font-bold">Skills:</span> {certification.skills}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="flex justify-center pt-10 pb-6">
          <button
            onClick={() => navigate("/resume")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#9B5F3F] to-[#7A4F2F] text-white font-bold hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to All Resumes
          </button>
        </div>
      </main>
    </div>
  );
}
