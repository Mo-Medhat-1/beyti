 import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import { Clock, CheckCircle, ChefHat, Package, TrendingUp, Star, ShoppingBag, DollarSign } from "lucide-react";
 import { ChefLayout } from "@/components/chef/ChefLayout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Switch } from "@/components/ui/switch";
 import { Badge } from "@/components/ui/badge";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 
 export default function ChefDashboard() {
   const { user } = useAuth();
   const { toast } = useToast();
   const [chefProfile, setChefProfile] = useState<any>(null);
   const [stats, setStats] = useState({
     todayOrders: 0,
     pendingOrders: 0,
     completedOrders: 0,
     todayEarnings: 0,
     totalEarnings: 0,
     rating: 0,
     totalReviews: 0
   });
   const [recentOrders, setRecentOrders] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     if (user) fetchDashboardData();
   }, [user]);
 
   const fetchDashboardData = async () => {
     setLoading(true);
     
     // Fetch chef profile
     const { data: profile } = await supabase
       .from("chef_profiles")
       .select("*")
       .eq("user_id", user!.id)
       .maybeSingle();
     
     setChefProfile(profile);
 
     // Fetch orders statistics
     const today = new Date().toISOString().split("T")[0];
     
     const { data: orders } = await supabase
       .from("orders")
       .select("*")
       .eq("chef_id", user!.id);
 
     const todayOrders = orders?.filter((o) => 
       o.created_at.startsWith(today)
     ) || [];
     
     const pendingOrders = orders?.filter((o) => 
       ["placed", "accepted", "cooking"].includes(o.status)
     ) || [];
     
     const completedOrders = orders?.filter((o) => o.status === "completed") || [];
     
     const todayEarnings = todayOrders
       .filter((o) => o.status === "completed")
       .reduce((sum, o) => sum + Number(o.total), 0);
     
     const totalEarnings = completedOrders.reduce((sum, o) => sum + Number(o.total), 0);
 
     setStats({
       todayOrders: todayOrders.length,
       pendingOrders: pendingOrders.length,
       completedOrders: completedOrders.length,
       todayEarnings,
       totalEarnings,
       rating: profile?.avg_rating || 0,
       totalReviews: profile?.total_reviews || 0
     });
 
     // Fetch recent orders
     const { data: recent } = await supabase
       .from("orders")
       .select(`
         *,
         profiles!orders_customer_id_fkey(full_name),
         order_items(qty, meals(title))
       `)
       .eq("chef_id", user!.id)
       .in("status", ["placed", "accepted", "cooking", "ready"])
       .order("created_at", { ascending: false })
       .limit(5);
 
     setRecentOrders(recent || []);
     setLoading(false);
   };
 
   const toggleAvailability = async () => {
     const newValue = !chefProfile?.available_now;
     
     const { error } = await supabase
       .from("chef_profiles")
       .update({ available_now: newValue })
       .eq("user_id", user!.id);
 
     if (!error) {
       setChefProfile({ ...chefProfile, available_now: newValue });
       toast({
         title: newValue ? "أنت متاح الآن" : "تم إيقاف الاستقبال"
       });
     }
   };
 
   const STATUS_LABELS: Record<string, string> = {
     placed: "جديد",
     accepted: "مقبول",
     cooking: "جاري التحضير",
     ready: "جاهز"
   };
 
   if (loading) {
     return (
       <ChefLayout>
         <div className="space-y-6">
           <div className="h-20 bg-muted animate-pulse rounded-xl" />
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
         {/* Header with Availability Toggle */}
         <Card>
           <CardContent className="p-4 flex items-center justify-between">
             <div>
               <h1 className="text-xl font-bold">مرحباً! 👋</h1>
               <p className="text-muted-foreground text-sm">إليك ملخص اليوم</p>
             </div>
             <div className="flex items-center gap-3">
               <span className="text-sm">استقبال الطلبات</span>
               <Switch
                 checked={chefProfile?.available_now || false}
                 onCheckedChange={toggleAvailability}
               />
               {chefProfile?.available_now && (
                 <Badge className="bg-primary/10 text-primary">متاح</Badge>
               )}
             </div>
           </CardContent>
         </Card>
 
         {/* Stats Grid */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                   <ShoppingBag className="h-5 w-5 text-secondary" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">{stats.todayOrders}</p>
                   <p className="text-xs text-muted-foreground">طلبات اليوم</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                   <Clock className="h-5 w-5 text-accent" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                   <p className="text-xs text-muted-foreground">قيد التنفيذ</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                   <DollarSign className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">{stats.todayEarnings}</p>
                   <p className="text-xs text-muted-foreground">أرباح اليوم (ج.م)</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                   <Star className="h-5 w-5 text-secondary" />
                 </div>
                 <div>
                   <p className="text-2xl font-bold">{stats.rating.toFixed(1)}</p>
                   <p className="text-xs text-muted-foreground">{stats.totalReviews} تقييم</p>
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Recent Orders */}
         <Card>
           <CardHeader className="flex flex-row items-center justify-between">
             <CardTitle>الطلبات النشطة</CardTitle>
             <Link to="/chef/orders">
               <Button variant="ghost" size="sm">عرض الكل</Button>
             </Link>
           </CardHeader>
           <CardContent>
             {recentOrders.length === 0 ? (
               <div className="text-center py-8">
                 <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                 <p className="text-muted-foreground">لا توجد طلبات نشطة</p>
               </div>
             ) : (
               <div className="space-y-3">
                 {recentOrders.map((order) => (
                   <Link
                     key={order.id}
                     to={`/chef/orders/${order.id}`}
                     className="block p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                   >
                     <div className="flex items-center justify-between mb-2">
                       <span className="font-medium">{order.profiles?.full_name}</span>
                       <Badge variant="secondary">{STATUS_LABELS[order.status]}</Badge>
                     </div>
                     <div className="flex items-center justify-between text-sm text-muted-foreground">
                       <span>
                         {order.order_items?.map((i: any) => `${i.qty}× ${i.meals?.title}`).join(", ")}
                       </span>
                       <span className="font-semibold text-foreground">{order.total} ج.م</span>
                     </div>
                   </Link>
                 ))}
               </div>
             )}
           </CardContent>
         </Card>
       </div>
     </ChefLayout>
   );
 }