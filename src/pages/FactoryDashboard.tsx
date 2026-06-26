import { useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import {
  Factory, Package, Briefcase, Plus, Loader2, BarChart3,
  MapPin, Phone, Mail, Globe, Edit2, Check, X
} from "lucide-react";
import { toast } from "sonner";

export default function FactoryDashboard() {
  const { user, isLoggedIn, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Form state for factory creation
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [creating, setCreating] = useState(false);

  const utils = trpc.useUtils();
  const { data: categories } = trpc.category.list.useQuery();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const createFactoryMutation = trpc.factory.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة المصنع بنجاح!");
      setCreating(false);
      utils.factory.myFactory.invalidate();
    },
    onError: (e) => toast.error(e.message || "حدث خطأ أثناء إضافة المصنع"),
  });

  const { data: myFactory, isLoading: factoryLoading } = trpc.factory.myFactory.useQuery(undefined, {
    enabled: isLoggedIn && user?.role === "factory",
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
    </div>
  );

  if (!isLoggedIn || user?.role !== "factory") return <Navigate to="/" />;

  const handleCreateFactory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) { toast.error("يرجى اختيار التصنيف"); return; }
    createFactoryMutation.mutate({
      nameAr, nameEn, descriptionAr: descAr,
      phone, email, address, website,
      categoryId,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />
      <main className="pt-[72px]">
        <div className="container-main py-8">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
              <Factory className="w-5 h-5 text-[#D4A843]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1E3A5F]">لوحة تحكم المصنع</h1>
              <p className="text-gray-500 text-sm">مرحباً {user?.name}</p>
            </div>
          </div>

          {factoryLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" />
            </div>
          ) : !myFactory ? (
            /* ── No Factory Yet → Create Form ── */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#D4A843]/10 flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-[#D4A843]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">أضف مصنعك</h2>
                  <p className="text-gray-500 text-sm">لم تقم بإضافة مصنعك بعد. أضفه الآن ليظهر على المنصة</p>
                </div>

                <form onSubmit={handleCreateFactory} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">اسم المصنع (عربي) *</label>
                      <input required value={nameAr} onChange={e => setNameAr(e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">اسم المصنع (إنجليزي)</label>
                      <input value={nameEn} onChange={e => setNameEn(e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف *</label>
                    <select required value={categoryId ?? ""} onChange={e => setCategoryId(Number(e.target.value))}
                      className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843] bg-white">
                      <option value="">اختر تصنيف المصنع</option>
                      {categories?.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.nameAr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">وصف المصنع</label>
                    <textarea value={descAr} onChange={e => setDescAr(e.target.value)} rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843] resize-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                      <input value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                    <input value={address} onChange={e => setAddress(e.target.value)}
                      placeholder="المنطقة الصناعية، دمياط الجديدة"
                      className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الموقع الإلكتروني</label>
                    <input type="url" value={website} onChange={e => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                  </div>

                  <button type="submit" disabled={createFactoryMutation.isPending}
                    className="w-full h-11 bg-[#D4A843] text-[#1E3A5F] font-bold rounded-lg hover:bg-[#C49A3A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                    {createFactoryMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> إضافة المصنع</>}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* ── Factory Exists → Dashboard ── */
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "المنتجات", value: (myFactory as any).products?.length ?? 0, icon: Package, color: "bg-blue-500" },
                  { label: "الوظائف", value: (myFactory as any).jobListings?.length ?? 0, icon: Briefcase, color: "bg-emerald-500" },
                  { label: "المشاهدات", value: (myFactory as any).viewCount ?? 0, icon: BarChart3, color: "bg-purple-500" },
                  { label: "التقييم", value: (myFactory as any).rating?.toFixed(1) ?? "—", icon: Check, color: "bg-amber-500" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                      <s.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-[#1E3A5F]">{s.value}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Factory Card */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#1E3A5F]">{(myFactory as any).nameAr}</h2>
                    <p className="text-gray-400 text-sm">{(myFactory as any).category?.nameAr}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    (myFactory as any).membershipTier === "gold" ? "bg-amber-100 text-amber-700" :
                    (myFactory as any).membershipTier === "silver" ? "bg-gray-100 text-gray-600" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {(myFactory as any).membershipTier === "gold" ? "ذهبي" :
                     (myFactory as any).membershipTier === "silver" ? "فضي" : "برونزي"}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-4">{(myFactory as any).descriptionAr}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  {(myFactory as any).phone && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Phone className="w-4 h-4" /> {(myFactory as any).phone}
                    </div>
                  )}
                  {(myFactory as any).email && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Mail className="w-4 h-4" /> {(myFactory as any).email}
                    </div>
                  )}
                  {(myFactory as any).address && (
                    <div className="flex items-center gap-2 text-gray-500 col-span-2">
                      <MapPin className="w-4 h-4" /> {(myFactory as any).address}
                    </div>
                  )}
                  {(myFactory as any).website && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Globe className="w-4 h-4" />
                      <a href={(myFactory as any).website} target="_blank" rel="noreferrer" className="text-[#D4A843] hover:underline">
                        الموقع الإلكتروني
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
