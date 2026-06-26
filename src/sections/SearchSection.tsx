import { useState } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";

const quickTags = ["أثاث", "أخشاب", "منسوجات", "معادن", "بلاستيك", "إلكترونيات", "مواد بناء"];

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="bg-[#1E3A5F] py-12 -mt-1">
      <div className="container-main">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن مصانع، منتجات، تصنيفات..."
              className="w-full h-14 pr-14 pl-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843]/30 text-lg"
            />
          </form>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-white/70 text-sm hover:bg-white/20 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
