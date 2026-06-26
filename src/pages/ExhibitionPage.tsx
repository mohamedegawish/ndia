import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import ProductCard from "@/components/ProductCard";
import {
  Calendar, MapPin, Award, Users, Send,
  Loader2, CheckCircle2, Sparkles, Building, Package
} from "lucide-react";
import { toast } from "sonner";

export default function ExhibitionPage() {
  const [factoryName, setFactoryName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [boothSize, setBoothSize] = useState("9");
  const [displayProducts, setDisplayProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch products from the database to display in the expo
  const { data: productsResult, isLoading: productsLoading } = trpc.product.list.useQuery({ limit: 6 });
  const productsList = productsResult?.items ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("تم تقديم طلب حجز الجناح بنجاح! سنتواصل معك قريباً.");
    }, 1500);
  };

  const exhibitionStats = [
    { label: "مساحة المعرض الإجمالية", value: "10,000 م²", icon: Sparkles },
    { label: "عدد الأجنحة المتوفرة", value: "+120 جناح", icon: Building },
    { label: "الزوار المتوقعين سنوياً", value: "+50,000 زائر", icon: Users },
    { label: "المصانع المشاركة", value: "+80 مصنع", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]" dir="rtl">
      <Navbar />
      <main className="pt-[72px]">

        {/* Hero Section */}
        <div className="relative text-white py-24 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/exhibition_bg.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/90 via-[#1E3A5F]/80 to-[#1E3A5F]/95" />
          <div className="container-main relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
            
            {/* NDEX Exhibition Logo */}
            <div className="w-28 h-28 bg-white rounded-full p-2 mb-6 shadow-lg border-2 border-[#D4A843] flex items-center justify-center">
              <img src="/images/ndex_logo.png" className="w-full h-full object-contain" alt="NDEX Logo" />
            </div>

            <span className="px-3 py-1 bg-[#D4A843]/15 text-[#D4A843] rounded-full text-xs font-semibold mb-4 inline-block border border-[#D4A843]/20">الفعاليات الرسمية لجمعية المستثمرين</span>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              معرض دمياط الجديدة الصناعي (NDEX - ندكس)
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
              الحدث الصناعي الأكبر في المنطقة لعرض أحدث منتجات الأثاث، الرخام، والأغذية للجمهور وفتح أسواق تصديرية جديدة.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/90">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/5">
                <Calendar className="w-4 h-4 text-[#D4A843]" /> نوفمبر 2026
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/5">
                <MapPin className="w-4 h-4 text-[#D4A843]" /> أرض المعارض - دمياط الجديدة
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container-main -mt-10 relative z-20 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exhibitionStats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center text-[#D4A843] shrink-0">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#1E3A5F]">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Info & Booking */}
        <div className="container-main py-16 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              
              {/* About Expo */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">حول المعرض</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  يعد معرض دمياط الجديدة الصناعي (NDEX) المبادرة السنوية الكبرى التي ترعاها جمعية مستثمري دمياط الجديدة لتسليط الضوء على المنتجات الصناعية بالمدينة. يهدف المعرض بالدرجة الأولى إلى دعم صناع الأثاث، الرخام، والمنتجات البلاستيكية والكيماوية والغذائية، وتسهيل عقد صفقات تصديرية وتجارية كبرى.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1E3A5F] text-sm">تسويق وبيع مباشر للجمهور</strong>
                      <span className="text-xs text-gray-500">جناح لعرض وبيع المنتجات مباشرةً للجمهور المحلي.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1E3A5F] text-sm">فرص تصديرية وشراكات B2B</strong>
                      <span className="text-xs text-gray-500">دعوة مستوردين ورجال أعمال من مختلف الدول العربية والأفريقية.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Displayed Products Option */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1E3A5F] flex items-center gap-2">
                    <Package className="w-6 h-6 text-[#D4A843]" /> المنتجات المعروضة بالمعرض
                  </h2>
                  <span className="text-xs text-gray-400">آخر المعروضات المضافة</span>
                </div>

                {productsLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
                  </div>
                ) : productsList.length === 0 ? (
                  <p className="text-gray-400 text-center py-6 text-sm">لا توجد منتجات معروضة حالياً.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {productsList.map((product: any) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Booth Booking Form */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm sticky top-[92px]">
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">طلب حجز جناح بالمعرض</h3>
                <p className="text-xs text-gray-400 mb-6">مخصص لأصحاب المصانع المسجلين في الجمعية أو المنصة</p>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">تم استلام طلبك!</h4>
                    <p className="text-sm text-gray-500 mb-6">يقوم فريق تنظيم المعرض بمراجعة طلبك للتواصل معك وتأكيد الحجز.</p>
                    <button onClick={() => setSubmitted(false)} className="text-sm font-semibold text-[#D4A843] hover:underline">
                      تقديم طلب آخر
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">اسم المصنع/الشركة *</label>
                      <input required value={factoryName} onChange={e => setFactoryName(e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">اسم المفوض أو المسؤول *</label>
                      <input required value={contactName} onChange={e => setContactName(e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">رقم الهاتف للتواصل *</label>
                      <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843] text-left" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">المساحة المطلوبة للجناح *</label>
                      <select value={boothSize} onChange={e => setBoothSize(e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843] bg-white">
                        <option value="9">جناح صغير (9 م²)</option>
                        <option value="18">جناح متوسط (18 م²)</option>
                        <option value="36">جناح كبير (36 م²)</option>
                        <option value="72">جناح خاص (+72 م²)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <input type="checkbox" id="display-opt" checked={displayProducts} onChange={e => setDisplayProducts(e.target.checked)}
                        className="rounded border-gray-300 text-[#D4A843] focus:ring-[#D4A843]" />
                      <label htmlFor="display-opt" className="text-xs text-gray-600 cursor-pointer">
                        أرغب في عرض منتجات مصنعي بالمنصة الرقمية للمعرض
                      </label>
                    </div>

                    <button type="submit" disabled={submitting}
                      className="w-full h-11 bg-[#D4A843] text-[#1E3A5F] font-bold rounded-lg hover:bg-[#C49A3A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-6">
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> إرسال طلب الحجز</>}
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
