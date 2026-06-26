import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { Loader2 } from "lucide-react";

export default function CategoriesPage() {
  const { data: categories, isLoading } = trpc.category.list.useQuery();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="pt-[72px]">
        <div className="bg-[#1E3A5F] py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">التصنيفات الصناعية</h1>
            <p className="text-white/70">تصفح المصانع والمنتجات حسب التصنيف</p>
          </div>
        </div>

        <div className="container-main section-padding">
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" /></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {categories?.map((cat) => <CategoryCard key={cat.id} category={cat} variant="light" />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
