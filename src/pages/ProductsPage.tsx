import { useState } from "react";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Package, Search, Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState<string>("");

  const { data, isLoading } = trpc.product.list.useQuery({
    search: search || undefined,
    availability: availability as "available" | "limited" | "out_of_stock" | undefined,
    limit: 50,
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="pt-[72px]">
        <div className="bg-[#1E3A5F] py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">المنتجات</h1>
            <p className="text-white/70">اكتشف منتجات المصانع في المنطقة الصناعية</p>
          </div>
        </div>

        <div className="bg-white border-b border-gray-100 py-4">
          <div className="container-main flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text" placeholder="ابحث عن منتج..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pr-10 pl-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]"
              />
            </div>
            <div className="flex items-center gap-2">
              {[
                { key: "available", label: "متوفر", color: "emerald" },
                { key: "limited", label: "محدود", color: "amber" },
                { key: "out_of_stock", label: "غير متوفر", color: "red" },
              ].map((a) => (
                <button key={a.key} onClick={() => setAvailability(availability === a.key ? "" : a.key)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${availability === a.key ? `bg-${a.color}-500 text-white` : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container-main section-padding">
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <Package className="w-4 h-4" />
            <span>{data?.total ?? 0} منتج</span>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" /></div>
          ) : data?.items.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">لا توجد منتجات مطابقة</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {data?.items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
