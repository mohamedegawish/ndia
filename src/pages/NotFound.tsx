import { Link } from "react-router";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1E3A5F] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl font-extrabold text-[#D4A843] mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">الصفحة غير موجودة</h1>
        <p className="text-white/60 mb-8">الصفحة التي تبحث عنها غير متوفرة</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-5 h-5" />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
