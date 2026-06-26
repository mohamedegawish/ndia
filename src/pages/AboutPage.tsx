import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router";
import {
  Shield, Users, Target, Phone, MapPin, Calendar, Award,
  Mail, MessageSquare, Briefcase, Landmark, BookOpen, GraduationCap, CheckCircle
} from "lucide-react";

export default function AboutPage() {
  const boardMembers = [
    { name: "الدكتور أسامة حفيلة", role: "رئيس مجلس الإدارة", icon: Shield },
    { name: "المحاسب أحمد أحمد جاد", role: "المدير العام لجمعية مستثمري دمياط الجديدة", icon: Users },
    { name: "المحاسب محمد يحيى قصير الديل", role: "نائب رئيس مجلس الإدارة", icon: Users },
    { name: "اللواء عز الدين فؤاد الأتربي", role: "الأمين العام للجمعية", icon: Shield },
    { name: "المحاسب سامح سمير دعدور", role: "أمين الصندوق", icon: Landmark },
    { name: "المهندس علاء الدين عبد الحليم أبو سمرة", role: "عضو مجلس إدارة", icon: Users },
    { name: "محمد محمد عبد الغفار", role: "عضو مجلس إدارة", icon: Users },
    { name: "أحمد سمير عرنسه", role: "عضو مجلس إدارة", icon: Users },
  ];

  const initiatives = [
    {
      title: "معرض إكسبو للأثاث",
      desc: "تنسق الجمعية لإطلاق معرض \"إكسبو\" متخصص لفتح أسواق تصديرية خارجية لصناع الأثاث الدمياطي.",
      icon: Award
    },
    {
      title: "التطوير والتعليم الفني",
      desc: "توقيع شراكات لتطوير مراكز التدريب ومنظومة التعليم الفني لتوفير عمالة ماهرة تلبي احتياجات المصانع.",
      icon: GraduationCap
    },
    {
      title: "الندوات والتدريب",
      desc: "تنظيم ندوات تدريبية مجانية بالتعاون مع قطاع ضرائب دمياط لرفع وعي المحاسبين والمستثمرين بالمنطقة.",
      icon: BookOpen
    },
    {
      title: "الرخصة الذهبية",
      desc: "تيسير إجراءات حصول المنشآت الصناعية الكبرى بدمياط على الرخصة الذهبية المصرية لتسريع وتيرة الاستثمار.",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]" dir="rtl">
      <Navbar />
      <main className="pt-[72px]">
        
        {/* Hero Section */}
        <div className="relative text-white py-24 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/about_bg.png')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/90 via-[#1E3A5F]/80 to-[#1E3A5F]/95" />
          <div className="container-main relative z-10 text-center max-w-4xl mx-auto px-4">
            <span className="px-3 py-1 bg-[#D4A843]/15 text-[#D4A843] rounded-full text-xs font-semibold tracking-wider uppercase mb-4 inline-block border border-[#D4A843]/20">من نحن</span>
            <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-white leading-tight">
              جمعية المستثمرين بدمياط الجديدة
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              الكيان الرئيسي الممثل لمجتمع الأعمال والصناعة في المنطقة، نعمل تحت مظلة اتحاد جمعيات المستثمرين المصريين لدعم وتنمية وتطوير البيئة الصناعية والاستثمارية.
            </p>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="border-b border-gray-200 bg-white sticky top-[72px] z-30 shadow-sm">
          <div className="container-main px-4">
            <div className="flex gap-8">
              <Link to="/about" className="py-4 text-sm font-semibold border-b-2 border-[#D4A843] text-[#1E3A5F] transition-all">
                عن الجمعية
              </Link>
              <Link to="/about/news" className="py-4 text-sm font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-900 transition-all">
                آخر الأخبار والتحديثات
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container-main py-12 px-4">
          
          {/* Main Info Box */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6 text-[#D4A843]" /> رسالة وأهداف الجمعية
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    تعتبر جمعية المستثمرين بدمياط الجديدة هي المحرك الأساسي لمجتمع الصناع والأعمال بالمنطقة الحرة والمنطقة الصناعية بميناء دمياط. وتهدف إلى:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pr-4">
                    <li><strong>دعم الصناعة المحلية:</strong> تقديم الدعم الكامل لأصحاب المصانع، وتسهيل التواصل مع جهاز تنمية مدينة دمياط الجديدة والجهات الحكومية لتذليل كافة العقبات.</li>
                    <li><strong>تغطية النطاق الجغرافي:</strong> يمتد عمل الجمعية ليشمل مدينة دمياط الجديدة، وميناء دمياط، والمنطقة الحرة العامة.</li>
                    <li><strong>الاستثمارات الصناعية:</strong> تدعم الجمعية مجمعات صناعية ضخمة تضم أكثر من <strong>680 مصنعاً</strong> تعمل في مجالات الأثاث، الرخام، الكيماويات، الأغذية، وغيرها باستثمارات تتجاوز <strong>70 مليار جنيه</strong>.</li>
                  </ul>
                </div>
              </div>

              {/* Current Initiatives */}
              <div>
                <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-[#D4A843]" /> المبادرات والمشاريع الجارية
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {initiatives.map((init, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-lg bg-[#D4A843]/10 flex items-center justify-center mb-4">
                        <init.icon className="w-5 h-5 text-[#D4A843]" />
                      </div>
                      <h3 className="font-bold text-[#1E3A5F] mb-2">{init.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{init.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Contact Info */}
            <div className="space-y-6">
              <div className="bg-[#1E3A5F] text-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-3">بيانات التواصل والمقر</h3>
                <ul className="space-y-6 text-sm text-white/90">
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-[#D4A843] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">العنوان الإداري</strong>
                      الحي الأول، المجاورة الأولى، عمارات الدلتا، عمارة (10)، شقة (1)، دمياط الجديدة.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-[#D4A843] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">مقر المنطقة الصناعية</strong>
                      طريق الصناعية، مدينة دمياط الجديدة، كفر سعد، دمياط.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Calendar className="w-5 h-5 text-[#D4A843] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">مواعيد العمل</strong>
                      من السبت إلى الخميس: 9:00 ص - 4:00 م<br />(الجمعة عطلة رسمية)
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="w-5 h-5 text-[#D4A843] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">أرقام التليفونات</strong>
                      0572407111<br />0572402366<br />
                      مقر المنطقة الصناعية: 0572074366+
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="w-5 h-5 text-[#D4A843] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">الفاكس</strong>
                      0572402366
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-full h-11 bg-white/10 text-white rounded-lg flex items-center justify-center font-semibold hover:bg-white/20 transition-colors text-sm">
                    صفحتنا على فيسبوك
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Board of Directors */}
          <div className="mt-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-3">مجلس إدارة الجمعية والهيكل الإداري</h2>
              <p className="text-gray-500 text-sm">التشكيل الرسمي لجمعية المستثمرين بدمياط الجديدة لدعم وتطوير قطاع الأعمال</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {boardMembers.map((member, idx) => (
                <div key={idx} className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-50 text-center hover:border-[#D4A843]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A5F]/5 flex items-center justify-center mx-auto mb-4">
                    <member.icon className="w-5 h-5 text-[#1E3A5F]" />
                  </div>
                  <h3 className="font-bold text-[#1E3A5F] text-base mb-1">{member.name}</h3>
                  <p className="text-gray-400 text-xs">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
}
