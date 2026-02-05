 import { Link, useNavigate } from "react-router-dom";
 import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
 import { Layout } from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
 import { useCart } from "@/hooks/useCart";
 import { useAuth } from "@/contexts/AuthContext";
 
 export default function CartPage() {
   const { items, updateQty, removeItem, clearCart, getSubtotal, getTotal } = useCart();
   const { user } = useAuth();
   const navigate = useNavigate();
 
   const subtotal = getSubtotal();
   const total = getTotal();
 
   if (items.length === 0) {
     return (
       <Layout>
         <div className="container py-12 text-center">
           <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
           <h1 className="text-2xl font-bold mb-2">سلة التسوق فارغة</h1>
           <p className="text-muted-foreground mb-6">ابدأ بإضافة وجبات شهية من الطباخين</p>
           <Link to="/search">
             <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
               تصفح الوجبات
             </Button>
           </Link>
         </div>
       </Layout>
     );
   }
 
   const chefName = items[0]?.chefName;
 
   return (
     <Layout>
       <div className="container py-6 space-y-6">
         <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold">سلة التسوق</h1>
           <Button variant="ghost" size="sm" onClick={clearCart}>
             مسح السلة
           </Button>
         </div>
 
         <div className="grid md:grid-cols-3 gap-6">
           <div className="md:col-span-2 space-y-4">
             <Card>
               <CardHeader className="pb-2">
                 <CardTitle className="text-lg">الطلب من: {chefName}</CardTitle>
               </CardHeader>
               <CardContent className="divide-y divide-border">
                 {items.map((item) => (
                   <div key={item.mealId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                     <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                       <img
                         src={item.photoUrl || "/placeholder.svg"}
                         alt={item.title}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div className="flex-1 min-w-0">
                       <h3 className="font-medium truncate">{item.title}</h3>
                       <p className="text-sm text-secondary font-semibold">{item.price} ج.م</p>
                     </div>
                     <div className="flex items-center gap-2">
                       <Button
                         variant="outline"
                         size="icon"
                         className="h-8 w-8"
                         onClick={() => updateQty(item.mealId, item.qty - 1)}
                       >
                         <Minus className="h-4 w-4" />
                       </Button>
                       <span className="w-8 text-center font-medium">{item.qty}</span>
                       <Button
                         variant="outline"
                         size="icon"
                         className="h-8 w-8"
                         onClick={() => updateQty(item.mealId, item.qty + 1)}
                       >
                         <Plus className="h-4 w-4" />
                       </Button>
                     </div>
                     <Button
                       variant="ghost"
                       size="icon"
                       className="text-destructive hover:text-destructive"
                       onClick={() => removeItem(item.mealId)}
                     >
                       <Trash2 className="h-4 w-4" />
                     </Button>
                   </div>
                 ))}
               </CardContent>
             </Card>
           </div>
 
           <div>
             <Card className="sticky top-24">
               <CardHeader>
                 <CardTitle>ملخص الطلب</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2 text-sm">
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">المجموع الفرعي</span>
                     <span>{subtotal.toFixed(2)} ج.م</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">رسوم التوصيل</span>
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
                   onClick={() => navigate(user ? "/checkout" : "/auth")}
                 >
                   {user ? "متابعة الطلب" : "تسجيل الدخول للمتابعة"}
                   <ArrowLeft className="h-4 w-4 mr-2 rtl-flip" />
                 </Button>
               </CardContent>
             </Card>
           </div>
         </div>
       </div>
     </Layout>
   );
 }