import React from "react";
import { Search, Filter } from "lucide-react";

function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  types,
  categories = [],
  isSingleCategory = false,
  searchPlaceholder = "Search..."
}) {

  const pillStyle = (active) =>
    active
      ? "bg-[#9B5F3F] text-white shadow-lg scale-105"
      : "bg-[#D6C59A] text-[#6F4A2D] hover:bg-[#C9B88A] hover:scale-105";

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-5 md:space-y-8 animate-filterFade">

      {/* Search */}
      <div className="relative group">

        <div className="flex items-center gap-3 bg-white border-2 border-[#D6C59A] px-5 py-4 rounded-xl transition-all duration-300 group-focus-within:border-[#9B5F3F] group-focus-within:shadow-md group-focus-within:bg-white">

          <Search
            size={20}
            className="text-[#6F4A2D] opacity-70 group-focus-within:opacity-100 transition"
          />

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent outline-none text-[#6F4A2D] placeholder-[#6F4A2D]/60 text-sm"
          />

        </div>

      </div>

      {/* Category */}
      {!isSingleCategory && categories.length > 0 && (
        <div className="space-y-4">

          <p className="flex items-center gap-2 text-sm font-semibold text-[#6F4A2D]">
            <Filter size={16} />
            Category
          </p>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => setSelectedCategory("")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${pillStyle(selectedCategory === "")}`}
            >
              ALL
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${pillStyle(selectedCategory === cat.id)}`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}

          </div>

        </div>
      )}

      {/* Type */}
      <div className="space-y-4">

        <p className="flex items-center gap-2 text-sm font-semibold text-[#6F4A2D]">
          <Filter size={16} />
          Type
        </p>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => setSelectedType("")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${pillStyle(selectedType === "")}`}
          >
            ALL
          </button>

          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${pillStyle(selectedType === type)}`}
            >
              {type.toUpperCase()}
            </button>
          ))}

        </div>

      </div>

      {/* Animation */}
      <style jsx>{`

        .animate-filterFade {
          animation: filterFade 0.8s ease forwards;
        }

        @keyframes filterFade {
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

export default FilterBar;