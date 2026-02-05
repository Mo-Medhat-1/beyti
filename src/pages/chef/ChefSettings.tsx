 import { useEffect, useState } from "react";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { User, MapPin, Clock, ShieldCheck, Bell } from "lucide-react";
 import { ChefLayout } from "@/components/chef/ChefLayout";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Switch } from "@/components/ui/switch";
 import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 
 const profileSchema = z.object({
   fullName: z.string().min(2, "الاسم مطلوب"),
   phone: z.string().optional(),
   bio: z.string().optional(),
   area: z.string().min(2, "المنطقة مطلوبة"),
   startTime: z.string(),
   endTime: z.string(),
   pickupAvailable: z.boolean()
 });
 
 export default function ChefSettings() {
   const { user, profile } = useAuth();
   const { toast } = useToast();
   const [chefProfile, setChefProfile] = useState<any>(null);
   const [isLoading, setIsLoading] = useState(false);
 
   const form = useForm<z.infer<typeof profileSchema>>({
     resolver: zodResolver(profileSchema),
     defaultValues: {
       fullName: "",
       phone: "",
       bio: "",
       area: "",
       startTime: "09:00",
       endTime: "21:00",
       pickupAvailable: true
     }
   });
 
   useEffect(() => {
     if (user) fetchData();
   }, [user]);
 
   const fetchData = async () => {
     const { data } = await supabase
       .from("chef_profiles")
       .select("*")
       .eq("user_id", user!.id)
       .maybeSingle();
     
     setChefProfile(data);
 
     if (data && profile) {
       const hours = data.working_hours as any || {};
       form.reset({
         fullName: profile.full_name || "",
         phone: profile.phone || "",
         bio: data.bio || "",
         area: data.area || "",
         startTime: hours.start || "09:00",
         endTime: hours.end || "21:00",
         pickupAvailable: data.pickup_available ?? true
       });
     }
   };
 
   const onSubmit = async (data: z.infer<typeof profileSchema>) => {
     setIsLoading(true);
 
     try {
       // Update profiles table
       const { error: profileError } = await supabase
         .from("profiles")
         .update({
           full_name: data.fullName,
           phone: data.phone
         })
         .eq("id", user!.id);
 
       if (profileError) throw profileError;
 
       // Update chef_profiles table
       const { error: chefError } = await supabase
         .from("chef_profiles")
         .update({
           bio: data.bio,
           area: data.area,
           working_hours: {
             start: data.startTime,
             end: data.endTime,
             days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"]
           },
           pickup_available: data.pickupAvailable
         })
         .eq("user_id", user!.id);
 
       if (chefError) throw chefError;
 
       toast({ title: "تم حفظ التغييرات" });
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
       <div className="max-w-2xl space-y-6">
         <h1 className="text-2xl font-bold">الإعدادات</h1>
 
         <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             {/* Profile Info */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <User className="h-5 w-5" />
                   معلومات الملف الشخصي
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <FormField
                   control={form.control}
                   name="fullName"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>الاسم الكامل</FormLabel>
                       <FormControl>
                         <Input {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={form.control}
                   name="phone"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>رقم الهاتف</FormLabel>
                       <FormControl>
                         <Input {...field} placeholder="01xxxxxxxxx" dir="ltr" />
                       </FormControl>
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={form.control}
                   name="bio"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>نبذة عنك</FormLabel>
                       <FormControl>
                         <Textarea {...field} className="resize-none" />
                       </FormControl>
                     </FormItem>
                   )}
                 />
               </CardContent>
             </Card>
 
             {/* Location */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <MapPin className="h-5 w-5" />
                   المنطقة
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <FormField
                   control={form.control}
                   name="area"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>المنطقة التي تخدمها</FormLabel>
                       <FormControl>
                         <Input {...field} placeholder="مثال: مدينة نصر، القاهرة" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               </CardContent>
             </Card>
 
             {/* Working Hours */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Clock className="h-5 w-5" />
                   ساعات العمل
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-2 gap-4">
                   <FormField
                     control={form.control}
                     name="startTime"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>من الساعة</FormLabel>
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
               </CardContent>
             </Card>
 
             {/* Options */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <ShieldCheck className="h-5 w-5" />
                   خيارات إضافية
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <FormField
                   control={form.control}
                   name="pickupAvailable"
                   render={({ field }) => (
                     <FormItem className="flex items-center justify-between">
                       <div>
                         <FormLabel>إتاحة الاستلام من عندي</FormLabel>
                         <CardDescription>
                           السماح للعملاء بالاستلام مباشرة
                         </CardDescription>
                       </div>
                       <FormControl>
                         <Switch checked={field.value} onCheckedChange={field.onChange} />
                       </FormControl>
                     </FormItem>
                   )}
                 />
               </CardContent>
             </Card>
 
             {/* Verification Status */}
             {chefProfile && (
               <Card>
                 <CardContent className="p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <ShieldCheck className={`h-6 w-6 ${chefProfile.is_verified ? "text-primary" : "text-muted-foreground"}`} />
                     <div>
                       <p className="font-medium">حالة التوثيق</p>
                       <p className="text-sm text-muted-foreground">
                         {chefProfile.is_verified ? "حسابك موثق ✓" : "في انتظار التوثيق"}
                       </p>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             )}
 
             <Button
               type="submit"
               className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
               size="lg"
               disabled={isLoading}
             >
               {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
             </Button>
           </form>
         </Form>
       </div>
     </ChefLayout>
   );
 }