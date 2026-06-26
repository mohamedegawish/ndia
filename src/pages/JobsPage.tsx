import { useState } from "react";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Loader2, Clock, DollarSign, Loader } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";

export default function JobsPage() {
  const { data: jobsData, isLoading } = trpc.jobs.list.useQuery();
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [form, setForm] = useState({ applicantName: "", applicantEmail: "", applicantPhone: "", message: "" });

  const applyMutation = trpc.jobs.applyJob.useMutation({
    onSuccess: () => { toast.success("تم تقديم طلبك بنجاح!"); setSelectedJob(null); },
    onError: () => toast.error("حدث خطأ، يرجى المحاولة مرة أخرى"),
  });

  const selectedJobData = jobsData?.items.find((j: any) => j.id === selectedJob);

  const typeLabel = (t: string) => ({ full_time: "دوام كامل", part_time: "دوام جزئي", contract: "عقد", internship: "تدريب" }[t] ?? t);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <Toaster position="top-center" />
      <main className="pt-[72px]">
        <div className="bg-[#1E3A5F] py-12">
          <div className="container-main text-center">
            <h1 className="text-3xl font-bold text-white mb-3">الوظائف الشاغرة</h1>
            <p className="text-white/70">فرص عمل في المصانع</p>
          </div>
        </div>

        <div className="container-main section-padding">
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" /></div>
          ) : jobsData?.items.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد وظائف متاحة حالياً</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {jobsData?.items.map((job: any) => (
                <div key={job.id} className="bg-white rounded-xl border border-gray-100 p-6 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">{job.title}</h3>
                      <p className="text-sm text-[#D4A843] mb-2">{job.factory?.nameAr}</p>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-3">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {typeLabel(job.type)}</span>
                        {job.salary && <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>}
                      </div>
                    </div>
                    <button onClick={() => setSelectedJob(job.id)} className="btn-primary text-sm py-2 px-5 shrink-0">
                      تقديم الآن
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Application Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">التقديم على: {selectedJobData?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); applyMutation.mutate({ ...form, jobId: selectedJob! }); }}
            className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم *</label>
              <input required value={form.applicantName} onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input type="email" value={form.applicantEmail} onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">التليفون</label>
              <input value={form.applicantPhone} onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رسالة</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A843] resize-none" />
            </div>
            <button type="submit" disabled={applyMutation.isPending} className="w-full btn-primary flex items-center justify-center gap-2">
              {applyMutation.isPending ? <Loader className="w-4 h-4 animate-spin" /> : "إرسال الطلب"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
