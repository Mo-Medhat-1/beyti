 import { useEffect, useState } from "react";
 import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react";
 import { ChefLayout } from "@/components/chef/ChefLayout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 
 export default function ChefEarnings() {
   const { user } = useAuth();
   const [orders, setOrders] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     if (user) fetchOrders();
   }, [user]);
 
   const fetchOrders = async () => {
     setLoading(true);
     const { data } = await supabase
       .from("orders")
       .select("*")
       .eq("chef_id", user!.id)
       .eq("status", "completed")
       .order("completed_at", { ascending: false });
     
     setOrders(data || []);
     setLoading(false);
   };
 
   const today = new Date().toISOString().split("T")[0];
   const thisWeekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
   const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
 
   const todayOrders = orders.filter((o) => o.completed_at?.startsWith(today));
   const weekOrders = orders.filter((o) => o.completed_at >= thisWeekStart);
   const monthOrders = orders.filter((o) => o.completed_at >= thisMonthStart);
 
   const calcTotal = (ordersList: any[]) => 
     ordersList.reduce((sum, o) => sum + Number(o.total), 0);
 
   const todayEarnings = calcTotal(todayOrders);
   const weekEarnings = calcTotal(weekOrders);
   const monthEarnings = calcTotal(monthOrders);
   const totalEarnings = calcTotal(orders);
 
   // Platform fee placeholder (0% for MVP)
   const platformFeePercent = 0;
   const netEarnings = (amount: number) => amount * (1 - platformFeePercent / 100);
 
   if (loading) {
     return (
       <ChefLayout>
         <div className="space-y-6">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
             ))}
           </div>
         </div>
       </ChefLayout>
     );
   }
 
   return (
     <ChefLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold">الأرباح</h1>
           <Button variant="outline" size="sm">
             <Download className="h-4 w-4 ml-2" />
             تصدير التقرير
           </Button>
         </div>
 
         {/* Stats Grid */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                   <DollarSign className="h-5 w-5 text-secondary" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">{todayEarnings.toFixed(0)}</p>
                   <p className="text-xs text-muted-foreground">أرباح اليوم (ج.م)</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                   <TrendingUp className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">{weekEarnings.toFixed(0)}</p>
                   <p className="text-xs text-muted-foreground">هذا الأسبوع (ج.م)</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                   <Calendar className="h-5 w-5 text-accent" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">{monthEarnings.toFixed(0)}</p>
                   <p className="text-xs text-muted-foreground">هذا الشهر (ج.م)</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                   <DollarSign className="h-5 w-5 text-secondary" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">{totalEarnings.toFixed(0)}</p>
                   <p className="text-xs text-muted-foreground">الإجمالي (ج.م)</p>
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Transactions List */}
         <Card>
           <CardHeader>
             <CardTitle>سجل المعاملات</CardTitle>
           </CardHeader>
           <CardContent>
             {orders.length === 0 ? (
               <div className="text-center py-8">
                 <p className="text-muted-foreground">لا توجد معاملات بعد</p>
               </div>
             ) : (
               <div className="space-y-3">
                 {orders.slice(0, 20).map((order) => (
                   <div
                     key={order.id}
                     className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                   >
                     <div>
                       <p className="font-medium">طلب #{order.id.slice(0, 8)}</p>
                       <p className="text-sm text-muted-foreground">
                         {new Date(order.completed_at).toLocaleDateString("ar-EG", {
                           day: "numeric",
                           month: "short",
                           hour: "2-digit",
                           minute: "2-digit"
                         })}
                       </p>
                     </div>
                     <div className="text-left">
                       <p className="font-bold text-secondary">+{order.total} ج.م</p>
                       {platformFeePercent > 0 && (
                         <p className="text-xs text-muted-foreground">
                           صافي: {netEarnings(order.total).toFixed(2)} ج.م
                         </p>
                       )}
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </CardContent>
         </Card>
       </div>
     </ChefLayout>
   );
 }