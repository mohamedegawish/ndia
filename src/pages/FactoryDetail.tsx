import { useParams } from "react-router";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { MapPin, Phone, Mail, Globe, Star, Loader2, MessageCircle, Package } from "lucide-react";
import { useState, lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MapSection = lazy(() => import("@/sections/MapSection"));

export default function FactoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const factoryId = parseInt(id ?? "0");
  const { data: factory, isLoading } = trpc.factory.getById.useQuery({ id: factoryId });
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
    </div>
  );

  if (!factory) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      <p>المصنع غير موجود</p>
    </div>
  );

  const tierMap: Record<string, { class: string; label: string }> = {
    gold: { class: "gold-badge", label: "ذهبي" },
    silver: { class: "silver-badge", label: "فضي" },
    bronze: { class: "bronze-badge", label: "برونزي" },
  };
  const tierConfig = tierMap[factory.membershipTier ?? "bronze"] ?? tierMap.bronze;

  const galleryImages = [factory.coverImage, ...(factory.images?.map((i) => i.imageUrl) ?? [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero */}
        <div className="relative h-72 sm:h-80">
          <img src={factory.coverImage || "/images/hero.jpg"} alt={factory.nameAr} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2035] via-[#0F2035]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-main pb-6">
            <div className="flex items-end gap-4 sm:gap-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden shrink-0">
                <img src={(factory.logo || factory.coverImage || "/images/hero.jpg") ?? undefined} alt={factory.nameAr} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{factory.nameAr}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={tierConfig.class}>{tierConfig.label}</span>
                  {factory.category && <span className="text-white/80 text-sm bg-white/10 px-3 py-1 rounded-full">{factory.category.nameAr}</span>}
                  <span className="flex items-center gap-1 text-amber-400 text-sm">
                    <Star className="w-4 h-4 fill-amber-400" /> {factory.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-main py-8">
          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            {factory.phone && <a href={`tel:${factory.phone}`} className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-emerald-600 transition-colors"><Phone className="w-4 h-4" /> اتصال</a>}
            {factory.whatsapp && <a href={`https://wa.me/${factory.whatsapp}`} target="_blank" rel="noopener" className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-green-600 transition-colors"><MessageCircle className="w-4 h-4" /> واتساب</a>}
            {factory.email && <a href={`mailto:${factory.email}`} className="flex items-center gap-2 bg-[#1E3A5F] text-white px-5 py-2.5 rounded-lg text-sm hover:bg-[#2A4A73] transition-colors"><Mail className="w-4 h-4" /> بريد</a>}
            {factory.website && <a href={factory.website} target="_blank" rel="noopener" className="flex items-center gap-2 bg-white border border-gray-200 text-[#1E3A5F] px-5 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"><Globe className="w-4 h-4" /> موقع</a>}
          </div>

          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="bg-white border border-gray-100 p-1 rounded-xl h-auto">
              <TabsTrigger value="about" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white">نبذة</TabsTrigger>
              <TabsTrigger value="products" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white">المنتجات ({factory.products?.length ?? 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">عن المصنع</h2>
                <p className="text-gray-600 leading-relaxed">{factory.descriptionAr || "لا يوجد وصف"}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {factory.address && <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin className="w-4 h-4 text-[#D4A843]" /> {factory.address}</div>}
                  {factory.phone && <div className="flex items-center gap-2 text-sm text-gray-500"><Phone className="w-4 h-4 text-[#D4A843]" /> {factory.phone}</div>}
                  {factory.email && <div className="flex items-center gap-2 text-sm text-gray-500"><Mail className="w-4 h-4 text-[#D4A843]" /> {factory.email}</div>}
                </div>
              </div>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">معرض الصور</h2>
                  <div className="space-y-3">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img src={galleryImages[activeImage] ?? ""} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {galleryImages.map((img, i) => (
                        <button key={i} onClick={() => setActiveImage(i)} className={`w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 ${activeImage === i ? "border-[#D4A843]" : "border-transparent"}`}>
                          <img src={img ?? ""} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {factory.latitude && factory.longitude && (
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">الموقع على الخريطة</h2>
                  <div className="rounded-lg overflow-hidden border border-gray-100 mb-4" style={{ height: 300 }}>
                    <Suspense fallback={
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
                      </div>
                    }>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <MapSection 
                        factories={[factory as any]} 
                        center={[parseFloat(factory.latitude), parseFloat(factory.longitude)]} 
                        zoom={16} 
                      />
                    </Suspense>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${factory.latitude},${factory.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#1E3A5F] text-white font-medium px-5 py-3 rounded-lg hover:bg-[#2A4A73] transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    الذهاب للمصنع
                  </a>
                </div>
              )}
            </TabsContent>

            <TabsContent value="products">
              {factory.products && factory.products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {factory.products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد منتجات مسجلة</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Need MessageCircle for WhatsApp button

