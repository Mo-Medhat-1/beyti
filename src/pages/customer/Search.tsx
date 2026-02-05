 import { useState, useEffect } from "react";
 import { useSearchParams } from "react-router-dom";
 import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
 import { Layout } from "@/components/layout/Layout";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { MealCard } from "@/components/customer/MealCard";
 import { ChefCard } from "@/components/customer/ChefCard";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
 import { Slider } from "@/components/ui/slider";
 import { supabase } from "@/integrations/supabase/client";
 
 const TAGS = ["صحي", "سريع", "اقتصادي", "نباتي", "حار", "بدون جلوتين"];
 
 export default function Search() {
   const [searchParams, setSearchParams] = useSearchParams();
   const [query, setQuery] = useState(searchParams.get("q") || "");
   const [activeTab, setActiveTab] = useState<"meals" | "chefs">("meals");
   const [selectedTags, setSelectedTags] = useState<string[]>([]);
   const [priceRange, setPriceRange] = useState([0, 500]);
   const [meals, setMeals] = useState<any[]>([]);
   const [chefs, setChefs] = useState<any[]>([]);
   const [loading, setLoading] = useState(false);
 
   useEffect(() => {
     fetchData();
   }, [query, selectedTags, priceRange]);
 
   const fetchData = async () => {
     setLoading(true);
     
     // Fetch meals
     let mealsQuery = supabase
       .from("meals")
       .select(`
         *,
         profiles!meals_chef_id_fkey(full_name, avatar_url)
       `)
       .eq("is_available", true)
       .gte("price", priceRange[0])
       .lte("price", priceRange[1]);
 
     if (query) {
       mealsQuery = mealsQuery.ilike("title", `%${query}%`);
     }
 
     const { data: mealsData } = await mealsQuery;
     setMeals(mealsData || []);
 
     // Fetch chefs
     let chefsQuery = supabase
       .from("chef_profiles")
       .select(`
         *,
         profiles!chef_profiles_user_id_fkey(id, full_name, avatar_url)
       `);
 
     if (query) {
       chefsQuery = chefsQuery.ilike("area", `%${query}%`);
     }
 
     const { data: chefsData } = await chefsQuery;
     setChefs(chefsData || []);
     
     setLoading(false);
   };
 
   const toggleTag = (tag: string) => {
     setSelectedTags((prev) =>
       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
     );
   };
 
   return (
     <Layout>
       <div className="container py-6 space-y-6">
         {/* Search Header */}
         <div className="flex gap-2">
           <div className="relative flex-1">
             <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="ابحث عن وجبات أو طباخين..."
               className="pr-10"
             />
           </div>
           <Sheet>
             <SheetTrigger asChild>
               <Button variant="outline" size="icon">
                 <SlidersHorizontal className="h-5 w-5" />
               </Button>
             </SheetTrigger>
             <SheetContent side="left" className="w-80">
               <SheetHeader>
                 <SheetTitle>تصفية النتائج</SheetTitle>
               </SheetHeader>
               <div className="py-6 space-y-6">
                 <div>
                   <h4 className="font-medium mb-3">التصنيفات</h4>
                   <div className="flex flex-wrap gap-2">
                     {TAGS.map((tag) => (
                       <Badge
                         key={tag}
                         variant={selectedTags.includes(tag) ? "default" : "outline"}
                         className="cursor-pointer"
                         onClick={() => toggleTag(tag)}
                       >
                         {tag}
                       </Badge>
                     ))}
                   </div>
                 </div>
                 <div>
                   <h4 className="font-medium mb-3">نطاق السعر (ج.م)</h4>
                   <Slider
                     value={priceRange}
                     onValueChange={setPriceRange}
                     min={0}
                     max={500}
                     step={10}
                     className="my-6"
                   />
                   <div className="flex justify-between text-sm text-muted-foreground">
                     <span>{priceRange[0]} ج.م</span>
                     <span>{priceRange[1]} ج.م</span>
                   </div>
                 </div>
               </div>
             </SheetContent>
           </Sheet>
         </div>
 
         {/* Active Filters */}
         {selectedTags.length > 0 && (
           <div className="flex flex-wrap gap-2">
             {selectedTags.map((tag) => (
               <Badge key={tag} variant="secondary" className="gap-1">
                 {tag}
                 <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
               </Badge>
             ))}
             <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])}>
               مسح الكل
             </Button>
           </div>
         )}
 
         {/* Tabs */}
         <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "meals" | "chefs")}>
           <TabsList className="grid w-full max-w-xs grid-cols-2">
             <TabsTrigger value="meals">الوجبات ({meals.length})</TabsTrigger>
             <TabsTrigger value="chefs">الطباخين ({chefs.length})</TabsTrigger>
           </TabsList>
           
           <TabsContent value="meals" className="mt-6">
             {loading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[1, 2, 3, 4, 5, 6].map((i) => (
                   <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
                 ))}
               </div>
             ) : meals.length === 0 ? (
               <div className="text-center py-12">
                 <p className="text-muted-foreground">لا توجد وجبات مطابقة للبحث</p>
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
                     chefName={meal.profiles?.full_name || "طباخ"}
                   />
                 ))}
               </div>
             )}
           </TabsContent>
 
           <TabsContent value="chefs" className="mt-6">
             {loading ? (
               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
                 ))}
               </div>
             ) : chefs.length === 0 ? (
               <div className="text-center py-12">
                 <p className="text-muted-foreground">لا يوجد طباخين مطابقين للبحث</p>
               </div>
             ) : (
               <div className="space-y-4">
                 {chefs.map((chef) => (
                   <ChefCard
                     key={chef.id}
                     id={chef.user_id}
                     name={chef.profiles?.full_name || "طباخ"}
                     avatarUrl={chef.profiles?.avatar_url}
                     area={chef.area}
                     rating={chef.avg_rating || 0}
                     totalReviews={chef.total_reviews || 0}
                     isVerified={chef.is_verified}
                     availableNow={chef.available_now}
                   />
                 ))}
               </div>
             )}
           </TabsContent>
         </Tabs>
       </div>
     </Layout>
   );
 }