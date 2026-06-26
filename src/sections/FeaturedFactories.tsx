import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import FactoryCard from "@/components/FactoryCard";
import { Factory, Loader2 } from "lucide-react";

export default function FeaturedFactories() {
  const { data: factories, isLoading } = trpc.factory.featured.useQuery();

  return (
    <section className="bg-[#F8F9FA] section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Factory className="w-5 h-5 text-[#D4A843]" />
            <span className="text-[#D4A843] text-sm font-medium">مختارة بعناية</span>
          </div>
          <h2 className="text-3xl font-bold text-[#1E3A5F] mb-3">مصانع مميزة</h2>
          <div className="w-16 h-1 bg-[#D4A843] mx-auto rounded-full" />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factories?.map((factory) => (
              <FactoryCard key={factory.id} factory={factory} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/factories" className="inline-flex items-center gap-2 border-2 border-[#1E3A5F] text-[#1E3A5F] font-semibold px-8 py-3 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-all">
            عرض جميع المصانع
          </Link>
        </div>
      </div>
    </section>
  );
}
