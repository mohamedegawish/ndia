import { Link } from "react-router";
import { ChevronDown, Factory, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="المنطقة الصناعية بدمياط الجديدة"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2035]/90 via-[#1E3A5F]/80 to-[#1E3A5F]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-8 animate-fade-in">
          <Factory className="w-4 h-4 text-[#D4A843]" />
          <span className="text-white/90 text-sm font-medium">جمعية المستثمرين بدمياط الجديدة</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-shadow mb-6 leading-tight animate-fade-in-up">
          بوابة دمياط الجديدة
          <span className="block text-[#D4A843]">الصناعية</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          أكبر دليل صناعي متكامل في المنطقة الصناعية بدمياط الجديدة. اكتشف المصانع، المنتجات، والفرص الاستثمارية.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <Link to="/factories" className="btn-primary flex items-center gap-2 text-base">
            <Factory className="w-5 h-5" />
            استعرض المصانع
          </Link>
          <Link to="/products" className="btn-secondary flex items-center gap-2">
            <Search className="w-5 h-5" />
            تصفح المنتجات
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "600ms" }}>
          {[
            { value: "150+", label: "مصنع" },
            { value: "50K+", label: "عامل" },
            { value: "25", label: "دولة تصدير" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#D4A843]">{stat.value}</div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  );
}
