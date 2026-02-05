 import { Link } from "react-router-dom";
 import { Clock, Star, Plus } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { useCart } from "@/hooks/useCart";
 import { useToast } from "@/hooks/use-toast";
 
 interface MealCardProps {
   id: string;
   title: string;
   description?: string;
   price: number;
   prepTime: number;
   photoUrl?: string;
   tags?: string[];
   chefId: string;
   chefName: string;
 }
 
 export function MealCard({ id, title, description, price, prepTime, photoUrl, tags, chefId, chefName }: MealCardProps) {
   const { addItem } = useCart();
   const { toast } = useToast();
 
   const handleAddToCart = (e: React.MouseEvent) => {
     e.preventDefault();
     e.stopPropagation();
     
     addItem({
       mealId: id,
       title,
       price,
       photoUrl,
       chefId,
       chefName
     });
     
     toast({
       title: "تمت الإضافة للسلة",
       description: title
     });
   };
 
   return (
     <Link to={`/meal/${id}`}>
       <Card className="card-meal group cursor-pointer overflow-hidden">
         <div className="relative aspect-[4/3] overflow-hidden">
           <img
             src={photoUrl || "/placeholder.svg"}
             alt={title}
             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
           />
           <Button
             size="icon"
             className="absolute bottom-2 left-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full h-10 w-10 shadow-lg"
             onClick={handleAddToCart}
           >
             <Plus className="h-5 w-5" />
           </Button>
         </div>
         <CardContent className="p-4 space-y-2">
           <div className="flex items-start justify-between gap-2">
             <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
             <span className="font-bold text-secondary whitespace-nowrap">{price} ج.م</span>
           </div>
           {description && (
             <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
           )}
           <div className="flex items-center justify-between gap-2 pt-1">
             <div className="flex items-center gap-1 text-sm text-muted-foreground">
               <Clock className="h-4 w-4" />
               <span>{prepTime} دقيقة</span>
             </div>
             {tags && tags.length > 0 && (
               <div className="flex gap-1 flex-wrap justify-end">
                 {tags.slice(0, 2).map((tag, i) => (
                   <Badge key={i} variant="secondary" className="text-xs">
                     {tag}
                   </Badge>
                 ))}
               </div>
             )}
           </div>
         </CardContent>
       </Card>
     </Link>
   );
 }