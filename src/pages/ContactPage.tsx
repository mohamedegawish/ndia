import { useState } from "react";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, MessageCircle, Send, Loader2, Check } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", role: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => { setSubmitted(true); toast.success("تم إرسال رسالتك بنجاح!"); },
    onError: () => toast.error("حدث خطأ، يرجى المحاولة مرة أخرى"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <Toaster position="top-center" />
      <main className="pt-[72px]">
        <div className="bg-[#1E3A5F] py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl font-bold text-white mb-3">تواصل معنا</h1>
            <p className="text-white/70">نحن هنا لمساعدتك</p>
          </div>
        </div>

        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: MapPin, title: "العنوان", text: "مبنى جمعية المستثمرين، المنطقة الصناعية بدمياط الجديدة" },
                { icon: Phone, title: "التليفون", text: "057-2385000" },
                { icon: Mail, title: "البريد", text: "info@damietta-industrial.gov.eg" },
                { icon: MessageCircle, title: "واتساب", text: "01555550000" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1E3A5F]/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#D4A843]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E3A5F] text-sm">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">تم الإرسال بنجاح!</h2>
                  <p className="text-gray-500">سنقوم بالرد عليك في أقرب وقت</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الاسم *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">التليفون</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]">
                        <option value="">اختر...</option>
                        <option value="inquiry">استفسار</option>
                        <option value="complaint">شكوى</option>
                        <option value="suggestion">اقتراح</option>
                        <option value="register">تسجيل مصنع</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843] resize-none" />
                  </div>
                  <button type="submit" disabled={submitMutation.isPending}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50">
                    {submitMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    إرسال
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
