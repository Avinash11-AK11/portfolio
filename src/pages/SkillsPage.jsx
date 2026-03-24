import React, { useState, useMemo } from "react";
import { skillsData, skillCategories } from "../data/skills";
import SkillCard from "../components/SkillCard";
import FilterBar from "../components/FilterBar";

function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("proficiency-desc");

  const filteredSkills = useMemo(() => {
    let filtered = skillsData.filter((skill) => {
      const skillCategory = skill.category.toLowerCase().replace(/\s+/g, "-");

      const matchCategory = !selectedCategory || skillCategory === selectedCategory;

      const matchLevel = !selectedLevel || skill.level.toLowerCase() === selectedLevel.toLowerCase();

      const matchSearch =
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchLevel && matchSearch;
    });

    if (sortBy === "proficiency-desc") {
      filtered.sort((a, b) => b.proficiency - a.proficiency);
    }

    if (sortBy === "proficiency-asc") {
      filtered.sort((a, b) => a.proficiency - b.proficiency);
    }

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, searchTerm, selectedLevel, sortBy]);

  const levels = [
    ...new Set(skillsData.map((skill) => skill.level)),
  ];

  return (
    <div className="min-h-screen bg-[#D8CFB0] relative overflow-hidden pt-24">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#CDB77F] blur-[160px] opacity-30 top-20 -left-32 rounded-full"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] blur-[140px] opacity-20 bottom-[-150px] right-[-150px] rounded-full"></div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#9B5F3F] via-[#8B5736] to-[#6F4A2D] text-white py-12 md:py-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">

          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 animate-fadeUp">
            Technical Skills
          </h1>

          <p className="max-w-3xl text-lg opacity-90 animate-fadeUp delay-200">
            A comprehensive collection of my technical skills and expertise across web development, app development, data analysis, and modern tools. Each skill is rated based on practical experience and proficiency level.
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
            selectedType={selectedLevel}
            setSelectedType={setSelectedLevel}
            types={levels}
            categories={skillCategories}
            isSingleCategory={false}
            searchPlaceholder="Search skills..."
          />
        </div>

        {/* Results Count */}
        <div className="mb-8 text-[#6F4A2D]">
          <p className="text-lg font-semibold">
            Showing {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-[#6F4A2D]">
              No skills found matching your criteria.
            </p>
          </div>
        )}

      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeUp {
          animation: fadeUp 0.9s ease forwards;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

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

export default SkillsPage;
