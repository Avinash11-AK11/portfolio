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
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#CDB77F] blur-[160px] opacity-30 top-20 -left-32 rounded-full"></div>
<div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] blur-[140px] opacity-20 bottom-[-150px] right-[-150px] rounded-full"></div>

      {/* Header */}
     <div className="relative bg-gradient-to-r from-[#9B5F3F] via-[#8B5736] to-[#6F4A2D] text-white py-12 md:py-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">

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
        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-10 animate-fadeUp delay-300">

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
            {/* Result count */}
            <p className="text-[#6F4A2D] font-medium mb-8">
              Showing{" "}
              <span className="font-bold text-[#9B5F3F]">
                {filteredCerts.length}
              </span>{" "}
              certification(s)
            </p>

            {/* Certificate Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">

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

            <div className="text-6xl mb-6">📄</div>

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
              className="px-8 py-3 rounded-full bg-[#9B5F3F] text-white font-semibold shadow hover:scale-105 transition"
            >
              Reset Filters
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

      `}</style>

    </div>
  );
}

export default CertificationsPage;