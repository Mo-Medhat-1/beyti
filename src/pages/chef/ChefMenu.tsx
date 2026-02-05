 import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
 import { ChefLayout } from "@/components/chef/ChefLayout";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Switch } from "@/components/ui/switch";
 import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 
 export default function ChefMenu() {
   const { user } = useAuth();
   const { toast } = useToast();
   const [meals, setMeals] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     if (user) fetchMeals();
   }, [user]);
 
   const fetchMeals = async () => {
     setLoading(true);
     const { data } = await supabase
       .from("meals")
       .select("*")
       .eq("chef_id", user!.id)
       .order("created_at", { ascending: false });
     
     setMeals(data || []);
     setLoading(false);
   };
 
   const toggleAvailability = async (mealId: string, currentValue: boolean) => {
     const { error } = await supabase
       .from("meals")
       .update({ is_available: !currentValue })
       .eq("id", mealId);
 
     if (!error) {
       setMeals(meals.map((m) => 
         m.id === mealId ? { ...m, is_available: !currentValue } : m
       ));
       toast({
         title: !currentValue ? "الوجبة متاحة الآن" : "تم إخفاء الوجبة"
       });
     }
   };
 
   const deleteMeal = async (mealId: string) => {
     const { error } = await supabase
       .from("meals")
       .delete()
       .eq("id", mealId);
 
     if (!error) {
       setMeals(meals.filter((m) => m.id !== mealId));
       toast({ title: "تم حذف الوجبة" });
     }
   };
 
   if (loading) {
     return (
       <ChefLayout>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {[1, 2, 3].map((i) => (
             <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
           ))}
         </div>
       </ChefLayout>
     );
   }
 
   return (
     <ChefLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold">قائمة الطعام</h1>
           <Link to="/chef/menu/new">
             <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
               <Plus className="h-4 w-4 ml-2" />
               إضافة وجبة
             </Button>
           </Link>
         </div>
 
         {meals.length === 0 ? (
           <Card>
             <CardContent className="p-12 text-center">
               <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                 <Plus className="h-8 w-8 text-muted-foreground" />
               </div>
               <h3 className="font-semibold mb-2">لا توجد وجبات بعد</h3>
               <p className="text-muted-foreground text-sm mb-4">ابدأ بإضافة وجباتك الشهية</p>
               <Link to="/chef/menu/new">
                 <Button>إضافة أول وجبة</Button>
               </Link>
             </CardContent>
           </Card>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {meals.map((meal) => (
               <Card key={meal.id} className="overflow-hidden">
                 <div className="relative aspect-video">
                   <img
                     src={meal.photo_url || "/placeholder.svg"}
                     alt={meal.title}
                     className="w-full h-full object-cover"
                   />
                   {!meal.is_available && (
                     <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                       <Badge variant="secondary">غير متاح</Badge>
                     </div>
                   )}
                 </div>
                 <CardContent className="p-4">
                   <div className="flex items-start justify-between mb-2">
                     <h3 className="font-semibold">{meal.title}</h3>
                     <span className="text-secondary font-bold">{meal.price} ج.م</span>
                   </div>
                   <div className="flex flex-wrap gap-1 mb-3">
                     {Array.isArray(meal.tags) && meal.tags.slice(0, 3).map((tag: string, i: number) => (
                       <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                     ))}
                   </div>
                   <div className="flex items-center justify-between pt-3 border-t">
                     <div className="flex items-center gap-2">
                       <Switch
                         checked={meal.is_available}
                         onCheckedChange={() => toggleAvailability(meal.id, meal.is_available)}
                       />
                       <span className="text-xs text-muted-foreground">
                         {meal.is_available ? "متاح" : "مخفي"}
                       </span>
                     </div>
                     <div className="flex gap-1">
                       <Link to={`/chef/menu/${meal.id}/edit`}>
                         <Button variant="ghost" size="icon">
                           <Edit2 className="h-4 w-4" />
                         </Button>
                       </Link>
                       <AlertDialog>
                         <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="text-destructive">
                             <Trash2 className="h-4 w-4" />
                           </Button>
                         </AlertDialogTrigger>
                         <AlertDialogContent>
                           <AlertDialogHeader>
                             <AlertDialogTitle>حذف الوجبة؟</AlertDialogTitle>
                             <AlertDialogDescription>
                               سيتم حذف "{meal.title}" نهائياً ولا يمكن التراجع.
                             </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                             <AlertDialogCancel>إلغاء</AlertDialogCancel>
                             <AlertDialogAction
                               onClick={() => deleteMeal(meal.id)}
                               className="bg-destructive text-destructive-foreground"
                             >
                               حذف
                             </AlertDialogAction>
                           </AlertDialogFooter>
                         </AlertDialogContent>
                       </AlertDialog>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
         )}
       </div>
     </ChefLayout>
   );
 }