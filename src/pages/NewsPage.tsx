import { useState } from "react";
import { Link, useLocation } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Calendar, MapPin, Newspaper, Plus, Edit2, Trash2, Check, 
  X, Loader2, Sparkles, AlertCircle, FileText, ChevronRight 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function NewsPage() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const utils = trpc.useUtils();

  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  // Form states
  const [titleAr, setTitleAr] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [category, setCategory] = useState<"اتفاقيات" | "فعاليات" | "قرارات" | "اخبار">("اخبار");
  const [isPublished, setIsPublished] = useState(true);

  // Queries
  const { data: newsData, isLoading } = trpc.news.list.useQuery();
  const { data: allNewsData, refetch: refetchAll } = trpc.news.listAll.useQuery(undefined, {
    enabled: isAdmin,
  });

  // Mutations
  const createMutation = trpc.news.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة الخبر بنجاح");
      resetForm();
      utils.news.list.invalidate();
      refetchAll();
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة الخبر"),
  });

  const updateMutation = trpc.news.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الخبر بنجاح");
      resetForm();
      utils.news.list.invalidate();
      refetchAll();
    },
    onError: () => toast.error("حدث خطأ أثناء تحديث الخبر"),
  });

  const deleteMutation = trpc.news.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الخبر بنجاح");
      utils.news.list.invalidate();
      refetchAll();
    },
    onError: () => toast.error("حدث خطأ أثناء حذف الخبر"),
  });

  const resetForm = () => {
    setTitleAr("");
    setContentAr("");
    setCategory("اخبار");
    setIsPublished(true);
    setSelectedNews(null);
    setIsManageModalOpen(false);
  };

  const handleEditClick = (item: any) => {
    setSelectedNews(item);
    setTitleAr(item.titleAr);
    setContentAr(item.contentAr);
    setCategory(item.category);
    setIsPublished(item.isPublished);
    setIsManageModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim() || !contentAr.trim()) {
      toast.error("يرجى ملء جميع الحقول الإلزامية");
      return;
    }

    if (selectedNews) {
      updateMutation.mutate({
        id: selectedNews.id,
        titleAr,
        contentAr,
        category,
        isPublished,
      });
    } else {
      createMutation.mutate({
        titleAr,
        contentAr,
        category,
        isPublished,
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا الخبر؟")) {
      deleteMutation.mutate({ id });
    }
  };

  // Filter items
  const itemsToShow = isAdmin ? (allNewsData?.items ?? []) : (newsData?.items ?? []);
  const filteredItems = activeCategory === "الكل" 
    ? itemsToShow 
    : itemsToShow.filter((item) => item.category === activeCategory);

  const categoriesList = ["الكل", "اتفاقيات", "فعاليات", "قرارات", "اخبار"];

  const categoryColor = (cat: string) => {
    switch (cat) {
      case "اتفاقيات": return "bg-blue-50 text-blue-700 border-blue-150";
      case "فعاليات": return "bg-amber-50 text-amber-700 border-amber-150";
      case "قرارات": return "bg-emerald-50 text-emerald-700 border-emerald-150";
      default: return "bg-gray-50 text-gray-700 border-gray-150";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]" dir="rtl">
      <Navbar />

      <main className="pt-[72px]">
        {/* Hero Section */}
        <div className="relative text-white py-24 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/about_bg.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/90 via-[#1E3A5F]/80 to-[#1E3A5F]/95" />
          <div className="container-main relative z-10 text-center max-w-4xl mx-auto px-4">
            <span className="px-3 py-1 bg-[#D4A843]/15 text-[#D4A843] rounded-full text-xs font-semibold tracking-wider uppercase mb-4 inline-block border border-[#D4A843]/20">المركز الإعلامي</span>
            <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-white leading-tight">
              آخر الأخبار والتحديثات
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              تابع أحدث الفعاليات، الشراكات الاستراتيجية، والقرارات التنظيمية الصادرة عن جمعية مستثمري دمياط الجديدة.
            </p>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="border-b border-gray-200 bg-white sticky top-[72px] z-30 shadow-sm">
          <div className="container-main px-4">
            <div className="flex gap-8">
              <Link to="/about" className={`py-4 text-sm font-semibold border-b-2 transition-all ${location.pathname === "/about" ? "border-[#D4A843] text-[#1E3A5F]" : "border-transparent text-gray-500 hover:text-gray-900"}`}>
                عن الجمعية
              </Link>
              <Link to="/about/news" className={`py-4 text-sm font-semibold border-b-2 transition-all ${location.pathname === "/about/news" ? "border-[#D4A843] text-[#1E3A5F]" : "border-transparent text-gray-500 hover:text-gray-900"}`}>
                آخر الأخبار والتحديثات
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-main py-12 px-4">
          {/* Header Action / Filter bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    activeCategory === cat
                      ? "bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat === "اخبار" ? "أخبار عامة" : cat}
                </button>
              ))}
            </div>

            {/* Admin action button */}
            {isAdmin && (
              <button
                onClick={() => {
                  resetForm();
                  setIsManageModalOpen(true);
                }}
                className="btn-primary flex items-center gap-2 self-start sm:self-auto text-xs font-semibold py-2.5 px-4 shadow-md bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" /> إضافة خبر جديد
              </button>
            )}
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#D4A843]" />
              <p className="text-gray-500 text-sm">جاري تحميل الأخبار والتحديثات...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm max-w-xl mx-auto">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">لا توجد أخبار حالياً</h3>
              <p className="text-gray-500 text-sm">لم يتم نشر أي تحديثات ضمن هذا التصنيف بعد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative ${
                    !item.isPublished ? "border-dashed border-amber-300 bg-amber-50/10" : ""
                  }`}
                >
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${categoryColor(item.category)}`}>
                        {item.category === "اخبار" ? "أخبار عامة" : item.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }) : ""}
                        </span>
                      </div>
                    </div>

                    {/* Title & content */}
                    <h3 className="text-lg font-bold text-[#1E3A5F] mb-3 leading-snug">
                      {item.titleAr}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-6">
                      {item.contentAr}
                    </p>
                  </div>

                  {/* Actions footer for Admin */}
                  {isAdmin && (
                    <div className="border-t border-gray-100 pt-4 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {!item.isPublished && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <AlertCircle className="w-3 h-3" /> مسودة غير منشورة
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="تعديل"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Admin Add/Edit Modal */}
      <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
        <DialogContent className="max-w-xl bg-white p-6 rounded-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#1E3A5F] text-right">
              {selectedNews ? "تعديل الخبر الحالي" : "إضافة خبر جديد للجمعية"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-5 mt-4 text-right">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">عنوان الخبر *</label>
              <input
                type="text"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="أدخل عنواناً جذاباً ومختصراً للخبر"
                className="w-full h-11 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">التصنيف *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-11 px-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#D4A843] transition-colors"
                >
                  <option value="اخبار">أخبار عامة</option>
                  <option value="اتفاقيات">اتفاقيات وشراكات</option>
                  <option value="فعاليات">فعاليات وزيارات</option>
                  <option value="قرارات">قرارات وبيانات</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">حالة النشر</label>
                <div className="flex items-center gap-2 h-11">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 text-[#D4A843] border-gray-300 rounded focus:ring-[#D4A843]"
                  />
                  <label htmlFor="isPublished" className="text-sm text-gray-600 font-medium cursor-pointer">
                    نشر الخبر فوراً للمستخدمين
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">محتوى وتفاصيل الخبر *</label>
              <textarea
                value={contentAr}
                onChange={(e) => setContentAr(e.target.value)}
                placeholder="أكتب تفاصيل الخبر ومحتواه الكامل هنا..."
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D4A843] transition-colors resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={createMutation.isLoading || updateMutation.isLoading}
                className="px-6 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white text-xs font-semibold transition-colors flex items-center gap-2"
              >
                {(createMutation.isLoading || updateMutation.isLoading) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>حفظ الخبر</span>
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
