 import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import { Clock, CheckCircle, XCircle, ChefHat, Package } from "lucide-react";
 import { Layout } from "@/components/layout/Layout";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 
 const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
   placed: { label: "بانتظار القبول", color: "bg-muted text-muted-foreground", icon: Clock },
   accepted: { label: "تم القبول", color: "bg-primary/10 text-primary", icon: CheckCircle },
   cooking: { label: "جاري التحضير", color: "bg-secondary/10 text-secondary", icon: ChefHat },
   ready: { label: "جاهز للاستلام", color: "bg-accent/10 text-accent", icon: Package },
   completed: { label: "مكتمل", color: "bg-primary/10 text-primary", icon: CheckCircle },
   cancelled: { label: "ملغي", color: "bg-destructive/10 text-destructive", icon: XCircle },
   expired: { label: "منتهي الصلاحية", color: "bg-muted text-muted-foreground", icon: XCircle }
 };
 
 export default function OrdersPage() {
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
       .select(`
         *,
         order_items(*, meals(title, photo_url)),
         profiles!orders_chef_id_fkey(full_name)
       `)
       .eq("customer_id", user!.id)
       .order("created_at", { ascending: false });
 
     setOrders(data || []);
     setLoading(false);
   };
 
   const activeOrders = orders.filter((o) => 
     ["placed", "accepted", "cooking", "ready"].includes(o.status)
   );
   const pastOrders = orders.filter((o) => 
     ["completed", "cancelled", "expired"].includes(o.status)
   );
 
   const OrderCard = ({ order }: { order: any }) => {
     const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;
     const StatusIcon = status.icon;
     
     return (
       <Link to={`/orders/${order.id}`}>
         <Card className="cursor-pointer hover:shadow-md transition-shadow">
           <CardContent className="p-4">
             <div className="flex items-start justify-between mb-3">
               <div>
                 <p className="font-medium">{order.profiles?.full_name}</p>
                 <p className="text-sm text-muted-foreground">
                   {new Date(order.created_at).toLocaleDateString("ar-EG", {
                     day: "numeric",
                     month: "short",
                     hour: "2-digit",
                     minute: "2-digit"
                   })}
                 </p>
               </div>
               <Badge className={status.color}>
                 <StatusIcon className="h-3 w-3 ml-1" />
                 {status.label}
               </Badge>
             </div>
             <div className="space-y-1 text-sm text-muted-foreground">
               {order.order_items?.slice(0, 2).map((item: any) => (
                 <p key={item.id}>{item.qty} × {item.meals?.title}</p>
               ))}
               {order.order_items?.length > 2 && (
                 <p>+{order.order_items.length - 2} أخرى</p>
               )}
             </div>
             <div className="flex justify-between items-center mt-3 pt-3 border-t">
               <span className="text-sm text-muted-foreground">
                 {order.order_items?.reduce((sum: number, i: any) => sum + i.qty, 0)} عنصر
               </span>
               <span className="font-semibold text-secondary">{order.total} ج.م</span>
             </div>
           </CardContent>
         </Card>
       </Link>
     );
   };
 
   if (loading) {
     return (
       <Layout>
         <div className="container py-6 space-y-4">
           {[1, 2, 3].map((i) => (
             <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
           ))}
         </div>
       </Layout>
     );
   }
 
   return (
     <Layout>
       <div className="container py-6 space-y-6">
         <h1 className="text-2xl font-bold">طلباتي</h1>
 
         <Tabs defaultValue="active">
           <TabsList className="grid w-full max-w-xs grid-cols-2">
             <TabsTrigger value="active">النشطة ({activeOrders.length})</TabsTrigger>
             <TabsTrigger value="past">السابقة ({pastOrders.length})</TabsTrigger>
           </TabsList>
 
           <TabsContent value="active" className="mt-6 space-y-4">
             {activeOrders.length === 0 ? (
               <div className="text-center py-12">
                 <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                 <p className="text-muted-foreground">لا توجد طلبات نشطة</p>
               </div>
             ) : (
               activeOrders.map((order) => <OrderCard key={order.id} order={order} />)
             )}
           </TabsContent>
 
           <TabsContent value="past" className="mt-6 space-y-4">
             {pastOrders.length === 0 ? (
               <div className="text-center py-12">
                 <p className="text-muted-foreground">لا توجد طلبات سابقة</p>
               </div>
             ) : (
               pastOrders.map((order) => <OrderCard key={order.id} order={order} />)
             )}
           </TabsContent>
         </Tabs>
       </div>
     </Layout>
   );
 }