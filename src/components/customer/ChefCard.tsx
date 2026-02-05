 import { Link } from "react-router-dom";
 import { Star, Clock, MapPin, BadgeCheck } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 
 interface ChefCardProps {
   id: string;
   name: string;
   avatarUrl?: string;
   area: string;
   rating: number;
   totalReviews: number;
   isVerified: boolean;
   availableNow: boolean;
   prepTimeAvg?: number;
 }
 
 export function ChefCard({
   id,
   name,
   avatarUrl,
   area,
   rating,
   totalReviews,
   isVerified,
   availableNow,
   prepTimeAvg = 30
 }: ChefCardProps) {
   return (
     <Link to={`/chef/${id}`}>
       <Card className="card-meal group cursor-pointer">
         <CardContent className="p-4">
           <div className="flex items-start gap-4">
             <Avatar className="h-16 w-16 ring-2 ring-border">
               <AvatarImage src={avatarUrl} alt={name} />
               <AvatarFallback className="bg-secondary text-secondary-foreground text-xl font-bold">
                 {name.charAt(0)}
               </AvatarFallback>
             </Avatar>
             <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2">
                 <h3 className="font-semibold text-foreground truncate">{name}</h3>
                 {isVerified && (
                   <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                 )}
               </div>
               <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                 <MapPin className="h-4 w-4" />
                 <span>{area}</span>
               </div>
               <div className="flex items-center gap-3 mt-2">
                 <div className="flex items-center gap-1">
                   <Star className="h-4 w-4 fill-secondary text-secondary" />
                   <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                   <span className="text-xs text-muted-foreground">({totalReviews})</span>
                 </div>
                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
                   <Clock className="h-4 w-4" />
                   <span>~{prepTimeAvg} د</span>
                 </div>
               </div>
             </div>
             {availableNow && (
               <Badge className="bg-primary/10 text-primary border-primary/20">
                 متاح الآن
               </Badge>
             )}
           </div>
         </CardContent>
       </Card>
     </Link>
   );
 }