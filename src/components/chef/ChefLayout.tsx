 import { ReactNode } from "react";
 import { Link, useLocation, useNavigate } from "react-router-dom";
 import { LayoutDashboard, UtensilsCrossed, ClipboardList, Wallet, Settings, LogOut, Menu, X } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useAuth } from "@/contexts/AuthContext";
 import logo from "@/assets/logo-beyti.png";
 import { useState } from "react";
 
 const navItems = [
   { href: "/chef/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
   { href: "/chef/menu", label: "قائمة الطعام", icon: UtensilsCrossed },
   { href: "/chef/orders", label: "الطلبات", icon: ClipboardList },
   { href: "/chef/earnings", label: "الأرباح", icon: Wallet },
   { href: "/chef/settings", label: "الإعدادات", icon: Settings }
 ];
 
 export function ChefLayout({ children }: { children: ReactNode }) {
   const location = useLocation();
   const navigate = useNavigate();
   const { signOut, profile } = useAuth();
   const [sidebarOpen, setSidebarOpen] = useState(false);
 
   const handleSignOut = async () => {
     await signOut();
     navigate("/");
   };
 
   return (
     <div className="min-h-screen bg-background flex" dir="rtl">
       {/* Mobile Header */}
       <div className="md:hidden fixed top-0 right-0 left-0 z-50 bg-card border-b h-16 flex items-center justify-between px-4">
         <Link to="/chef/dashboard">
           <img src={logo} alt="Beyti" className="h-10" />
         </Link>
         <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
           {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
         </Button>
       </div>
 
       {/* Sidebar */}
       <aside className={`
         fixed md:static inset-y-0 right-0 z-40
         w-64 bg-card border-l transform transition-transform
         ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
         pt-20 md:pt-0
       `}>
         <div className="p-4 border-b hidden md:block">
           <Link to="/chef/dashboard">
             <img src={logo} alt="Beyti" className="h-12" />
           </Link>
         </div>
         
         <div className="p-4 border-b">
           <p className="font-semibold truncate">{profile?.full_name}</p>
           <p className="text-sm text-muted-foreground">طباخ منزلي</p>
         </div>
 
         <nav className="p-2 flex-1">
           {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = location.pathname === item.href;
             
             return (
               <Link
                 key={item.href}
                 to={item.href}
                 onClick={() => setSidebarOpen(false)}
                 className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                   isActive
                     ? "bg-secondary text-secondary-foreground"
                     : "hover:bg-muted"
                 }`}
               >
                 <Icon className="h-5 w-5" />
                 <span>{item.label}</span>
               </Link>
             );
           })}
         </nav>
 
         <div className="p-4 border-t mt-auto">
           <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleSignOut}>
             <LogOut className="h-5 w-5" />
             تسجيل الخروج
           </Button>
         </div>
       </aside>
 
       {/* Backdrop */}
       {sidebarOpen && (
         <div
           className="fixed inset-0 bg-black/50 z-30 md:hidden"
           onClick={() => setSidebarOpen(false)}
         />
       )}
 
       {/* Main Content */}
       <main className="flex-1 pt-16 md:pt-0">
         <div className="p-4 md:p-6 lg:p-8">
           {children}
         </div>
       </main>
     </div>
   );
 }