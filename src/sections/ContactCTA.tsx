import { Link } from "react-router";
import { Factory, MessageCircle } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="bg-[#2A4A73] section-padding">
      <div className="container-main text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          هل تريد إدراج مصنعك؟
        </h2>
        <p className="text-lg text-white/80 mb-8 leading-relaxed">
          سجل الآن وكن جزءاً من أكبر دليل صناعي في دمياط الجديدة. وصل إلى آلاف العملاء والمستثمرين.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="btn-primary flex items-center gap-2">
            <Factory className="w-5 h-5" />
            سجل مصنعك
          </Link>
          <Link to="/contact" className="btn-secondary flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            تواصل معنا
          </Link>
        </div>
      </div>
    </section>
  );
}
