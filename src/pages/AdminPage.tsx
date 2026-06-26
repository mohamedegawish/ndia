import { useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import { Factory, Package, Users, MessageSquare, Briefcase, Loader2, Check, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  const { user, isLoggedIn, isAdmin, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const { data: overview } = trpc.analytics.overview.useQuery(undefined, { enabled: isAdmin });
  const { data: messagesData } = trpc.contact.list.useQuery(undefined, { enabled: isAdmin });
  const markReadMutation = trpc.contact.markRead.useMutation();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#D4A843]" /></div>;
  if (!isLoggedIn || !isAdmin) return <Navigate to="/" />;

  const statCards = [
    { label: "المصانع", value: overview?.totalFactories ?? 0, icon: Factory, color: "bg-blue-500" },
    { label: "المنتجات", value: overview?.totalProducts ?? 0, icon: Package, color: "bg-emerald-500" },
    { label: "المستخدمين", value: overview?.totalUsers ?? 0, icon: Users, color: "bg-purple-500" },
    { label: "الرسائل", value: overview?.totalMessages ?? 0, icon: MessageSquare, color: "bg-amber-500" },
    { label: "الوظائف", value: overview?.totalJobs ?? 0, icon: Briefcase, color: "bg-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-[72px]">
        <div className="container-main py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#D4A843]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1E3A5F]">لوحة التحكم</h1>
              <p className="text-gray-500 text-sm">مرحباً {user?.name}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {statCards.map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 card-hover">
                <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#1E3A5F]">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border border-gray-100 p-1 rounded-xl h-auto mb-6">
              <TabsTrigger value="dashboard" className="rounded-lg px-5 py-2.5 data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white">لوحة البيانات</TabsTrigger>
              <TabsTrigger value="messages" className="rounded-lg px-5 py-2.5 data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white">الرسائل</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#1E3A5F]/5 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-10 h-10 text-[#D4A843]" />
                </div>
                <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">لوحة البيانات</h2>
                <p className="text-gray-500 mb-6">نظرة عامة على المنصة</p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {statCards.slice(0, 4).map((s) => (
                    <div key={s.label} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xl font-bold text-[#1E3A5F]">{s.value}</div>
                      <div className="text-gray-400 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-[#1E3A5F]">رسائل التواصل</h2>
                </div>
                {!messagesData?.items.length ? (
                  <div className="p-12 text-center text-gray-400">لا توجد رسائل</div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {messagesData.items.map((msg: any) => (
                      <div key={msg.id} className={`p-5 ${msg.isRead ? "bg-white" : "bg-amber-50/50"}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-[#1E3A5F] text-sm">{msg.name}</span>
                              {!msg.isRead && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                            </div>
                            <p className="text-gray-500 text-sm mb-1">{msg.email} {msg.phone && `| ${msg.phone}`}</p>
                            <p className="text-gray-700 text-sm">{msg.message}</p>
                          </div>
                          {!msg.isRead && (
                            <button onClick={() => markReadMutation.mutate({ id: msg.id })}
                              className="shrink-0 flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700">
                              <Check className="w-3.5 h-3.5" /> تحديد كمقروء
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
