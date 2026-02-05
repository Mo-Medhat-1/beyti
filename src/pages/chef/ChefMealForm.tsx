 import { useEffect, useState } from "react";
 import { useParams, useNavigate } from "react-router-dom";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { ArrowRight, Upload, X } from "lucide-react";
 import { ChefLayout } from "@/components/chef/ChefLayout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Badge } from "@/components/ui/badge";
 import { Switch } from "@/components/ui/switch";
 import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 
 const AVAILABLE_TAGS = ["صحي", "سريع", "اقتصادي", "نباتي", "حار", "بدون جلوتين", "مشويات", "حلويات", "مقبلات"];
 
 const schema = z.object({
   title: z.string().min(2, "اسم الوجبة مطلوب"),
   description: z.string().optional(),
   price: z.coerce.number().min(1, "السعر مطلوب"),
   prepTimeMin: z.coerce.number().min(5, "وقت التحضير مطلوب"),
   maxQtyPerDay: z.coerce.number().min(1, "الحد الأقصى مطلوب"),
   ingredientsText: z.string().optional(),
   allergensText: z.string().optional(),
   isAvailable: z.boolean()
 });
 
 export default function ChefMealForm() {
   const { id } = useParams();
   const isEdit = !!id;
   const { user } = useAuth();
   const { toast } = useToast();
   const navigate = useNavigate();
   
   const [selectedTags, setSelectedTags] = useState<string[]>([]);
   const [photoUrl, setPhotoUrl] = useState<string>("");
   const [isLoading, setIsLoading] = useState(false);
 
   const form = useForm<z.infer<typeof schema>>({
     resolver: zodResolver(schema),
     defaultValues: {
       title: "",
       description: "",
       price: 0,
       prepTimeMin: 30,
       maxQtyPerDay: 10,
       ingredientsText: "",
       allergensText: "",
       isAvailable: true
     }
   });
 
   useEffect(() => {
     if (isEdit) fetchMeal();
   }, [id]);
 
   const fetchMeal = async () => {
     const { data } = await supabase
       .from("meals")
       .select("*")
       .eq("id", id)
       .maybeSingle();
 
     if (data) {
       form.reset({
         title: data.title,
         description: data.description || "",
         price: data.price,
         prepTimeMin: data.prep_time_min,
         maxQtyPerDay: data.max_qty_per_day,
         ingredientsText: data.ingredients_text || "",
         allergensText: data.allergens_text || "",
         isAvailable: data.is_available
       });
       setSelectedTags(Array.isArray(data.tags) ? (data.tags as string[]) : []);
       setPhotoUrl(data.photo_url || "");
     }
   };
 
   const toggleTag = (tag: string) => {
     setSelectedTags((prev) =>
       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
     );
   };
 
   const onSubmit = async (data: z.infer<typeof schema>) => {
     setIsLoading(true);
 
     try {
       const mealData = {
         chef_id: user!.id,
         title: data.title,
         description: data.description,
         price: data.price,
         prep_time_min: data.prepTimeMin,
         max_qty_per_day: data.maxQtyPerDay,
         ingredients_text: data.ingredientsText,
         allergens_text: data.allergensText,
         is_available: data.isAvailable,
         tags: selectedTags,
         photo_url: photoUrl || null
       };
 
       if (isEdit) {
         const { error } = await supabase
           .from("meals")
           .update(mealData)
           .eq("id", id);
 
         if (error) throw error;
         toast({ title: "تم تحديث الوجبة" });
       } else {
         const { error } = await supabase
           .from("meals")
           .insert(mealData);
 
         if (error) throw error;
         toast({ title: "تمت إضافة الوجبة" });
       }
 
       navigate("/chef/menu");
     } catch (error: any) {
       toast({
         variant: "destructive",
         title: "خطأ",
         description: error.message
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   return (
     <ChefLayout>
       <div className="max-w-2xl mx-auto space-y-6">
         <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
             <ArrowRight className="h-5 w-5" />
           </Button>
           <h1 className="text-2xl font-bold">
             {isEdit ? "تعديل الوجبة" : "إضافة وجبة جديدة"}
           </h1>
         </div>
 
         <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             {/* Photo */}
             <Card>
               <CardHeader>
                 <CardTitle>صورة الوجبة</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center gap-4">
                   <div className="h-32 w-32 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                     {photoUrl ? (
                       <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                     ) : (
                       <Upload className="h-8 w-8 text-muted-foreground" />
                     )}
                   </div>
                   <div className="flex-1">
                     <Input
                       value={photoUrl}
                       onChange={(e) => setPhotoUrl(e.target.value)}
                       placeholder="رابط صورة الوجبة (URL)"
                     />
                     <p className="text-xs text-muted-foreground mt-2">
                       أدخل رابط صورة مباشر أو استخدم خدمة رفع الصور
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>
 
             {/* Basic Info */}
             <Card>
               <CardHeader>
                 <CardTitle>معلومات الوجبة</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <FormField
                   control={form.control}
                   name="title"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>اسم الوجبة</FormLabel>
                       <FormControl>
                         <Input {...field} placeholder="مثال: كشري مصري" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
 
                 <FormField
                   control={form.control}
                   name="description"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>الوصف</FormLabel>
                       <FormControl>
                         <Textarea {...field} placeholder="وصف قصير للوجبة..." className="resize-none" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
 
                 <div className="grid grid-cols-3 gap-4">
                   <FormField
                     control={form.control}
                     name="price"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>السعر (ج.م)</FormLabel>
                         <FormControl>
                           <Input type="number" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
 
                   <FormField
                     control={form.control}
                     name="prepTimeMin"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>وقت التحضير (دقيقة)</FormLabel>
                         <FormControl>
                           <Input type="number" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
 
                   <FormField
                     control={form.control}
                     name="maxQtyPerDay"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>الحد اليومي</FormLabel>
                         <FormControl>
                           <Input type="number" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                 </div>
               </CardContent>
             </Card>
 
             {/* Tags */}
             <Card>
               <CardHeader>
                 <CardTitle>التصنيفات</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex flex-wrap gap-2">
                   {AVAILABLE_TAGS.map((tag) => (
                     <Badge
                       key={tag}
                       variant={selectedTags.includes(tag) ? "default" : "outline"}
                       className="cursor-pointer"
                       onClick={() => toggleTag(tag)}
                     >
                       {tag}
                       {selectedTags.includes(tag) && <X className="h-3 w-3 mr-1" />}
                     </Badge>
                   ))}
                 </div>
               </CardContent>
             </Card>
 
             {/* Ingredients & Allergens */}
             <Card>
               <CardHeader>
                 <CardTitle>المكونات والحساسية</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <FormField
                   control={form.control}
                   name="ingredientsText"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>المكونات</FormLabel>
                       <FormControl>
                         <Textarea {...field} placeholder="اكتب المكونات الرئيسية..." className="resize-none" />
                       </FormControl>
                     </FormItem>
                   )}
                 />
 
                 <FormField
                   control={form.control}
                   name="allergensText"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>تحذيرات الحساسية</FormLabel>
                       <FormControl>
                         <Textarea {...field} placeholder="مثال: يحتوي على مكسرات، جلوتين..." className="resize-none" />
                       </FormControl>
                       <FormDescription>
                         سيظهر تحذير للعملاء الذين لديهم حساسية
                       </FormDescription>
                     </FormItem>
                   )}
                 />
               </CardContent>
             </Card>
 
             {/* Availability */}
             <Card>
               <CardContent className="p-4">
                 <FormField
                   control={form.control}
                   name="isAvailable"
                   render={({ field }) => (
                     <FormItem className="flex items-center justify-between">
                       <div>
                         <FormLabel>إظهار الوجبة للعملاء</FormLabel>
                         <FormDescription>
                           يمكنك إخفاء الوجبة مؤقتاً دون حذفها
                         </FormDescription>
                       </div>
                       <FormControl>
                         <Switch checked={field.value} onCheckedChange={field.onChange} />
                       </FormControl>
                     </FormItem>
                   )}
                 />
               </CardContent>
             </Card>
 
             <Button
               type="submit"
               className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
               size="lg"
               disabled={isLoading}
             >
               {isLoading ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة الوجبة"}
             </Button>
           </form>
         </Form>
       </div>
     </ChefLayout>
   );
 }