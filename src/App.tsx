 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { AuthProvider } from "@/contexts/AuthContext";
 
 // Public Pages
 import Index from "./pages/Index";
 import Explore from "./pages/Explore";
 import BecomeChef from "./pages/BecomeChef";
 import HowItWorks from "./pages/HowItWorks";
 import NotFound from "./pages/NotFound";
 import Auth from "./pages/Auth";
 
 // Customer Pages
 import Search from "./pages/customer/Search";
 import ChefProfilePage from "./pages/customer/ChefProfilePage";
 import MealDetailsPage from "./pages/customer/MealDetailsPage";
 import CartPage from "./pages/customer/CartPage";
 import CheckoutPage from "./pages/customer/CheckoutPage";
 import OrdersPage from "./pages/customer/OrdersPage";
 import OrderDetailsPage from "./pages/customer/OrderDetailsPage";
 
 // Chef Pages
 import ChefOnboarding from "./pages/chef/ChefOnboarding";
 import ChefDashboard from "./pages/chef/ChefDashboard";
 import ChefMenu from "./pages/chef/ChefMenu";
 import ChefMealForm from "./pages/chef/ChefMealForm";
 import ChefOrders from "./pages/chef/ChefOrders";
 import ChefEarnings from "./pages/chef/ChefEarnings";
 import ChefSettings from "./pages/chef/ChefSettings";
 
 const queryClient = new QueryClient();
 
 const App = () => (
   <QueryClientProvider client={queryClient}>
     <AuthProvider>
       <TooltipProvider>
         <Toaster />
         <Sonner />
         <BrowserRouter>
           <Routes>
             {/* Public */}
             <Route path="/" element={<Index />} />
             <Route path="/explore" element={<Explore />} />
             <Route path="/auth" element={<Auth />} />
             <Route path="/login" element={<Auth />} />
             <Route path="/signup" element={<Auth />} />
             <Route path="/become-chef" element={<BecomeChef />} />
             <Route path="/how-it-works" element={<HowItWorks />} />
             
             {/* Customer */}
             <Route path="/search" element={<Search />} />
             <Route path="/chef/:id" element={<ChefProfilePage />} />
             <Route path="/meal/:id" element={<MealDetailsPage />} />
             <Route path="/cart" element={<CartPage />} />
             <Route path="/checkout" element={<CheckoutPage />} />
             <Route path="/orders" element={<OrdersPage />} />
             <Route path="/orders/:id" element={<OrderDetailsPage />} />
             
             {/* Chef */}
             <Route path="/chef/onboarding" element={<ChefOnboarding />} />
             <Route path="/chef/dashboard" element={<ChefDashboard />} />
             <Route path="/chef/menu" element={<ChefMenu />} />
             <Route path="/chef/menu/new" element={<ChefMealForm />} />
             <Route path="/chef/menu/:id/edit" element={<ChefMealForm />} />
             <Route path="/chef/orders" element={<ChefOrders />} />
             <Route path="/chef/orders/:id" element={<ChefOrders />} />
             <Route path="/chef/earnings" element={<ChefEarnings />} />
             <Route path="/chef/settings" element={<ChefSettings />} />
             
             <Route path="*" element={<NotFound />} />
           </Routes>
         </BrowserRouter>
       </TooltipProvider>
     </AuthProvider>
   </QueryClientProvider>
 );
 
 export default App;
