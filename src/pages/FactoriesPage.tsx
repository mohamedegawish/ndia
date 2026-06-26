import { useState } from "react";
import { useSearchParams } from "react-router";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FactoryCard from "@/components/FactoryCard";
import { Factory, Search, Loader2 } from "lucide-react";

export default function FactoriesPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const categoryId = searchParams.get("category") ? parseInt(searchParams.get("category")!) : undefined;

  const { data, isLoading } = trpc.factory.list.useQuery({
    search: search || undefined,
    categoryId,
    limit: 50,
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="pt-[72px]">
        {/* Header */}
        <div className="bg-[#1E3A5F] py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">دليل المصانع</h1>
            <p className="text-white/70">تصفح جميع المصانع في المنطقة الصناعية بدمياط الجديدة</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white border-b border-gray-100 py-4">
          <div className="container-main flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن مصنع..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pr-10 pl-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container-main section-padding">
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <Factory className="w-4 h-4" />
            <span>{data?.total ?? 0} مصنع</span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
            </div>
          ) : data?.items.length === 0 ? (
            <div className="text-center py-20">
              <Factory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">لا توجد مصانع مطابقة للبحث</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.items.map((factory) => (
                <FactoryCard key={factory.id} factory={factory} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
