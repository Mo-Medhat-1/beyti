 import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { MapPin, Clock, CreditCard, Banknote, Check } from "lucide-react";
 import { Layout } from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Textarea } from "@/components/ui/textarea";
 import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
 import { Label } from "@/components/ui/label";
 import { useCart } from "@/hooks/useCart";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 import { supabase } from "@/integrations/supabase/client";
 
 export default function CheckoutPage() {
   const { items, getSubtotal, getTotal, clearCart, chefId } = useCart();
   const { user } = useAuth();
   const { toast } = useToast();
   const navigate = useNavigate();
   
   const [addresses, setAddresses] = useState<any[]>([]);
   const [selectedAddress, setSelectedAddress] = useState<string>("");
   const [preferredTime, setPreferredTime] = useState<string>("asap");
   const [paymentMethod, setPaymentMethod] = useState<string>("cash");
   const [notes, setNotes] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
 
   useEffect(() => {
     if (!user) {
       navigate("/auth");
       return;
     }
     if (items.length === 0) {
       navigate("/cart");
       return;
     }
     fetchAddresses();
   }, [user, items]);
 
   const fetchAddresses = async () => {
     const { data } = await supabase
       .from("addresses")
       .select("*")
       .eq("user_id", user!.id);
     
     setAddresses(data || []);
     if (data && data.length > 0) {
       const defaultAddr = data.find((a) => a.is_default) || data[0];
       setSelectedAddress(defaultAddr.id);
     }
   };
 
   const handleSubmitOrder = async () => {
     if (!chefId) return;
     
     setIsSubmitting(true);
     
     try {
       // Create order
       const subtotal = getSubtotal();
       const total = getTotal();
       
       const { data: order, error: orderError } = await supabase
         .from("orders")
         .insert({
           customer_id: user!.id,
           chef_id: chefId,
           address_id: selectedAddress || null,
           preferred_time: preferredTime === "asap" ? "في أقرب وقت" : preferredTime,
           notes,
           subtotal,
           total,
           status: "placed"
         })
         .select()
         .single();
 
       if (orderError) throw orderError;
 
       // Create order items
       const orderItems = items.map((item) => ({
         order_id: order.id,
         meal_id: item.mealId,
         qty: item.qty,
         price: item.price
       }));
 
       const { error: itemsError } = await supabase
         .from("order_items")
         .insert(orderItems);
 
       if (itemsError) throw itemsError;
 
       clearCart();
       toast({
         title: "تم إرسال الطلب بنجاح!",
         description: "سيتم إعلامك عند قبول الطباخ للطلب"
       });
       navigate(`/orders/${order.id}`);
     } catch (error: any) {
       toast({
         variant: "destructive",
         title: "خطأ في إرسال الطلب",
         description: error.message
       });
     } finally {
       setIsSubmitting(false);
     }
   };
 
   const subtotal = getSubtotal();
   const total = getTotal();
 
   return (
     <Layout>
       <div className="container py-6 space-y-6">
         <h1 className="text-2xl font-bold">إتمام الطلب</h1>
 
         <div className="grid md:grid-cols-3 gap-6">
           <div className="md:col-span-2 space-y-6">
             {/* Delivery Address */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <MapPin className="h-5 w-5" />
                   عنوان الاستلام
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 {addresses.length === 0 ? (
                   <p className="text-muted-foreground text-sm">
                     لم تضف عنوان بعد. سيتم التواصل معك لتحديد موقع الاستلام.
                   </p>
                 ) : (
                   <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                     {addresses.map((addr) => (
                       <div key={addr.id} className="flex items-center space-x-2 space-x-reverse">
                         <RadioGroupItem value={addr.id} id={addr.id} />
                         <Label htmlFor={addr.id} className="flex-1 cursor-pointer">
                           <span className="font-medium">{addr.title}</span>
                           <span className="text-muted-foreground text-sm mr-2">
                             - {addr.area} {addr.details && `، ${addr.details}`}
                           </span>
                         </Label>
                       </div>
                     ))}
                   </RadioGroup>
                 )}
               </CardContent>
             </Card>
 
             {/* Preferred Time */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Clock className="h-5 w-5" />
                   وقت الاستلام
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <RadioGroup value={preferredTime} onValueChange={setPreferredTime}>
                   <div className="flex items-center space-x-2 space-x-reverse">
                     <RadioGroupItem value="asap" id="asap" />
                     <Label htmlFor="asap">في أقرب وقت ممكن</Label>
                   </div>
                   <div className="flex items-center space-x-2 space-x-reverse">
                     <RadioGroupItem value="scheduled" id="scheduled" />
                     <Label htmlFor="scheduled">تحديد وقت لاحق (نفس اليوم)</Label>
                   </div>
                 </RadioGroup>
               </CardContent>
             </Card>
 
             {/* Payment Method */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <CreditCard className="h-5 w-5" />
                   طريقة الدفع
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                   <div className="flex items-center space-x-2 space-x-reverse">
                     <RadioGroupItem value="cash" id="cash" />
                     <Label htmlFor="cash" className="flex items-center gap-2">
                       <Banknote className="h-4 w-4" />
                       الدفع عند الاستلام (كاش)
                     </Label>
                   </div>
                   <div className="flex items-center space-x-2 space-x-reverse opacity-50">
                     <RadioGroupItem value="card" id="card" disabled />
                     <Label htmlFor="card" className="flex items-center gap-2">
                       <CreditCard className="h-4 w-4" />
                       بطاقة ائتمان (قريباً)
                     </Label>
                   </div>
                 </RadioGroup>
               </CardContent>
             </Card>
 
             {/* Notes */}
             <Card>
               <CardHeader>
                 <CardTitle>ملاحظات للطباخ</CardTitle>
               </CardHeader>
               <CardContent>
                 <Textarea
                   value={notes}
                   onChange={(e) => setNotes(e.target.value)}
                   placeholder="مثال: بدون بصل، حار قليلاً..."
                   className="resize-none"
                 />
               </CardContent>
             </Card>
           </div>
 
           {/* Order Summary */}
           <div>
             <Card className="sticky top-24">
               <CardHeader>
                 <CardTitle>ملخص الطلب</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   {items.map((item) => (
                     <div key={item.mealId} className="flex justify-between text-sm">
                       <span>{item.qty} × {item.title}</span>
                       <span>{(item.price * item.qty).toFixed(2)} ج.م</span>
                     </div>
                   ))}
                 </div>
                 <div className="border-t pt-4 space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground">المجموع الفرعي</span>
                     <span>{subtotal.toFixed(2)} ج.م</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground">التوصيل</span>
                     <span className="text-primary">مجاني (استلام)</span>
                   </div>
                 </div>
                 <div className="border-t pt-4">
                   <div className="flex justify-between font-semibold text-lg">
                     <span>الإجمالي</span>
                     <span className="text-secondary">{total.toFixed(2)} ج.م</span>
                   </div>
                 </div>
                 <Button
                   className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                   size="lg"
                   onClick={handleSubmitOrder}
                   disabled={isSubmitting}
                 >
                   {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
                   <Check className="h-4 w-4 mr-2" />
                 </Button>
               </CardContent>
             </Card>
           </div>
         </div>
       </div>
     </Layout>
   );
 }