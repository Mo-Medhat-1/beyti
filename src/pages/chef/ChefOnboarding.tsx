 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { ChefHat, MapPin, Clock, ShieldCheck, ArrowLeft } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
 import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
 import { Checkbox } from "@/components/ui/checkbox";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 import { supabase } from "@/integrations/supabase/client";
 import logo from "@/assets/logo-beyti.png";
 
 const schema = z.object({
   bio: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
   area: z.string().min(2, "يرجى تحديد المنطقة"),
   startTime: z.string(),
   endTime: z.string(),
   hygieneAgreement: z.boolean().refine((val) => val === true, {
     message: "يجب الموافقة على قواعد النظافة"
   }),
   pickupAvailable: z.boolean()
 });
 
 export default function ChefOnboarding() {
   const { user } = useAuth();
   const { toast } = useToast();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
 
   const form = useForm<z.infer<typeof schema>>({
     resolver: zodResolver(schema),
     defaultValues: {
       bio: "",
       area: "",
       startTime: "09:00",
       endTime: "21:00",
       hygieneAgreement: false,
       pickupAvailable: true
     }
   });
 
   const onSubmit = async (data: z.infer<typeof schema>) => {
     if (!user) return;
     
     setIsLoading(true);
     
     try {
       const { error } = await supabase.from("chef_profiles").insert({
         user_id: user.id,
         bio: data.bio,
         area: data.area,
         working_hours: {
           start: data.startTime,
           end: data.endTime,
           days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"]
         },
         hygiene_agreement: data.hygieneAgreement,
         pickup_available: data.pickupAvailable,
         available_now: false
       });
 
       if (error) throw error;
 
       toast({
         title: "مرحباً بك في بيتي!",
         description: "تم إعداد ملفك الشخصي بنجاح"
       });
       
       navigate("/chef/dashboard");
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
     <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
       <Card className="w-full max-w-lg">
         <CardHeader className="text-center space-y-4">
           <img src={logo} alt="Beyti" className="h-16 mx-auto" />
           <div>
             <CardTitle className="text-2xl">مرحباً بك كطباخ في بيتي!</CardTitle>
             <CardDescription>أكمل بياناتك للبدء في استقبال الطلبات</CardDescription>
           </div>
         </CardHeader>
         <CardContent>
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                 control={form.control}
                 name="bio"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel className="flex items-center gap-2">
                       <ChefHat className="h-4 w-4" />
                       نبذة عنك
                     </FormLabel>
                     <FormControl>
                       <Textarea
                         {...field}
                         placeholder="اكتب نبذة قصيرة عن نفسك وتخصصاتك في الطبخ..."
                         className="resize-none"
                       />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
 
               <FormField
                 control={form.control}
                 name="area"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel className="flex items-center gap-2">
                       <MapPin className="h-4 w-4" />
                       المنطقة التي تخدمها
                     </FormLabel>
                     <FormControl>
                       <Input {...field} placeholder="مثال: مدينة نصر، القاهرة" />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
 
               <div className="grid grid-cols-2 gap-4">
                 <FormField
                   control={form.control}
                   name="startTime"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="flex items-center gap-2">
                         <Clock className="h-4 w-4" />
                         من الساعة
                       </FormLabel>
                       <FormControl>
                         <Input type="time" {...field} />
                       </FormControl>
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={form.control}
                   name="endTime"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>إلى الساعة</FormLabel>
                       <FormControl>
                         <Input type="time" {...field} />
                       </FormControl>
                     </FormItem>
                   )}
                 />
               </div>
 
               <FormField
                 control={form.control}
                 name="pickupAvailable"
                 render={({ field }) => (
                   <FormItem className="flex items-center gap-3 space-y-0">
                     <FormControl>
                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                     </FormControl>
                     <FormLabel className="cursor-pointer">
                       أتيح خيار استلام العميل من عندي
                     </FormLabel>
                   </FormItem>
                 )}
               />
 
               <FormField
                 control={form.control}
                 name="hygieneAgreement"
                 render={({ field }) => (
                   <FormItem className="flex items-start gap-3 space-y-0 p-4 bg-primary/5 rounded-xl">
                     <FormControl>
                       <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                     </FormControl>
                     <div>
                       <FormLabel className="cursor-pointer flex items-center gap-2">
                         <ShieldCheck className="h-4 w-4 text-primary" />
                         أوافق على قواعد النظافة والسلامة
                       </FormLabel>
                       <p className="text-xs text-muted-foreground mt-1">
                         أتعهد بالالتزام بمعايير النظافة في إعداد وتغليف الطعام
                       </p>
                     </div>
                     <FormMessage />
                   </FormItem>
                 )}
               />
 
               <Button
                 type="submit"
                 className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                 size="lg"
                 disabled={isLoading}
               >
                 {isLoading ? "جاري الحفظ..." : "ابدأ الآن"}
                 <ArrowLeft className="h-4 w-4 mr-2 rtl-flip" />
               </Button>
             </form>
           </Form>
         </CardContent>
       </Card>
     </div>
   );
 }