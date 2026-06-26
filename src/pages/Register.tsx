import { useState } from "react";
import { Link, Navigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { Factory, Eye, EyeOff, Loader2, User, Building2, Package, Globe, Shield } from "lucide-react";
import { toast, Toaster } from "sonner";

const roles = [
  { key: "user", label: "مستخدم عادي", icon: User, desc: "تصفح وبحث" },
  { key: "factory", label: "مصنع", icon: Building2, desc: "إدراج مصنع ومنتجات" },
  { key: "supplier", label: "مورد", icon: Package, desc: "عرض خامات وخدمات" },
  { key: "importer", label: "مستورد", icon: Globe, desc: "طلب عروض أسعار" },
  { key: "authority", label: "رئيس الجمعية", icon: Shield, desc: "إدارة المنصة والمصانع" },
];

export default function Register() {
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login, isLoggedIn, user } = useAuth();

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => { login(data.token); toast.success("تم إنشاء الحساب بنجاح!"); },
    onError: () => toast.error("حدث خطأ، ربما البريد مستخدم بالفعل"),
  });

  if (isLoggedIn) {
    if (user?.role === "admin" || user?.role === "authority") {
      return <Navigate to="/admin" replace />;
    } else if (user?.role === "factory") {
      return <Navigate to="/factory-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ name, email, password, role: role as "user" | "factory" | "supplier" | "importer" | "authority", companyName: companyName || undefined });
  };

  return (
    <div className="min-h-screen bg-[#1E3A5F] flex items-center justify-center p-4" dir="rtl">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src="/images/logo.png" className="w-16 h-16 object-contain" alt="Logo" />
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">إنشاء حساب</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          {step === "role" ? (
            <div>
              <h2 className="text-lg font-semibold text-white mb-6 text-center">اختر نوع الحساب</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {roles.map((r, idx) => (
                  <button key={r.key} onClick={() => { setRole(r.key); setStep("form"); }}
                    className={`p-4 rounded-xl border text-center transition-all ${role === r.key ? "border-[#D4A843] bg-[#D4A843]/10" : "border-white/20 hover:border-white/40"} ${idx === roles.length - 1 ? "col-span-2" : ""}`}>
                    <r.icon className={`w-8 h-8 mx-auto mb-2 ${role === r.key ? "text-[#D4A843]" : "text-white/60"}`} />
                    <div className="text-white font-medium text-sm">{r.label}</div>
                    <div className="text-white/50 text-xs mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <button type="button" onClick={() => setStep("role")} className="text-[#D4A843] text-sm hover:underline mb-2">
                تغيير: {roles.find((r) => r.key === role)?.label}
              </button>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">الاسم *</label>
                <input required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">البريد الإلكتروني *</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">كلمة المرور *</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 px-4 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843]" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {(role === "factory" || role === "supplier") && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">اسم الشركة</label>
                  <input value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full h-10 px-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843]" />
                </div>
              )}
              <button type="submit" disabled={registerMutation.isPending}
                className="w-full h-10 bg-[#D4A843] text-[#1E3A5F] font-bold rounded-lg hover:bg-[#C49A3A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {registerMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "إنشاء حساب"}
              </button>
              <p className="text-center text-white/60 text-sm">
                لديك حساب؟ <Link to="/login" className="text-[#D4A843] hover:underline">تسجيل الدخول</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
