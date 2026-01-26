import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckoutNav } from "@/reusable/Navigation";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "@/reusable/CheckoutForm";
import { Pencil } from "lucide-react";
import { CartItem } from "@/reusable/Cart";
import { Price } from "@/reusable/Price";
import { totalCheckoutAmount } from "@/store/slices/cartSlice";
export default function CheckoutPage() {
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const checkoutAmount = useSelector(totalCheckoutAmount);
  const navigate = useNavigate();
  //   If there is not cart items then the user cannot navigate to the page
  useEffect(() => {
    if (totalItems < 1) {
      navigate("/cart");
    }
  }, [totalItems, navigate]);
  if (totalItems === 0) return null;

  return (
    <div className="min-h-screen bg-muted/5">
      <CheckoutNav />
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-8 py-12 md:py-8 border-l border-r ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 ">
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-10 p-4 border-r ">
            <CheckoutForm />
          </div>
          <aside className="order-1 lg:order-1 lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="flex items-center justify-between px-0 p-4 border-b rounded-none">
                <h2 className="text-base font-bold uppercase tracking-widest">
                  Order Summary ({totalItems})
                </h2>
                <Link to="/cart" className="group">
                  <Pencil className="group-hover:scale-90" size={18} />
                </Link>
              </div>

              <div className="max-h-[350px] overflow-y-auto pr-4 scrollbar-thin ">
                {cartItems.length > 0 &&
                  cartItems.map((items) => (
                    <CartItem item={items} isReadOnly={true} />
                  ))}
              </div>
              {/* Trust Badges or Help Section */}
              <div className="flex flex-col space-y-2 px-4 py-4 border border-dashed border-muted bg-muted/10 text-center">
                <div className="flex justify-between items-center border-black/5 ">
                  <span className="font-medium text-main/45 text-product-title uppercase">
                    Subtotal
                  </span>
                  <span className="font-medium text-main/45 text-product-title">
                    <Price amount={checkoutAmount} />
                  </span>
                </div>
                <div className="flex justify-between items-center border-black/5 ">
                  <span className="font-medium text-main/45 text-product-title uppercase">
                    Delivery Charge
                  </span>
                  <span className="font-medium text-main/45 text-product-title">
                    Free
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-main/50 border-t">
                  <span className="text-main uppercase font-bold tracking-widest">
                    Total
                  </span>
                  <span className="text-main uppercase tracking-wide font-semibold   pt-2">
                    <Price amount={checkoutAmount} />
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
