import { Link } from "react-router";
import { Map, Loader2 } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { lazy, Suspense } from "react";

const MapSection = lazy(() => import("./MapSection"));

export default function MapPreview() {
  const { data: factories, isLoading } = trpc.factory.list.useQuery({ limit: 50 });

  return (
    <section className="bg-[#F8F9FA] section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Map className="w-5 h-5 text-[#D4A843]" />
            <span className="text-[#D4A843] text-sm font-medium">موقعنا</span>
          </div>
          <h2 className="text-3xl font-bold text-[#1E3A5F] mb-3">خريطة المنطقة الصناعية</h2>
          <div className="w-16 h-1 bg-[#D4A843] mx-auto rounded-full" />
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100" style={{ height: 450 }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
            </div>
          ) : (
            <Suspense fallback={
              <div className="flex items-center justify-center h-full bg-gray-100">
                <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
              </div>
            }>
              <MapSection factories={factories?.items ?? []} />
            </Suspense>
          )}
        </div>

        <div className="text-center mt-8">
          <Link to="/map" className="btn-primary inline-flex items-center gap-2">
            <Map className="w-5 h-5" />
            عرض الخريطة الكاملة
          </Link>
        </div>
      </div>
    </section>
  );
}
