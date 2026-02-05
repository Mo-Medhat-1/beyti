 import { useEffect, useState } from "react";
 import { useParams, Link } from "react-router-dom";
 import { Star, Clock, MapPin, BadgeCheck, Flag, Heart, Share2 } from "lucide-react";
 import { Layout } from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { MealCard } from "@/components/customer/MealCard";
 import { Card, CardContent } from "@/components/ui/card";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 
 export default function ChefProfilePage() {
   const { id } = useParams<{ id: string }>();
   const { user } = useAuth();
   const { toast } = useToast();
   const [chef, setChef] = useState<any>(null);
   const [meals, setMeals] = useState<any[]>([]);
   const [reviews, setReviews] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [isSaved, setIsSaved] = useState(false);
 
   useEffect(() => {
     if (id) {
       fetchChefData();
       if (user) checkIfSaved();
     }
   }, [id, user]);
 
   const fetchChefData = async () => {
     setLoading(true);
     
     const [chefResult, mealsResult, reviewsResult] = await Promise.all([
       supabase
         .from("chef_profiles")
         .select(`*, profiles!chef_profiles_user_id_fkey(full_name, avatar_url)`)
         .eq("user_id", id)
         .maybeSingle(),
       supabase
         .from("meals")
         .select("*")
         .eq("chef_id", id)
         .eq("is_available", true),
       supabase
         .from("reviews")
         .select(`*, profiles!reviews_customer_id_fkey(full_name, avatar_url)`)
         .eq("chef_id", id)
         .order("created_at", { ascending: false })
         .limit(10)
     ]);
 
     setChef(chefResult.data);
     setMeals(mealsResult.data || []);
     setReviews(reviewsResult.data || []);
     setLoading(false);
   };
 
   const checkIfSaved = async () => {
     const { data } = await supabase
       .from("saved_chefs")
       .select("id")
       .eq("customer_id", user!.id)
       .eq("chef_id", id)
       .maybeSingle();
     
     setIsSaved(!!data);
   };
 
   const toggleSave = async () => {
     if (!user) {
       toast({ title: "يرجى تسجيل الدخول أولاً" });
       return;
     }
 
     if (isSaved) {
       await supabase
         .from("saved_chefs")
         .delete()
         .eq("customer_id", user.id)
         .eq("chef_id", id);
       setIsSaved(false);
       toast({ title: "تم إزالة الطباخ من المفضلة" });
     } else {
       await supabase
         .from("saved_chefs")
         .insert({ customer_id: user.id, chef_id: id });
       setIsSaved(true);
       toast({ title: "تمت إضافة الطباخ للمفضلة" });
     }
   };
 
   if (loading) {
     return (
       <Layout>
         <div className="container py-6">
           <div className="h-32 bg-muted animate-pulse rounded-xl mb-4" />
           <div className="grid gap-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
             ))}
           </div>
         </div>
       </Layout>
     );
   }
 
   if (!chef) {
     return (
       <Layout>
         <div className="container py-12 text-center">
           <p className="text-muted-foreground">لم يتم العثور على الطباخ</p>
           <Link to="/search">
             <Button className="mt-4">العودة للبحث</Button>
           </Link>
         </div>
       </Layout>
     );
   }
 
   const workingHours = chef.working_hours || {};
 
   return (
     <Layout>
       <div className="container py-6 space-y-6">
         {/* Chef Header */}
         <Card>
           <CardContent className="p-6">
             <div className="flex flex-col sm:flex-row gap-4">
               <Avatar className="h-24 w-24 ring-4 ring-border">
                 <AvatarImage src={chef.profiles?.avatar_url} />
                 <AvatarFallback className="bg-secondary text-secondary-foreground text-3xl font-bold">
                   {chef.profiles?.full_name?.charAt(0)}
                 </AvatarFallback>
               </Avatar>
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-1">
                   <h1 className="text-2xl font-bold text-foreground">{chef.profiles?.full_name}</h1>
                   {chef.is_verified && (
                     <BadgeCheck className="h-6 w-6 text-primary" />
                   )}
                 </div>
                 <div className="flex items-center gap-1 text-muted-foreground mb-2">
                   <MapPin className="h-4 w-4" />
                   <span>{chef.area}</span>
                 </div>
                 <div className="flex items-center gap-4 mb-3">
                   <div className="flex items-center gap-1">
                     <Star className="h-5 w-5 fill-secondary text-secondary" />
                     <span className="font-semibold">{(chef.avg_rating || 0).toFixed(1)}</span>
                     <span className="text-sm text-muted-foreground">({chef.total_reviews || 0} تقييم)</span>
                   </div>
                   {chef.available_now && (
                     <Badge className="bg-primary/10 text-primary border-primary/20">
                       متاح الآن
                     </Badge>
                   )}
                 </div>
                 {chef.bio && (
                   <p className="text-muted-foreground text-sm">{chef.bio}</p>
                 )}
               </div>
               <div className="flex sm:flex-col gap-2">
                 <Button variant="outline" size="icon" onClick={toggleSave}>
                   <Heart className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                 </Button>
                 <Button variant="outline" size="icon">
                   <Share2 className="h-5 w-5" />
                 </Button>
                 <Button variant="outline" size="icon">
                   <Flag className="h-5 w-5" />
                 </Button>
               </div>
             </div>
           </CardContent>
         </Card>
 
         {/* Working Hours */}
         <Card>
           <CardContent className="p-4">
             <div className="flex items-center gap-2 text-sm">
               <Clock className="h-4 w-4 text-muted-foreground" />
               <span className="font-medium">ساعات العمل:</span>
               <span className="text-muted-foreground">
                 {workingHours.start || "09:00"} - {workingHours.end || "21:00"}
               </span>
             </div>
           </CardContent>
         </Card>
 
         {/* Tabs */}
         <Tabs defaultValue="menu">
           <TabsList className="grid w-full max-w-xs grid-cols-2">
             <TabsTrigger value="menu">القائمة ({meals.length})</TabsTrigger>
             <TabsTrigger value="reviews">التقييمات ({reviews.length})</TabsTrigger>
           </TabsList>
 
           <TabsContent value="menu" className="mt-6">
             {meals.length === 0 ? (
               <div className="text-center py-12">
                 <p className="text-muted-foreground">لا توجد وجبات متاحة حالياً</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {meals.map((meal) => (
                   <MealCard
                     key={meal.id}
                     id={meal.id}
                     title={meal.title}
                     description={meal.description}
                     price={meal.price}
                     prepTime={meal.prep_time_min}
                     photoUrl={meal.photo_url}
                     tags={meal.tags}
                     chefId={meal.chef_id}
                     chefName={chef.profiles?.full_name}
                   />
                 ))}
               </div>
             )}
           </TabsContent>
 
           <TabsContent value="reviews" className="mt-6 space-y-4">
             {reviews.length === 0 ? (
               <div className="text-center py-12">
                 <p className="text-muted-foreground">لا توجد تقييمات بعد</p>
               </div>
             ) : (
               reviews.map((review) => (
                 <Card key={review.id}>
                   <CardContent className="p-4">
                     <div className="flex items-start gap-3">
                       <Avatar className="h-10 w-10">
                         <AvatarImage src={review.profiles?.avatar_url} />
                         <AvatarFallback>{review.profiles?.full_name?.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <div className="flex-1">
                         <div className="flex items-center justify-between">
                           <span className="font-medium">{review.profiles?.full_name}</span>
                           <div className="flex items-center gap-1">
                             <Star className="h-4 w-4 fill-secondary text-secondary" />
                             <span className="text-sm">{review.ratings?.overall || 5}</span>
                           </div>
                         </div>
                         {review.comment && (
                           <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                         )}
                         <span className="text-xs text-muted-foreground mt-2 block">
                           {new Date(review.created_at).toLocaleDateString("ar-EG")}
                         </span>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               ))
             )}
           </TabsContent>
         </Tabs>
       </div>
     </Layout>
   );
 }