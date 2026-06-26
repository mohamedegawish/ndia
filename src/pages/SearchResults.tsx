import { useSearchParams } from "react-router";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FactoryCard from "@/components/FactoryCard";
import ProductCard from "@/components/ProductCard";
import { Search, Loader2, Factory, Package } from "lucide-react";
import { useState } from "react";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [tab, setTab] = useState<"all" | "factories" | "products">("all");

  const { data, isLoading } = trpc.search.search.useQuery(
    { query },
    { enabled: query.length > 0 }
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="pt-[72px]">
        <div className="bg-[#1E3A5F] py-12">
          <div className="container-main text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              نتائج البحث عن: <span className="text-[#D4A843]">"{query}"</span>
            </h1>
          </div>
        </div>

        <div className="container-main section-padding">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-8 border-b border-gray-200">
            {[
              { key: "all" as const, label: "الكل", icon: Search },
              { key: "factories" as const, label: `المصانع (${data?.factories.length ?? 0})`, icon: Factory },
              { key: "products" as const, label: `المنتجات (${data?.products.length ?? 0})`, icon: Package },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? "border-[#D4A843] text-[#1E3A5F]" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" /></div>
          ) : (
            <>
              {(tab === "all" || tab === "factories") && data?.factories && data.factories.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">المصانع</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.factories.map((f) => <FactoryCard key={f.id} factory={f} />)}
                  </div>
                </div>
              )}
              {(tab === "all" || tab === "products") && data?.products && data.products.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">المنتجات</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {data.products.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                </div>
              )}
              {data && data.factories.length === 0 && data.products.length === 0 && (
                <div className="text-center py-20">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">لا توجد نتائج للبحث</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
