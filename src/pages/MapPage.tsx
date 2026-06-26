import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";

const MapSection = lazy(() => import("@/sections/MapSection"));

export default function MapPage() {
  const { data: factories, isLoading } = trpc.factory.list.useQuery({ limit: 100 });

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-[72px] relative">
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
            <MapSection factories={factories?.items ?? []} height="100%" />
          </Suspense>
        )}
      </div>
    </div>
  );
}
