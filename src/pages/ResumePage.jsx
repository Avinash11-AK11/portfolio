import React, { useState, useMemo } from "react";
import { resumesData, resumeCategories } from "../data/resumes";
import ResumeCard from "../components/ResumeCard";
import FilterBar from "../components/FilterBar";

function ResumePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredResumes = useMemo(() => {
    let filtered = resumesData.filter((resume) => {
      const resumeCategory = resume.category.toLowerCase().replace(/\s+/g, "-");

      const matchCategory = !selectedCategory || resumeCategory === selectedCategory;

      const matchSearch =
        resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });

    if (sortBy === "date-asc") {
      filtered.sort((a, b) => {
        const getYear = (period) => parseInt(period.split("-")[1].split(" ")[1]);
        return getYear(a.period) - getYear(b.period);
      });
    }

    if (sortBy === "date-desc") {
      filtered.sort((a, b) => {
        const getYear = (period) => parseInt(period.split("-")[1].split(" ")[1]);
        return getYear(b.period) - getYear(a.period);
      });
    }

    if (sortBy === "company") {
      filtered.sort((a, b) => a.company.localeCompare(b.company));
    }

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-[#D8CFB0] relative overflow-hidden pt-24">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#CDB77F] blur-[160px] opacity-30 top-20 -left-32 rounded-full"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] blur-[140px] opacity-20 bottom-[-150px] right-[-150px] rounded-full"></div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#9B5F3F] via-[#8B5736] to-[#6F4A2D] text-white py-12 md:py-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fadeUp">
            Professional Experience
          </h1>

          <p className="max-w-3xl text-lg opacity-90 animate-fadeUp delay-200">
            A comprehensive overview of my professional journey and career milestones across web development, app development, and data analysis. Each experience represents significant contributions and technical expertise.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10">
        {/* Filter Bar */}
        <div className="mb-8 md:mb-16">
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedType=""
            setSelectedType={() => {}}
            types={[]}
            categories={resumeCategories}
            isSingleCategory={false}
            searchPlaceholder="Search resumes..."
          />
        </div>

        {/* Sort Options */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-lg font-semibold text-[#6F4A2D]">
            Showing {filteredResumes.length} position{filteredResumes.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-[#6F4A2D]">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-[#6F4A2D] font-semibold border-2 border-[#D6C59A] focus:border-[#9B5F3F] focus:outline-none transition"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="company">Company Name</option>
            </select>
          </div>
        </div>

        {/* Resumes Grid */}
        {filteredResumes.length > 0 ? (
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {filteredResumes.map((resume, index) => (
              <div
                key={resume.id}
                className="animate-card"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <ResumeCard resume={resume} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-[#6F4A2D]/70 font-semibold">
              No positions found matching your criteria
            </p>
            <p className="text-[#6F4A2D]/50 mt-2">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 0.9s ease forwards;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .animate-card {
          animation: cardUp 0.8s ease forwards;
          opacity: 0;
        }

        @keyframes cardUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ResumePage;
