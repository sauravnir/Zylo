import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckoutNav } from "@/reusable/Navigation";
import type { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "@/reusable/CheckoutForm";
import { Pencil } from "lucide-react";
import { CartItem } from "@/reusable/Cart";
import { Price } from "@/reusable/Price";
import { subTotalAmount, totalCheckoutAmount } from "@/store/slices/cartSlice";
import { useAppSelector } from "@/store/hook";

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalItems = useAppSelector((state: RootState) => state.cart.totalItems);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const {symbol} = useAppSelector((state:RootState)=> state.currency);
  const shippingCost = useAppSelector((state:RootState)=>state.cart.shippingCost) ?? 0;
  const checkoutAmount = useAppSelector(totalCheckoutAmount);
  const navigate = useNavigate();
  const subTotal = useAppSelector(subTotalAmount)

  //   If there are no cart items and if the isSubmitting state is not true then the user cannot navigate to the page
  useEffect(() => {
    if (totalItems < 1 && !isSubmitting) {
      navigate("/cart");
    }
  }, [totalItems, navigate , isSubmitting]);
  if (totalItems === 0) return null;

  return (
    <div className="min-h-screen bg-muted/5">
      <CheckoutNav />
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-8 py-12 md:py-8 border-l border-r ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 ">
          {/* Checkout Form  */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-10 p-4 border-r ">
            <CheckoutForm symbol={symbol} shippingAmount={shippingCost} totalAmount={checkoutAmount} subTotal={subTotal} onStartSubmitting={()=>setIsSubmitting(true)}/>
          </div>
          <aside className="order-1 lg:order-1 lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="flex items-center justify-between px-0 p-4 border-b rounded-none">
                <h2 className="text-base font-bold uppercase tracking-widest">
                  Order Summary ({totalItems})
                </h2>
                <Link to="/cart" className="group rounded-full  bg-main p-2 hover:scale-90">
                  <Pencil className="group-hover:scale-90 text-white" size={16} />
                </Link>
              </div>

              <div className="max-h-[350px] overflow-y-auto pr-4 scrollbar-thin ">
                {cartItems.length > 0 &&
                  cartItems.map((items) => (
                    <CartItem key={items.id} item={items} isReadOnly={true} />
                  ))}
              </div>
              {/* Trust Badges or Help Section */}
              <div className="flex flex-col space-y-2 px-4 py-4 border border-dashed border-muted bg-muted/10 text-center">
                <div className="flex justify-between items-center border-black/5 ">
                  <span className="font-medium text-main/45 text-product-title uppercase">
                    Subtotal
                  </span>
                  <span className="font-medium text-main/45 text-product-title">
                    <Price amount={subTotal} />
                  </span>
                </div>
                <div className="flex justify-between items-center border-black/5 ">
                  <span className="font-medium text-main/45 text-product-title uppercase">
                    Shipping & Handling
                  </span>
                  <span className="font-medium text-main/45 text-product-title">
                    <Price amount={shippingCost} />
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
