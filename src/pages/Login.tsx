import { useState } from "react";
import { Link, Navigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { Factory, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login, isLoggedIn, user } = useAuth();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      login(data.token);
      toast.success("تم تسجيل الدخول بنجاح!");
    },
    onError: (err) => toast.error(err.message === "INVALID_CREDENTIALS" ? "بيانات الدخول غير صحيحة" : "حدث خطأ"),
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
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#1E3A5F] flex items-center justify-center p-4" dir="rtl">
      <Toaster position="top-center" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src="/images/logo.png" className="w-16 h-16 object-contain" alt="Logo" />
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">تسجيل الدخول</h1>
          <p className="text-white/60 text-sm mt-1">أهلاً بك في بوابة دمياط الجديدة</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">البريد الإلكتروني</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">كلمة المرور</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-4 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843]" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loginMutation.isPending}
              className="w-full h-11 bg-[#D4A843] text-[#1E3A5F] font-bold rounded-lg hover:bg-[#C49A3A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {loginMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "دخول"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              ليس لديك حساب؟ <Link to="/register" className="text-[#D4A843] hover:underline">سجل الآن</Link>
            </p>
            <Link to="/" className="text-white/40 text-sm hover:text-white/60 mt-2 inline-block">العودة للرئيسية</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
