import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import CategoryCard from "@/components/CategoryCard";
import { LayoutGrid } from "lucide-react";

export default function CategoriesSection() {
  const { data: categories } = trpc.category.list.useQuery();

  return (
    <section className="bg-[#1E3A5F] section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <LayoutGrid className="w-5 h-5 text-[#D4A843]" />
            <span className="text-[#D4A843] text-sm font-medium">اكتشف التنوع الصناعي</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">التصنيفات الصناعية</h2>
          <div className="w-16 h-1 bg-[#D4A843] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories?.map((cat) => (
            <CategoryCard key={cat.id} category={cat} variant="glass" />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/categories" className="btn-secondary inline-flex items-center gap-2">
            جميع التصنيفات
          </Link>
        </div>
      </div>
    </section>
  );
}
