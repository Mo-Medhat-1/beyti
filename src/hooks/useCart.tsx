 import { create } from "zustand";
 import { persist } from "zustand/middleware";
 
 export interface CartItem {
   mealId: string;
   title: string;
   price: number;
   qty: number;
   photoUrl?: string;
   chefId: string;
   chefName: string;
 }
 
 interface CartState {
   items: CartItem[];
   chefId: string | null;
   addItem: (item: Omit<CartItem, "qty">) => void;
   removeItem: (mealId: string) => void;
   updateQty: (mealId: string, qty: number) => void;
   clearCart: () => void;
   getTotal: () => number;
   getSubtotal: () => number;
 }
 
 export const useCart = create<CartState>()(
   persist(
     (set, get) => ({
       items: [],
       chefId: null,
       
       addItem: (item) => {
         const { items, chefId } = get();
         
         // Single chef cart - clear if different chef
         if (chefId && chefId !== item.chefId) {
           set({ items: [{ ...item, qty: 1 }], chefId: item.chefId });
           return;
         }
         
         const existingItem = items.find((i) => i.mealId === item.mealId);
         
         if (existingItem) {
           set({
             items: items.map((i) =>
               i.mealId === item.mealId ? { ...i, qty: i.qty + 1 } : i
             )
           });
         } else {
           set({
             items: [...items, { ...item, qty: 1 }],
             chefId: item.chefId
           });
         }
       },
       
       removeItem: (mealId) => {
         const { items } = get();
         const newItems = items.filter((i) => i.mealId !== mealId);
         set({
           items: newItems,
           chefId: newItems.length > 0 ? get().chefId : null
         });
       },
       
       updateQty: (mealId, qty) => {
         if (qty <= 0) {
           get().removeItem(mealId);
           return;
         }
         
         set({
           items: get().items.map((i) =>
             i.mealId === mealId ? { ...i, qty } : i
           )
         });
       },
       
       clearCart: () => set({ items: [], chefId: null }),
       
       getSubtotal: () => {
         return get().items.reduce((sum, item) => sum + item.price * item.qty, 0);
       },
       
       getTotal: () => {
         return get().getSubtotal();
       }
     }),
     {
       name: "beyti-cart"
     }
   )
 );