 import { useEffect, useState } from "react";
 import { useParams, Link } from "react-router-dom";
 import { Clock, AlertTriangle, ChefHat, Minus, Plus, ShoppingCart } from "lucide-react";
 import { Layout } from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Card, CardContent } from "@/components/ui/card";
 import { supabase } from "@/integrations/supabase/client";
 import { useCart } from "@/hooks/useCart";
 import { useToast } from "@/hooks/use-toast";
 
 export default function MealDetailsPage() {
   const { id } = useParams<{ id: string }>();
   const { addItem, items, updateQty } = useCart();
   const { toast } = useToast();
   const [meal, setMeal] = useState<any>(null);
   const [chef, setChef] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [qty, setQty] = useState(1);
 
   const cartItem = items.find((i) => i.mealId === id);
 
   useEffect(() => {
     if (id) fetchMealData();
   }, [id]);
 
   const fetchMealData = async () => {
     setLoading(true);
     
     const { data: mealData } = await supabase
       .from("meals")
       .select("*")
       .eq("id", id)
       .maybeSingle();
 
     if (mealData) {
       setMeal(mealData);
       
       // Fetch chef profile separately
       const [profileResult, chefProfileResult] = await Promise.all([
         supabase.from("profiles").select("full_name, avatar_url").eq("id", mealData.chef_id).maybeSingle(),
         supabase.from("chef_profiles").select("area, is_verified, available_now").eq("user_id", mealData.chef_id).maybeSingle()
       ]);
       
       setChef({
         id: mealData.chef_id,
         name: profileResult.data?.full_name || "طباخ",
         avatarUrl: profileResult.data?.avatar_url,
         area: chefProfileResult.data?.area || "",
         isVerified: chefProfileResult.data?.is_verified || false,
         availableNow: chefProfileResult.data?.available_now || false
       });
     }
     
     setLoading(false);
   };
 
   const handleAddToCart = () => {
     for (let i = 0; i < qty; i++) {
       addItem({
         mealId: meal.id,
         title: meal.title,
         price: meal.price,
         photoUrl: meal.photo_url,
         chefId: meal.chef_id,
         chefName: chef.name
       });
     }
     toast({
       title: "تمت الإضافة للسلة",
       description: `${qty} × ${meal.title}`
     });
   };
 
   if (loading) {
     return (
       <Layout>
         <div className="container py-6">
           <div className="h-64 bg-muted animate-pulse rounded-xl mb-4" />
           <div className="h-8 bg-muted animate-pulse rounded w-1/2 mb-2" />
           <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
         </div>
       </Layout>
     );
   }
 
   if (!meal) {
     return (
       <Layout>
         <div className="container py-12 text-center">
           <p className="text-muted-foreground">لم يتم العثور على الوجبة</p>
           <Link to="/search">
             <Button className="mt-4">العودة للبحث</Button>
           </Link>
         </div>
       </Layout>
     );
   }
 
   const tags: string[] = Array.isArray(meal.tags) ? meal.tags : [];
 
   return (
     <Layout>
       <div className="container py-6 space-y-6">
         {/* Image */}
         <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden">
           <img
             src={meal.photo_url || "/placeholder.svg"}
             alt={meal.title}
             className="w-full h-full object-cover"
           />
         </div>
 
         {/* Details */}
         <div className="grid md:grid-cols-3 gap-6">
           <div className="md:col-span-2 space-y-4">
             <div>
               <div className="flex items-center gap-2 mb-2">
                 {tags.map((tag, i) => (
                   <Badge key={i} variant="secondary">{tag}</Badge>
                 ))}
               </div>
               <h1 className="text-2xl md:text-3xl font-bold text-foreground">{meal.title}</h1>
               <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                 <div className="flex items-center gap-1">
                   <Clock className="h-4 w-4" />
                   <span>{meal.prep_time_min} دقيقة</span>
                 </div>
               </div>
             </div>
 
             {meal.description && (
               <p className="text-muted-foreground">{meal.description}</p>
             )}
 
             {meal.ingredients_text && (
               <Card>
                 <CardContent className="p-4">
                   <h3 className="font-semibold mb-2">المكونات</h3>
                   <p className="text-sm text-muted-foreground">{meal.ingredients_text}</p>
                 </CardContent>
               </Card>
             )}
 
             {meal.allergens_text && (
               <Card className="border-accent/20 bg-accent/5">
                 <CardContent className="p-4">
                   <div className="flex items-center gap-2 text-accent mb-2">
                     <AlertTriangle className="h-5 w-5" />
                     <h3 className="font-semibold">تحذير الحساسية</h3>
                   </div>
                   <p className="text-sm text-accent">{meal.allergens_text}</p>
                 </CardContent>
               </Card>
             )}
 
             {/* Chef Info */}
             <Link to={`/chef/${chef.id}`}>
               <Card className="cursor-pointer hover:shadow-md transition-shadow">
                 <CardContent className="p-4 flex items-center gap-3">
                   <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                     <ChefHat className="h-6 w-6 text-secondary" />
                   </div>
                   <div>
                     <p className="font-medium">{chef.name}</p>
                     <p className="text-sm text-muted-foreground">{chef.area}</p>
                   </div>
                   {chef.availableNow && (
                      <Badge className="mr-auto bg-primary/10 text-primary border-primary/20">
                       متاح الآن
                     </Badge>
                   )}
                 </CardContent>
               </Card>
             </Link>
           </div>
 
           {/* Order Card */}
           <div>
             <Card className="sticky top-24">
               <CardContent className="p-6 space-y-4">
                 <div className="text-center">
                   <span className="text-3xl font-bold text-secondary">{meal.price}</span>
                   <span className="text-lg text-muted-foreground mr-1">ج.م</span>
                 </div>
 
                 <div className="flex items-center justify-center gap-4">
                   <Button
                     variant="outline"
                     size="icon"
                     onClick={() => setQty(Math.max(1, qty - 1))}
                   >
                     <Minus className="h-4 w-4" />
                   </Button>
                   <span className="text-2xl font-semibold w-12 text-center">{qty}</span>
                   <Button
                     variant="outline"
                     size="icon"
                     onClick={() => setQty(Math.min(meal.max_qty_per_day || 10, qty + 1))}
                   >
                     <Plus className="h-4 w-4" />
                   </Button>
                 </div>
 
                 <div className="text-center text-muted-foreground text-sm">
                   الإجمالي: <span className="font-semibold text-foreground">{(meal.price * qty).toFixed(2)} ج.م</span>
                 </div>
 
                 <Button
                   className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                   size="lg"
                   onClick={handleAddToCart}
                 >
                   <ShoppingCart className="h-5 w-5 ml-2" />
                   أضف للسلة
                 </Button>
 
                 {cartItem && (
                   <p className="text-center text-sm text-muted-foreground">
                     لديك {cartItem.qty} في السلة
                   </p>
                 )}
               </CardContent>
             </Card>
           </div>
         </div>
       </div>
     </Layout>
   );
 }