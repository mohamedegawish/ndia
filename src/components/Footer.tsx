import { Link } from "react-router";
import { Factory, MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F2035] text-white/70">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/images/logo.png" className="w-10 h-10 object-contain" alt="Logo" />
              <span className="text-white font-bold text-lg">بوابة دمياط الجديدة</span>
            </Link>
            <p className="text-sm leading-relaxed">
              أكبر دليل صناعي متكامل في المنطقة الصناعية بدمياط الجديدة. نربط المصانع بالمستثمرين والموردين.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#D4A843] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#D4A843] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#D4A843] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#D4A843] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {[
                { path: "/", label: "الرئيسية" },
                { path: "/factories", label: "المصانع" },
                { path: "/products", label: "المنتجات" },
                { path: "/categories", label: "التصنيفات" },
                { path: "/map", label: "الخريطة" },
                { path: "/jobs", label: "الوظائف" },
                { path: "/exhibition", label: "معرض دمياط الجديدة" },
                { path: "/about", label: "من نحن" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-[#D4A843] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">معلومات التواصل</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A843] mt-0.5 shrink-0" />
                <span className="text-sm">مبنى جمعية المستثمرين، المنطقة الصناعية بدمياط الجديدة</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A843] shrink-0" />
                <span className="text-sm">057-2385000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A843] shrink-0" />
                <span className="text-sm">info@damietta-industrial.gov.eg</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#D4A843] shrink-0" />
                <span className="text-sm">01555550000</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">النشرة البريدية</h4>
            <p className="text-sm mb-3">اشترك ليصلك آخر الأخبار والتحديثات</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 h-10 px-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A843]"
              />
              <button type="submit" className="h-10 px-4 bg-[#D4A843] text-[#1E3A5F] font-semibold rounded-lg text-sm hover:bg-[#C49A3A] transition-colors">
                اشترك
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/50">
            &copy; 2024 بوابة دمياط الجديدة الصناعية. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-white/50">
            تم التطوير بواسطة جمعية المستثمرين بدمياط الجديدة
          </p>
        </div>
      </div>
    </footer>
  );
}
