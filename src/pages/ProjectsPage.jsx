import React, { useState, useMemo } from "react";
import { projectsData, projectCategories } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import FilterBar from "../components/FilterBar";

function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const categoryObj = projectCategories.find((c) => c.id === "web-development");

  const filteredProjects = useMemo(() => {
    let filtered = projectsData.filter((project) => {
      const projectCategory = project.category.toLowerCase().replace(/\s+/g, "-");

      const matchCategory = !selectedCategory || projectCategory === selectedCategory;

      const matchSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
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
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-[#D8CFB0] relative overflow-hidden pt-24">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#CDB77F] blur-[160px] opacity-30 top-20 -left-32 rounded-full"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#9B5F3F] blur-[140px] opacity-20 bottom-[-150px] right-[-150px] rounded-full"></div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#9B5F3F] via-[#8B5736] to-[#6F4A2D] text-white py-12 md:py-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">

          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 animate-fadeUp">
            My Projects
          </h1>

          <p className="max-w-3xl text-lg opacity-90 animate-fadeUp delay-200">
            A showcase of my work across web development, app development, and data analysis. Each project demonstrates professional expertise and modern development practices.
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
            categories={projectCategories}
            isSingleCategory={false}
            searchPlaceholder="Search projects..."
          />
        </div>

        {/* Results Count */}
        <div className="mb-8 text-[#6F4A2D]">
          <p className="text-lg font-semibold">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                visible={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-[#6F4A2D]">
              No projects found matching your criteria.
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

export default ProjectsPage;
