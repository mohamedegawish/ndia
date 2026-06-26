import { useParams, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, ArrowLeft, Factory } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id ?? "0");
  const { data: product, isLoading } = trpc.product.getById.useQuery({ id: productId });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      <p>المنتج غير موجود</p>
    </div>
  );

  const statusKey = (product.availability ?? "available") as "available" | "limited" | "out_of_stock";
  const statusConfig = {
    available: { class: "bg-emerald-500", label: "متوفر" },
    limited: { class: "bg-amber-500", label: "محدود" },
    out_of_stock: { class: "bg-red-500", label: "غير متوفر" },
  }[statusKey];

  const specs = product.specifications ? JSON.parse(product.specifications) : {};

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="pt-[72px]">
        <div className="container-main py-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E3A5F] mb-6">
            <ArrowLeft className="w-4 h-4" /> العودة للمنتجات
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-50">
                <img src={product.mainImage || "/images/product-1.jpg"} alt={product.nameAr} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${statusConfig.class} text-white px-3 py-1 rounded-full text-xs font-bold`}>{statusConfig.label}</span>
                  {product.category && <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.category.nameAr}</span>}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-3">{product.nameAr}</h1>
                {product.factory && (
                  <Link to={`/factories/${product.factory.id}`} className="inline-flex items-center gap-2 text-sm text-[#D4A843] hover:underline">
                    <Factory className="w-4 h-4" /> {product.factory.nameAr}
                  </Link>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.descriptionAr || "لا يوجد وصف"}</p>

              {product.price && (
                <div className="bg-[#F8F9FA] rounded-lg p-4">
                  <span className="text-3xl font-bold text-[#D4A843]">{product.price}</span>
                  <span className="text-gray-400 mr-2">{product.currency}</span>
                </div>
              )}

              {/* Specifications */}
              {Object.keys(specs).length > 0 && (
                <div>
                  <h3 className="font-bold text-[#1E3A5F] mb-3">المواصفات</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(specs).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-100">
                          <td className="py-2 text-gray-500 font-medium w-1/3">{key}</td>
                          <td className="py-2 text-gray-700">{String(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
