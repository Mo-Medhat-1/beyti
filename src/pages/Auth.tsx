 import { useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { Eye, EyeOff, ChefHat, User, ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
 import { useToast } from "@/hooks/use-toast";
 import { useAuth } from "@/contexts/AuthContext";
 import logo from "@/assets/logo-beyti.png";
 import type { Database } from "@/integrations/supabase/types";
 
 type AppRole = Database["public"]["Enums"]["app_role"];
 
 const loginSchema = z.object({
   email: z.string().email("البريد الإلكتروني غير صالح"),
   password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
 });
 
 const signupSchema = z.object({
   fullName: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
   email: z.string().email("البريد الإلكتروني غير صالح"),
   password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
   confirmPassword: z.string()
 }).refine((data) => data.password === data.confirmPassword, {
   message: "كلمات المرور غير متطابقة",
   path: ["confirmPassword"]
 });
 
 export default function Auth() {
   const [isLogin, setIsLogin] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const [selectedRole, setSelectedRole] = useState<AppRole>("customer");
   const [isLoading, setIsLoading] = useState(false);
   const { signIn, signUp } = useAuth();
   const { toast } = useToast();
   const navigate = useNavigate();
 
   const loginForm = useForm<z.infer<typeof loginSchema>>({
     resolver: zodResolver(loginSchema),
     defaultValues: { email: "", password: "" }
   });
 
   const signupForm = useForm<z.infer<typeof signupSchema>>({
     resolver: zodResolver(signupSchema),
     defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" }
   });
 
   const handleLogin = async (data: z.infer<typeof loginSchema>) => {
     setIsLoading(true);
     const { error } = await signIn(data.email, data.password);
     setIsLoading(false);
 
     if (error) {
       toast({
         variant: "destructive",
         title: "خطأ في تسجيل الدخول",
         description: error.message.includes("Invalid login") ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : error.message
       });
       return;
     }
 
     toast({ title: "مرحباً بك!" });
     navigate("/");
   };
 
   const handleSignup = async (data: z.infer<typeof signupSchema>) => {
     setIsLoading(true);
     const { error } = await signUp(data.email, data.password, data.fullName, selectedRole);
     setIsLoading(false);
 
     if (error) {
       toast({
         variant: "destructive",
         title: "خطأ في التسجيل",
         description: error.message.includes("already registered") ? "هذا البريد الإلكتروني مسجل بالفعل" : error.message
       });
       return;
     }
 
     toast({
       title: "تم إنشاء الحساب!",
       description: "يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب"
     });
     
     if (selectedRole === "chef") {
       navigate("/chef/onboarding");
     } else {
       navigate("/");
     }
   };
 
   return (
     <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
       <Card className="w-full max-w-md">
         <CardHeader className="text-center space-y-4">
           <Link to="/" className="inline-block mx-auto">
             <img src={logo} alt="Beyti" className="h-16 w-auto" />
           </Link>
           <CardTitle className="text-2xl font-bold text-foreground">
             {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
           </CardTitle>
           <CardDescription>
             {isLogin ? "أدخل بياناتك للدخول إلى حسابك" : "اختر نوع الحساب وأكمل البيانات"}
           </CardDescription>
         </CardHeader>
 
         <CardContent className="space-y-6">
           {!isLogin && (
             <div className="grid grid-cols-2 gap-3">
               <Button
                 type="button"
                 variant={selectedRole === "customer" ? "default" : "outline"}
                 className={`h-24 flex-col gap-2 ${selectedRole === "customer" ? "bg-secondary hover:bg-secondary/90" : ""}`}
                 onClick={() => setSelectedRole("customer")}
               >
                 <User className="h-8 w-8" />
                 <span>عميل</span>
               </Button>
               <Button
                 type="button"
                 variant={selectedRole === "chef" ? "default" : "outline"}
                 className={`h-24 flex-col gap-2 ${selectedRole === "chef" ? "bg-secondary hover:bg-secondary/90" : ""}`}
                 onClick={() => setSelectedRole("chef")}
               >
                 <ChefHat className="h-8 w-8" />
                 <span>طباخ منزلي</span>
               </Button>
             </div>
           )}
 
           {isLogin ? (
             <Form {...loginForm}>
               <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                 <FormField
                   control={loginForm.control}
                   name="email"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>البريد الإلكتروني</FormLabel>
                       <FormControl>
                         <Input type="email" placeholder="example@email.com" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={loginForm.control}
                   name="password"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>كلمة المرور</FormLabel>
                       <FormControl>
                         <div className="relative">
                           <Input
                             type={showPassword ? "text" : "password"}
                             placeholder="••••••••"
                             {...field}
                           />
                           <button
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                           >
                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                           </button>
                         </div>
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <Button
                   type="submit"
                   className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                   disabled={isLoading}
                 >
                   {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
                   <ArrowRight className="h-4 w-4 mr-2 rtl-flip" />
                 </Button>
               </form>
             </Form>
           ) : (
             <Form {...signupForm}>
               <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                 <FormField
                   control={signupForm.control}
                   name="fullName"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>الاسم الكامل</FormLabel>
                       <FormControl>
                         <Input placeholder="أدخل اسمك الكامل" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={signupForm.control}
                   name="email"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>البريد الإلكتروني</FormLabel>
                       <FormControl>
                         <Input type="email" placeholder="example@email.com" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={signupForm.control}
                   name="password"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>كلمة المرور</FormLabel>
                       <FormControl>
                         <div className="relative">
                           <Input
                             type={showPassword ? "text" : "password"}
                             placeholder="••••••••"
                             {...field}
                           />
                           <button
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                           >
                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                           </button>
                         </div>
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={signupForm.control}
                   name="confirmPassword"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>تأكيد كلمة المرور</FormLabel>
                       <FormControl>
                         <Input type="password" placeholder="••••••••" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <Button
                   type="submit"
                   className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                   disabled={isLoading}
                 >
                   {isLoading ? "جاري التحميل..." : "إنشاء الحساب"}
                   <ArrowRight className="h-4 w-4 mr-2 rtl-flip" />
                 </Button>
               </form>
             </Form>
           )}
 
           <div className="text-center">
             <button
               type="button"
               onClick={() => setIsLogin(!isLogin)}
               className="text-sm text-secondary hover:underline"
             >
               {isLogin ? "ليس لديك حساب؟ سجل الآن" : "لديك حساب؟ سجل دخولك"}
             </button>
           </div>
         </CardContent>
       </Card>
     </div>
   );
 }