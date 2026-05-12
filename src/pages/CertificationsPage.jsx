import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { certificationsData, categories } from "../data/certifications";
import CertCard from "../components/CertCard";
import FilterBar from "../components/FilterBar";

function CertificationsPage() {
  const { category } = useParams();

  // Load filters from localStorage on mount
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("cert_searchTerm") || "";
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("cert_selectedCategory") || category || "";
  });
  const [selectedType, setSelectedType] = useState(() => {
    return localStorage.getItem("cert_selectedType") || "";
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("cert_sortBy") || "date-desc";
  });

  // Save filters to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem("cert_searchTerm", searchTerm);
  }, [searchTerm]);

  React.useEffect(() => {
    localStorage.setItem("cert_selectedCategory", selectedCategory);
  }, [selectedCategory]);

  React.useEffect(() => {
    localStorage.setItem("cert_selectedType", selectedType);
  }, [selectedType]);

  React.useEffect(() => {
    localStorage.setItem("cert_sortBy", sortBy);
  }, [sortBy]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedType("");
  };

  const isSingleCategory = !!category;

  const categoryObj = categories.find(
    (c) => c.id === (category || "all")
  );

  const categoryName = isSingleCategory
    ? categoryObj?.name
    : "Certifications & Achievements";

  const filteredCerts = useMemo(() => {
    let filtered = certificationsData.filter((cert) => {
      const certCategory = cert.category.toLowerCase().replace(/\s+/g, "-");

      const matchCategory = isSingleCategory
        ? certCategory === category
        : !selectedCategory || certCategory === selectedCategory;

      const matchSearch =
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.organization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = !selectedType || cert.type === selectedType;

      return matchCategory && matchSearch && matchType;
    });

    if (sortBy === "date-asc") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (sortBy === "date-desc") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [category, selectedCategory, searchTerm, selectedType, sortBy, isSingleCategory]);

  const typeOrder = ["Course Completion", "Internship", "Hackathon", "Quiz", "Assessment", "Project"];
  const types = [
    ...new Set(
      isSingleCategory
        ? certificationsData
            .filter(
              (cert) =>
                cert.category.toLowerCase().replace(/\s+/g, "-") === category
            )
            .map((cert) => cert.type)
        : selectedCategory
        ? certificationsData
            .filter(
              (cert) =>
                cert.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
            )
            .map((cert) => cert.type)
        : certificationsData
            .filter((cert) => cert.type === "Course Completion" || cert.type === "Internship")
            .map((cert) => cert.type)
    ),
  ].sort((a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b));

  return (
    <div className="min-h-screen bg-[#D8CFB0] relative overflow-hidden pt-24">
      {/* Animated Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-[#CDB77F] blur-[160px] opacity-30 top-20 -left-32 rounded-full animate-certGradientShift"></div>
        <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] blur-[140px] opacity-20 bottom-[-150px] right-[-150px] rounded-full animate-certGradientShift" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Animated Morphing Blobs - Layer 1 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-[#CDB77F]/20 to-transparent blur-3xl rounded-full animate-certBlobMorph1 top-1/4 left-1/4"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-[#9B5F3F]/15 to-transparent blur-3xl rounded-full animate-certBlobMorph2 bottom-1/3 right-1/3" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Animated Morphing Blobs - Layer 2 (Additional) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-gradient-to-b from-[#CDB77F]/15 to-transparent blur-3xl rounded-full animate-certBlobMorph3 top-1/3 right-1/4" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-gradient-to-l from-[#9B5F3F]/10 to-transparent blur-3xl rounded-full animate-certBlobMorph4 bottom-1/4 left-1/3" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Orbital Ring */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] border border-[#CDB77F]/10 rounded-full animate-certOrbitalRotate"></div>
          <div className="w-[800px] h-[800px] border border-[#CDB77F]/5 rounded-full animate-certOrbitalRotateReverse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-25"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 2 === 0 ? "#CDB77F" : "#9B5F3F",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `certFloatParticle${(i % 6) + 1} ${4 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Animated Depth Shift Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-certDepthShift pointer-events-none"></div>

      {/* Header */}
     <div className="relative bg-gradient-to-r from-[#9B5F3F] via-[#8B5736] to-[#6F4A2D] text-white py-12 md:py-20 shadow-xl overflow-hidden">
        {/* Header Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#9B5F3F]/0 via-[#CDB77F]/5 to-[#9B5F3F]/0 animate-certGradientShift pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 relative z-10">
          {/* Animated Decorative Line - Top Left */}
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#CDB77F] to-transparent opacity-40 animate-certExpandLeft w-32"></div>

          {/* Animated Decorative Line - Top Right */}
          <div className="absolute top-0 right-0 h-1 bg-gradient-to-l from-[#CDB77F] to-transparent opacity-40 animate-certExpandRight w-32"></div>

          {/* Pulsing Glow Dot */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#CDB77F] rounded-full animate-certPulseGlow"></div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 animate-fadeUp">
            {categoryName}
          </h1>

          <p className="max-w-3xl text-lg opacity-90 animate-fadeUp delay-200">
            {isSingleCategory
              ? "Explore all certifications and achievements earned in this specialization."
              : "A curated collection of certifications, technical achievements, and professional milestones across web development, app development, and data analysis."}
          </p>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 relative z-10">

        {/* Filter Container */}
        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-10 animate-fadeUp delay-300 relative overflow-hidden group">
          {/* Animated shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12" style={{ animation: 'shimmer 3s infinite' }}></div>
          </div>

          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            types={types}
            categories={isSingleCategory ? [] : categories}
            isSingleCategory={isSingleCategory}
            searchPlaceholder="Search certifications..."
          />

        </div>

        {filteredCerts.length > 0 ? (
          <>
            {/* Result count with animated accent */}
            <div className="mb-8 relative inline-block">
              <p className="text-[#6F4A2D] font-medium">
                Showing{" "}
                <span className="font-bold text-[#9B5F3F]">
                  {filteredCerts.length}
                </span>{" "}
                certification(s)
              </p>
              <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#CDB77F] to-transparent opacity-60 animate-certExpandLeft"></div>
            </div>

            {/* Certificate Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-12">

              {filteredCerts.map((cert, index) => (
                <div
                  key={cert.id}
                  className="animate-card"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <CertCard cert={cert} />
                </div>
              ))}

            </div>
          </>
        ) : (
          <div className="text-center py-24 animate-fadeUp">

            <div className="text-6xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>📄</div>

            <h3 className="text-2xl font-serif font-bold text-[#6F4A2D] mb-3">
              No Certifications Found
            </h3>

            <p className="text-[#6F4A2D]/80 mb-6">
              Try adjusting your filters or search keywords.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSelectedType("");
              }}
              className="px-8 py-3 rounded-full bg-[#9B5F3F] text-white font-semibold shadow hover:scale-105 transition relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500"></div>
              <span className="relative">Reset Filters</span>
            </button>

          </div>
        )}

      </div>

      {/* Animations */}
      <style jsx>{`

        .animate-fadeUp {
          animation: fadeUp 0.9s ease forwards;
          opacity:0;
        }

        .delay-200 { animation-delay:.2s }
        .delay-300 { animation-delay:.3s }

        @keyframes fadeUp {
          from {
            opacity:0;
            transform: translateY(30px);
          }
          to {
            opacity:1;
            transform: translateY(0);
          }
        }

        .animate-card {
          animation: cardUp 0.7s ease forwards;
          opacity:0;
        }

        @keyframes cardUp {
          from {
            opacity:0;
            transform: translateY(40px);
          }
          to {
            opacity:1;
            transform: translateY(0);
          }
        }

        .animate-certGradientShift {
          animation: certGradientShift 12s ease-in-out infinite;
        }

        @keyframes certGradientShift {
          0%, 100% {
            opacity: 0.3;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        .animate-certBlobMorph1 {
          animation: certBlobMorph1 16s ease-in-out infinite;
        }

        @keyframes certBlobMorph1 {
          0%, 100% {
            opacity: 0.15;
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            opacity: 0.25;
            transform: translate(50px, -50px) scale(1.1) rotate(90deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            opacity: 0.15;
            transform: translate(-50px, 50px) scale(0.95) rotate(180deg);
            border-radius: 70% 30% 66% 33% / 33% 66% 33% 66%;
          }
          75% {
            opacity: 0.2;
            transform: translate(40px, 40px) scale(1.05) rotate(270deg);
            border-radius: 40% 60% 30% 70% / 30% 30% 70% 70%;
          }
        }

        .animate-certBlobMorph2 {
          animation: certBlobMorph2 18s ease-in-out infinite;
        }

        @keyframes certBlobMorph2 {
          0%, 100% {
            opacity: 0.1;
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            opacity: 0.18;
            transform: translate(-60px, 40px) scale(0.98) rotate(90deg);
            border-radius: 58% 42% 44% 56% / 34% 53% 47% 66%;
          }
          50% {
            opacity: 0.12;
            transform: translate(60px, -60px) scale(1.08) rotate(180deg);
            border-radius: 70% 30% 66% 33% / 33% 66% 33% 66%;
          }
          75% {
            opacity: 0.16;
            transform: translate(-40px, -40px) scale(1.02) rotate(270deg);
            border-radius: 42% 58% 70% 30% / 58% 44% 56% 42%;
          }
        }

        .animate-certBlobMorph3 {
          animation: certBlobMorph3 18s ease-in-out infinite;
        }

        @keyframes certBlobMorph3 {
          0%, 100% {
            opacity: 0.15;
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 40% 60% 50% 50% / 50% 50% 50% 50%;
          }
          33% {
            opacity: 0.25;
            transform: translate(-50px, -50px) scale(1.15) rotate(120deg);
            border-radius: 20% 80% 60% 40% / 40% 60% 40% 60%;
          }
          66% {
            opacity: 0.18;
            transform: translate(50px, 50px) scale(0.95) rotate(240deg);
            border-radius: 60% 40% 40% 60% / 60% 40% 40% 60%;
          }
        }

        .animate-certBlobMorph4 {
          animation: certBlobMorph4 20s ease-in-out infinite;
        }

        @keyframes certBlobMorph4 {
          0%, 100% {
            opacity: 0.12;
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 50% 50% 40% 60% / 60% 40% 50% 50%;
          }
          25% {
            opacity: 0.2;
            transform: translate(60px, -60px) scale(1.1) rotate(90deg);
            border-radius: 30% 70% 50% 50% / 50% 50% 70% 30%;
          }
          50% {
            opacity: 0.14;
            transform: translate(-60px, 60px) scale(1.05) rotate(180deg);
            border-radius: 50% 50% 60% 40% / 40% 60% 50% 50%;
          }
          75% {
            opacity: 0.18;
            transform: translate(40px, -40px) scale(0.98) rotate(270deg);
            border-radius: 70% 30% 40% 60% / 60% 40% 30% 70%;
          }
        }

        .animate-certOrbitalRotate {
          animation: certOrbitalRotate 20s linear infinite;
        }

        @keyframes certOrbitalRotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            border-color: rgba(205, 183, 127, 0.15);
          }
          50% {
            border-color: rgba(205, 183, 127, 0.25);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
            border-color: rgba(205, 183, 127, 0.15);
          }
        }

        .animate-certOrbitalRotateReverse {
          animation: certOrbitalRotateReverse 30s linear infinite;
        }

        @keyframes certOrbitalRotateReverse {
          0% {
            transform: translate(-50%, -50%) rotate(360deg);
            border-color: rgba(205, 183, 127, 0.08);
          }
          50% {
            border-color: rgba(205, 183, 127, 0.15);
          }
          100% {
            transform: translate(-50%, -50%) rotate(0deg);
            border-color: rgba(205, 183, 127, 0.08);
          }
        }

        .animate-certDepthShift {
          animation: certDepthShift 8s ease-in-out infinite;
        }

        @keyframes certDepthShift {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.05;
          }
        }

        .animate-certFloatParticle1 {
          animation: certFloatParticle1 4s ease-in-out infinite;
        }

        .animate-certFloatParticle2 {
          animation: certFloatParticle2 5s ease-in-out infinite;
        }

        .animate-certFloatParticle3 {
          animation: certFloatParticle3 6s ease-in-out infinite;
        }

        .animate-certFloatParticle4 {
          animation: certFloatParticle4 7s ease-in-out infinite;
        }

        .animate-certFloatParticle5 {
          animation: certFloatParticle5 8s ease-in-out infinite;
        }

        .animate-certFloatParticle6 {
          animation: certFloatParticle6 9s ease-in-out infinite;
        }

        @keyframes certFloatParticle1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-50px) translateX(50px); opacity: 0.4; }
        }

        @keyframes certFloatParticle2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-60px) translateX(-60px); opacity: 0.45; }
        }

        @keyframes certFloatParticle3 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-70px) translateX(30px); opacity: 0.4; }
        }

        @keyframes certFloatParticle4 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-40px) translateX(-50px); opacity: 0.45; }
        }

        @keyframes certFloatParticle5 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-65px) translateX(45px); opacity: 0.4; }
        }

        @keyframes certFloatParticle6 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-55px) translateX(-45px); opacity: 0.4; }
        }

        .animate-certPulseGlow {
          animation: certPulseGlow 2s ease-in-out infinite;
        }

        @keyframes certPulseGlow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(205, 183, 127, 0.3);
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            box-shadow: 0 0 16px rgba(205, 183, 127, 0.6);
            transform: scale(1.3);
            opacity: 0.9;
          }
        }

        .animate-certExpandLeft {
          animation: certExpandLeft 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes certExpandLeft {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        .animate-certExpandRight {
          animation: certExpandRight 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes certExpandRight {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

      `}</style>

    </div>
  );
}

export default CertificationsPage;