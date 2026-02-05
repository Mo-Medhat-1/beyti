 import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import { Clock, CheckCircle, ChefHat, Package, XCircle } from "lucide-react";
 import { ChefLayout } from "@/components/chef/ChefLayout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 
 const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any; nextStatus?: string; nextLabel?: string }> = {
   placed: { label: "جديد", color: "bg-accent/10 text-accent", icon: Clock, nextStatus: "accepted", nextLabel: "قبول الطلب" },
   accepted: { label: "مقبول", color: "bg-primary/10 text-primary", icon: CheckCircle, nextStatus: "cooking", nextLabel: "بدء التحضير" },
   cooking: { label: "جاري التحضير", color: "bg-secondary/10 text-secondary", icon: ChefHat, nextStatus: "ready", nextLabel: "جاهز للاستلام" },
   ready: { label: "جاهز", color: "bg-primary/10 text-primary", icon: Package, nextStatus: "completed", nextLabel: "تم التسليم" },
   completed: { label: "مكتمل", color: "bg-muted text-muted-foreground", icon: CheckCircle },
   cancelled: { label: "ملغي", color: "bg-destructive/10 text-destructive", icon: XCircle },
   expired: { label: "منتهي", color: "bg-muted text-muted-foreground", icon: XCircle }
 };
 
 export default function ChefOrders() {
   const { user } = useAuth();
   const { toast } = useToast();
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
         profiles!orders_customer_id_fkey(full_name, phone),
         order_items(qty, price, meals(title)),
         addresses(title, area)
       `)
       .eq("chef_id", user!.id)
       .order("created_at", { ascending: false });
     
     setOrders(data || []);
     setLoading(false);
   };
 
   const updateStatus = async (orderId: string, newStatus: string) => {
     const updates: any = { status: newStatus };
     if (newStatus === "accepted") updates.accepted_at = new Date().toISOString();
     if (newStatus === "completed") updates.completed_at = new Date().toISOString();
 
     const { error } = await supabase
       .from("orders")
       .update(updates)
       .eq("id", orderId);
 
     if (!error) {
       setOrders(orders.map((o) => 
         o.id === orderId ? { ...o, ...updates } : o
       ));
       toast({ title: "تم تحديث حالة الطلب" });
     }
   };
 
   const rejectOrder = async (orderId: string) => {
     const { error } = await supabase
       .from("orders")
       .update({ status: "cancelled" })
       .eq("id", orderId);
 
     if (!error) {
       setOrders(orders.map((o) => 
         o.id === orderId ? { ...o, status: "cancelled" } : o
       ));
       toast({ title: "تم رفض الطلب" });
     }
   };
 
   const activeOrders = orders.filter((o) => 
     ["placed", "accepted", "cooking", "ready"].includes(o.status)
   );
   const pastOrders = orders.filter((o) => 
     ["completed", "cancelled", "expired"].includes(o.status)
   );
 
   const OrderCard = ({ order }: { order: any }) => {
     const status = STATUS_CONFIG[order.status];
     const StatusIcon = status.icon;
     
     return (
       <Card>
         <CardContent className="p-4">
           <div className="flex items-start justify-between mb-3">
             <div>
               <p className="font-semibold">{order.profiles?.full_name}</p>
               <p className="text-sm text-muted-foreground">
                 {new Date(order.created_at).toLocaleTimeString("ar-EG", {
                   hour: "2-digit",
                   minute: "2-digit"
                 })}
                 {order.profiles?.phone && ` • ${order.profiles.phone}`}
               </p>
             </div>
             <Badge className={status.color}>
               <StatusIcon className="h-3 w-3 ml-1" />
               {status.label}
             </Badge>
           </div>
           
           <div className="space-y-1 mb-3 text-sm">
             {order.order_items?.map((item: any, i: number) => (
               <p key={i} className="text-muted-foreground">
                 {item.qty} × {item.meals?.title}
               </p>
             ))}
           </div>
 
           {order.notes && (
             <div className="p-2 rounded-lg bg-muted/50 text-sm mb-3">
               <span className="font-medium">ملاحظات: </span>
               {order.notes}
             </div>
           )}
 
           <div className="flex items-center justify-between pt-3 border-t">
             <span className="font-bold text-secondary">{order.total} ج.م</span>
             
             {status.nextStatus && (
               <div className="flex gap-2">
                 {order.status === "placed" && (
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => rejectOrder(order.id)}
                   >
                     رفض
                   </Button>
                 )}
                 <Button
                   size="sm"
                   className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                   onClick={() => updateStatus(order.id, status.nextStatus!)}
                 >
                   {status.nextLabel}
                 </Button>
               </div>
             )}
           </div>
         </CardContent>
       </Card>
     );
   };
 
   if (loading) {
     return (
       <ChefLayout>
         <div className="space-y-4">
           {[1, 2, 3].map((i) => (
             <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />
           ))}
         </div>
       </ChefLayout>
     );
   }
 
   return (
     <ChefLayout>
       <div className="space-y-6">
         <h1 className="text-2xl font-bold">إدارة الطلبات</h1>
 
         <Tabs defaultValue="active">
           <TabsList className="grid w-full max-w-xs grid-cols-2">
             <TabsTrigger value="active">النشطة ({activeOrders.length})</TabsTrigger>
             <TabsTrigger value="past">السابقة ({pastOrders.length})</TabsTrigger>
           </TabsList>
 
           <TabsContent value="active" className="mt-6 space-y-4">
             {activeOrders.length === 0 ? (
               <Card>
                 <CardContent className="p-12 text-center">
                   <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                   <p className="text-muted-foreground">لا توجد طلبات نشطة</p>
                 </CardContent>
               </Card>
             ) : (
               activeOrders.map((order) => <OrderCard key={order.id} order={order} />)
             )}
           </TabsContent>
 
           <TabsContent value="past" className="mt-6 space-y-4">
             {pastOrders.length === 0 ? (
               <Card>
                 <CardContent className="p-12 text-center">
                   <p className="text-muted-foreground">لا توجد طلبات سابقة</p>
                 </CardContent>
               </Card>
             ) : (
               pastOrders.map((order) => <OrderCard key={order.id} order={order} />)
             )}
           </TabsContent>
         </Tabs>
       </div>
     </ChefLayout>
   );
 }