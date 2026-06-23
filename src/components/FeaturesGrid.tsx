import { useState } from "react";
import * as Icons from "lucide-react";
import { chotuFeatures } from "../data";

export default function FeaturesGrid() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "chat" | "utility" | "media">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeatures = chotuFeatures.filter((f) => {
    const matchesCategory = selectedCategory === "all" || f.category === selectedCategory;
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-vibrant-bg" id="features-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
         {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-extrabold text-vibrant-coral uppercase tracking-widest">
            Core Features
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
            What Can Chotu Do For You?
          </p>
          <p className="mt-4 text-slate-600 font-medium text-sm sm:text-base">
            From transcription of voice recordings to writing complex React apps, Chotu solves everyday problems inside WhatsApp. 
          </p>
        </div>

        {/* Categories Bar & Search */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-xs rounded-2xl border border-indigo-100/60 shadow-sm">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            {(["all", "chat", "utility", "media"] as const).map((cat) => (
              <button
                key={cat}
                id={`feature-cat-btn-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition capitalize cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-tr from-vibrant-coral to-vibrant-orange text-white shadow-sm"
                    : "text-slate-600 hover:text-vibrant-coral"
                }`}
              >
                {cat === "all" ? "⚡ Show All" : cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search features (e.g. math)..."
              value={searchQuery}
              id="feature-search-box"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-indigo-100 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-vibrant-coral shadow-inner"
            />
          </div>
        </div>

        {/* Features Content Grid */}
        {filteredFeatures.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((f) => {
              // Get standard Lucide Icon programmatically
              const IconComponent = (Icons as any)[f.iconName] || Icons.HelpCircle;
              return (
                <div
                  key={f.id}
                  id={`feature-card-${f.id}`}
                  className="group p-8 rounded-3xl bg-white border border-indigo-100/50 hover:border-vibrant-coral hover:shadow-lg shadow-xs transition duration-350 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4E5ACD] flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-vibrant-coral group-hover:to-vibrant-orange group-hover:text-white transition duration-350 shadow-xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      {f.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#FF6B6B]/10 text-[#FF6B6B] uppercase tracking-wider">
                          {f.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-6 text-lg font-extrabold text-slate-800 group-hover:text-vibrant-coral transition">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                      {f.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 capitalize font-mono">
                      Category: <span className="text-[#4E5ACD] font-extrabold">{f.category}</span>
                    </span>
                    <a
                      href="https://wa.me/something_place_holder_chotu?text=Hi+Chotu+help+me+with+something"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#4E5ACD] hover:text-vibrant-coral flex items-center gap-1 cursor-pointer transition"
                    >
                      <span>Try Now</span>
                      <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition duration-200" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Icons.SearchX className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="mt-4 text-slate-500 text-sm font-semibold">
              No matching Chotu features found for "{searchQuery}". Try searching for something else!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
