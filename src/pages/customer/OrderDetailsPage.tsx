 import { useEffect, useState } from "react";
 import { useParams, Link } from "react-router-dom";
 import { Clock, CheckCircle, XCircle, ChefHat, Package, Star, MapPin, Phone } from "lucide-react";
 import { Layout } from "@/components/layout/Layout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import { Textarea } from "@/components/ui/textarea";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 
 const STATUS_STEPS = [
   { key: "placed", label: "تم الطلب", icon: Clock },
   { key: "accepted", label: "تم القبول", icon: CheckCircle },
   { key: "cooking", label: "جاري التحضير", icon: ChefHat },
   { key: "ready", label: "جاهز للاستلام", icon: Package },
   { key: "completed", label: "مكتمل", icon: CheckCircle }
 ];
 
 export default function OrderDetailsPage() {
   const { id } = useParams<{ id: string }>();
   const { user } = useAuth();
   const { toast } = useToast();
   const [order, setOrder] = useState<any>(null);
   const [chef, setChef] = useState<any>(null);
   const [review, setReview] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   
   // Review form
   const [showReviewForm, setShowReviewForm] = useState(false);
   const [ratings, setRatings] = useState({
     quality: 5,
     cleanliness: 5,
     packaging: 5,
     punctuality: 5,
     overall: 5
   });
   const [comment, setComment] = useState("");
   const [isSubmittingReview, setIsSubmittingReview] = useState(false);
 
   useEffect(() => {
     if (id && user) fetchOrderData();
   }, [id, user]);
 
   const fetchOrderData = async () => {
     setLoading(true);
     
     const { data: orderData } = await supabase
       .from("orders")
       .select(`
         *,
         order_items(*, meals(title, photo_url, price)),
         addresses(title, area, details)
       `)
       .eq("id", id)
       .maybeSingle();
 
     if (orderData) {
       setOrder(orderData);
       
       // Fetch chef profile
       const { data: chefData } = await supabase
         .from("profiles")
         .select("full_name, phone, avatar_url")
         .eq("id", orderData.chef_id)
         .maybeSingle();
       
       setChef(chefData);
 
       // Check for existing review
       const { data: reviewData } = await supabase
         .from("reviews")
         .select("*")
         .eq("order_id", id)
         .maybeSingle();
       
       setReview(reviewData);
     }
     
     setLoading(false);
   };
 
   const submitReview = async () => {
     setIsSubmittingReview(true);
     
     try {
       const { error } = await supabase.from("reviews").insert({
         order_id: id,
         customer_id: user!.id,
         chef_id: order.chef_id,
         ratings,
         comment
       });
 
       if (error) throw error;
 
       toast({ title: "شكراً على تقييمك!" });
       setShowReviewForm(false);
       fetchOrderData();
     } catch (error: any) {
       toast({
         variant: "destructive",
         title: "خطأ",
         description: error.message
       });
     } finally {
       setIsSubmittingReview(false);
     }
   };
 
   if (loading) {
     return (
       <Layout>
         <div className="container py-6 space-y-4">
           <div className="h-32 bg-muted animate-pulse rounded-xl" />
           <div className="h-48 bg-muted animate-pulse rounded-xl" />
         </div>
       </Layout>
     );
   }
 
   if (!order) {
     return (
       <Layout>
         <div className="container py-12 text-center">
           <p className="text-muted-foreground">لم يتم العثور على الطلب</p>
           <Link to="/orders">
             <Button className="mt-4">العودة للطلبات</Button>
           </Link>
         </div>
       </Layout>
     );
   }
 
   const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);
   const isCancelled = order.status === "cancelled" || order.status === "expired";
 
   return (
     <Layout>
       <div className="container py-6 space-y-6">
         {/* Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold">تفاصيل الطلب</h1>
             <p className="text-sm text-muted-foreground">
               {new Date(order.created_at).toLocaleDateString("ar-EG", {
                 weekday: "long",
                 day: "numeric",
                 month: "long",
                 hour: "2-digit",
                 minute: "2-digit"
               })}
             </p>
           </div>
           {isCancelled && (
             <Badge className="bg-destructive/10 text-destructive">
               <XCircle className="h-3 w-3 ml-1" />
               {order.status === "cancelled" ? "ملغي" : "منتهي"}
             </Badge>
           )}
         </div>
 
         {/* Status Timeline */}
         {!isCancelled && (
           <Card>
             <CardContent className="p-4">
               <div className="flex items-center justify-between relative">
                 <div className="absolute top-5 right-0 left-0 h-0.5 bg-border -z-10" />
                 {STATUS_STEPS.map((step, index) => {
                   const StepIcon = step.icon;
                   const isActive = index <= currentStepIndex;
                   const isCurrent = index === currentStepIndex;
                   
                   return (
                     <div key={step.key} className="flex flex-col items-center gap-2">
                       <div
                         className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                           isActive
                             ? isCurrent
                               ? "bg-secondary text-secondary-foreground"
                               : "bg-primary text-primary-foreground"
                             : "bg-muted text-muted-foreground"
                         }`}
                       >
                         <StepIcon className="h-5 w-5" />
                       </div>
                       <span className={`text-xs ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                         {step.label}
                       </span>
                     </div>
                   );
                 })}
               </div>
             </CardContent>
           </Card>
         )}
 
         <div className="grid md:grid-cols-3 gap-6">
           <div className="md:col-span-2 space-y-6">
             {/* Order Items */}
             <Card>
               <CardHeader>
                 <CardTitle>الوجبات</CardTitle>
               </CardHeader>
               <CardContent className="divide-y divide-border">
                 {order.order_items?.map((item: any) => (
                   <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                     <div className="h-14 w-14 rounded-lg overflow-hidden bg-muted">
                       <img
                         src={item.meals?.photo_url || "/placeholder.svg"}
                         alt={item.meals?.title}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div className="flex-1">
                       <p className="font-medium">{item.meals?.title}</p>
                       <p className="text-sm text-muted-foreground">{item.qty} × {item.price} ج.م</p>
                     </div>
                     <span className="font-semibold">{(item.qty * item.price).toFixed(2)} ج.م</span>
                   </div>
                 ))}
               </CardContent>
             </Card>
 
             {/* Notes */}
             {order.notes && (
               <Card>
                 <CardHeader>
                   <CardTitle>ملاحظات</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-muted-foreground">{order.notes}</p>
                 </CardContent>
               </Card>
             )}
 
             {/* Review Section */}
             {order.status === "completed" && !review && !showReviewForm && (
               <Card>
                 <CardContent className="p-6 text-center">
                   <Star className="h-12 w-12 mx-auto text-secondary mb-4" />
                   <h3 className="font-semibold mb-2">كيف كانت تجربتك؟</h3>
                   <p className="text-muted-foreground text-sm mb-4">شارك رأيك لمساعدة الآخرين</p>
                   <Button onClick={() => setShowReviewForm(true)}>
                     تقييم الطلب
                   </Button>
                 </CardContent>
               </Card>
             )}
 
             {showReviewForm && (
               <Card>
                 <CardHeader>
                   <CardTitle>تقييم الطلب</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   {Object.entries({
                     quality: "جودة الطعام",
                     cleanliness: "النظافة",
                     packaging: "التغليف",
                     punctuality: "الالتزام بالوقت",
                     overall: "التقييم العام"
                   }).map(([key, label]) => (
                     <div key={key} className="flex items-center justify-between">
                       <span>{label}</span>
                       <div className="flex gap-1">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <button
                             key={star}
                             onClick={() => setRatings((prev) => ({ ...prev, [key]: star }))}
                             className="p-1"
                           >
                             <Star
                               className={`h-6 w-6 ${
                                 star <= ratings[key as keyof typeof ratings]
                                   ? "fill-secondary text-secondary"
                                   : "text-muted-foreground"
                               }`}
                             />
                           </button>
                         ))}
                       </div>
                     </div>
                   ))}
                   <Textarea
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                     placeholder="اكتب تعليقك (اختياري)..."
                     className="resize-none"
                   />
                   <div className="flex gap-2">
                     <Button
                       className="flex-1 bg-secondary hover:bg-secondary/90"
                       onClick={submitReview}
                       disabled={isSubmittingReview}
                     >
                       {isSubmittingReview ? "جاري الإرسال..." : "إرسال التقييم"}
                     </Button>
                     <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                       إلغاء
                     </Button>
                   </div>
                 </CardContent>
               </Card>
             )}
 
             {review && (
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <Star className="h-5 w-5 fill-secondary text-secondary" />
                     تقييمك
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="flex items-center gap-1 mb-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <Star
                         key={star}
                         className={`h-5 w-5 ${
                           star <= (review.ratings?.overall || 5)
                             ? "fill-secondary text-secondary"
                             : "text-muted-foreground"
                         }`}
                       />
                     ))}
                   </div>
                   {review.comment && (
                     <p className="text-muted-foreground">{review.comment}</p>
                   )}
                 </CardContent>
               </Card>
             )}
           </div>
 
           {/* Sidebar */}
           <div className="space-y-6">
             {/* Chef Info */}
             <Card>
               <CardHeader>
                 <CardTitle>الطباخ</CardTitle>
               </CardHeader>
               <CardContent>
                 <Link to={`/chef/${order.chef_id}`} className="flex items-center gap-3">
                   <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                     <ChefHat className="h-6 w-6 text-secondary" />
                   </div>
                   <div>
                     <p className="font-medium">{chef?.full_name}</p>
                     {chef?.phone && (
                       <p className="text-sm text-muted-foreground flex items-center gap-1">
                         <Phone className="h-3 w-3" />
                         {chef.phone}
                       </p>
                     )}
                   </div>
                 </Link>
               </CardContent>
             </Card>
 
             {/* Address */}
             {order.addresses && (
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <MapPin className="h-5 w-5" />
                     عنوان الاستلام
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="font-medium">{order.addresses.title}</p>
                   <p className="text-sm text-muted-foreground">
                     {order.addresses.area}
                     {order.addresses.details && ` - ${order.addresses.details}`}
                   </p>
                 </CardContent>
               </Card>
             )}
 
             {/* Order Summary */}
             <Card>
               <CardHeader>
                 <CardTitle>ملخص الدفع</CardTitle>
               </CardHeader>
               <CardContent className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">المجموع الفرعي</span>
                   <span>{order.subtotal} ج.م</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">التوصيل</span>
                   <span>{order.delivery_fee || 0} ج.م</span>
                 </div>
                 <div className="border-t pt-2 flex justify-between font-semibold">
                   <span>الإجمالي</span>
                   <span className="text-secondary">{order.total} ج.م</span>
                 </div>
               </CardContent>
             </Card>
           </div>
         </div>
       </div>
     </Layout>
   );
 }