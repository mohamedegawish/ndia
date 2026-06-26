import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Factory, Search, Menu, X, LogOut, User, Shield } from "lucide-react";

const navItems = [
  { path: "/", label: "الرئيسية" },
  { path: "/factories", label: "المصانع" },
  { path: "/products", label: "المنتجات" },
  { path: "/categories", label: "التصنيفات" },
  { path: "/map", label: "الخريطة" },
  { path: "/jobs", label: "الوظائف" },
  { path: "/exhibition", label: "معرض دمياط الجديدة" },
  { path: "/about", label: "من نحن" },
  { path: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1E3A5F]/95 backdrop-blur-xl shadow-lg" : "bg-[#1E3A5F]/80 backdrop-blur-sm"
      }`}>
        <div className="container-main">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img src="/images/logo.png" className="w-10 h-10 object-contain" alt="Logo" />
              <div className="hidden sm:block">
                <span className="text-white font-bold text-base leading-tight block">بوابة دمياط الجديدة</span>
                <span className="text-[#D4A843] text-[10px] font-medium leading-tight block">المنطقة الصناعية</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-[#D4A843] bg-white/10"
                      : "text-white/80 hover:text-[#D4A843] hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-400 hover:bg-white/5 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  لوحة التحكم
                </Link>
              )}
              {isLoggedIn && user?.role === "factory" && (
                <Link to="/factory-dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-amber-400 hover:bg-white/5 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5" />
                  لوحة التحكم
                </Link>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 rounded-lg flex items-center justify-center text-white/80 hover:text-[#D4A843] hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-white/80 text-sm">{user?.name}</span>
                  <button onClick={logout} className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-white/10 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center gap-1.5 btn-primary text-sm py-2 px-5">
                  <User className="w-4 h-4" />
                  دخول
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-white/10 bg-[#1E3A5F]/95 backdrop-blur-xl">
            <form onSubmit={handleSearch} className="container-main py-3">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن مصانع، منتجات، تصنيفات..."
                  className="w-full h-12 pr-12 pl-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843]/30"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-40 transition-opacity ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-[72px] left-0 right-0 bg-[#1E3A5F] border-t border-white/10 transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "-translate-y-full"}`}>
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path) ? "text-[#D4A843] bg-white/10" : "text-white/80 hover:text-[#D4A843] hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="block px-4 py-3 rounded-lg text-sm font-medium text-emerald-400 hover:bg-white/5">
                <Shield className="w-4 h-4 inline ml-2" />
                لوحة التحكم
              </Link>
            )}
            {isLoggedIn && user?.role === "factory" && (
              <Link to="/factory-dashboard" className="block px-4 py-3 rounded-lg text-sm font-medium text-amber-400 hover:bg-white/5">
                <Factory className="w-4 h-4 inline ml-2" />
                لوحة التحكم
              </Link>
            )}
            <div className="border-t border-white/10 pt-3 mt-3">
              {isLoggedIn ? (
                <button onClick={logout} className="w-full text-right px-4 py-3 text-red-400 text-sm hover:bg-white/5 rounded-lg">
                  <LogOut className="w-4 h-4 inline ml-2" />
                  تسجيل الخروج
                </button>
              ) : (
                <Link to="/login" className="block px-4 py-3 text-[#D4A843] text-sm hover:bg-white/5 rounded-lg">
                  <User className="w-4 h-4 inline ml-2" />
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
