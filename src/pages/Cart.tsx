import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Plus,
  Minus,
  MapPin,
  Clock,
  CreditCard,
  Truck,
  ChevronLeft,
  X,
} from "lucide-react";

const initialCartItems = [
  {
    id: "1",
    name: "كشري مصري أصلي",
    chef: "أم أحمد",
    chefId: "1",
    price: 45,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=150&fit=crop",
  },
  {
    id: "4",
    name: "ملوخية بالأرانب",
    chef: "أم أحمد",
    chefId: "1",
    price: 120,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=150&fit=crop",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "pickup">("delivery");
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryOption === "delivery" ? 25 : 0;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container section-padding text-center">
          <div className="max-w-md mx-auto">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-2xl font-bold text-primary mb-4">سلتك فارغة</h1>
            <p className="text-muted-foreground mb-8">
              لم تضف أي أطباق بعد. استكشف الأطباق اللذيذة وأضفها لسلتك.
            </p>
            <Link to="/explore">
              <Button className="btn-hero">استكشف الأطباق</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container section-padding">
        <h1 className="text-2xl font-bold text-primary mb-8">سلة التسوق</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Chef Group */}
            <div className="bg-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <Link
                  to={`/chef/${cartItems[0].chefId}`}
                  className="font-semibold text-foreground hover:text-secondary"
                >
                  🍳 {cartItems[0].chef}
                </Link>
                <span className="text-sm text-muted-foreground">
                  {cartItems.length} عناصر
                </span>
              </div>

              <div className="divide-y divide-border">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/meal/${item.id}`}
                          className="font-medium text-foreground hover:text-secondary"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="text-secondary font-bold mt-1">
                        {item.price} ج.م
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="font-bold text-foreground">
                          {item.price * item.quantity} ج.م
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-card rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">طريقة الاستلام</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    deliveryOption === "delivery"
                      ? "border-secondary bg-secondary/5"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryOption === "delivery"}
                    onChange={() => setDeliveryOption("delivery")}
                    className="sr-only"
                  />
                  <Truck className="h-6 w-6 text-secondary" />
                  <div>
                    <div className="font-medium">توصيل للمنزل</div>
                    <div className="text-sm text-muted-foreground">30-45 دقيقة • 25 ج.م</div>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    deliveryOption === "pickup"
                      ? "border-secondary bg-secondary/5"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryOption === "pickup"}
                    onChange={() => setDeliveryOption("pickup")}
                    className="sr-only"
                  />
                  <MapPin className="h-6 w-6 text-secondary" />
                  <div>
                    <div className="font-medium">استلام شخصي</div>
                    <div className="text-sm text-muted-foreground">20-30 دقيقة • مجاني</div>
                  </div>
                </label>
              </div>

              {deliveryOption === "delivery" && (
                <div className="mt-4 p-4 rounded-xl bg-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">المعادي، القاهرة</div>
                        <div className="text-sm text-muted-foreground">شارع 9، عمارة 15</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">تغيير</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 sticky top-24">
              <h3 className="font-semibold text-foreground mb-6">ملخص الطلب</h3>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="كود الخصم"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="input-beyti flex-1 py-2"
                />
                <Button variant="outline">تطبيق</Button>
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span className="font-medium">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التوصيل</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? "مجاني" : `${deliveryFee} ج.م`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>الخصم</span>
                    <span>-{discount} ج.م</span>
                  </div>
                )}
                <div className="pt-3 border-t border-border flex justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-secondary">{total} ج.م</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button className="btn-hero w-full mt-6">
                <CreditCard className="h-5 w-5" />
                إتمام الطلب
              </Button>

              {/* Payment Methods */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground mb-3">طرق الدفع المتاحة</p>
                <div className="flex justify-center gap-4">
                  <div className="px-3 py-1 rounded bg-background text-xs">💳 بطاقة</div>
                  <div className="px-3 py-1 rounded bg-background text-xs">💵 كاش</div>
                  <div className="px-3 py-1 rounded bg-background text-xs">📱 محفظة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
