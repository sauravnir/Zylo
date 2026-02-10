import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckoutNav } from "@/components/reusable/Navigation";
import type { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "@/components/reusable/CheckoutForm";
import { TicketPercent, InfoIcon } from "lucide-react";
import { CartItem } from "@/components/reusable/Cart";
import { Price } from "@/components/reusable/Price";
import { subTotalAmount, totalCheckoutAmount } from "@/store/slices/cartSlice";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setCurrency } from "@/store/slices/currencySlice";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/reusable/ButtonComponent";

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalItems = useAppSelector(
    (state: RootState) => state.cart.totalItems,
  );
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { symbol, activeCurrency } = useAppSelector(
    (state: RootState) => state.currency,
  );
  const shippingCost =
    useAppSelector((state: RootState) => state.cart.shippingCost) ?? 0;
  const checkoutAmount = useAppSelector(totalCheckoutAmount);
  const navigate = useNavigate();
  const subTotal = useAppSelector(subTotalAmount);

  const dispatch = useAppDispatch();

  // Automatically switching the global currency to Base NPR for checkout processess
  useEffect(() => {
    if (activeCurrency !== "NPR") {
      dispatch(
        setCurrency({
          title: "Nepal",
          code: "NPR",
          symbol: "Rs",
        }),
      );
    }
  }, []);

  //   If there are no cart items and if the isSubmitting state is not true then the user cannot navigate to the page
  useEffect(() => {
    if (totalItems < 1 && !isSubmitting) {
      navigate("/cart");
    }
  }, [totalItems, navigate, isSubmitting]);
  if (totalItems === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <CheckoutNav />
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-8 py-12 md:py-8 border-l border-r border-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 ">
          {/* Checkout Form  */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-10 p-4 border-r border-main ">
            <CheckoutForm
              symbol={symbol}
              shippingAmount={shippingCost}
              totalAmount={checkoutAmount}
              subTotal={subTotal}
              onStartSubmitting={() => setIsSubmitting(true)}
            />
            {/* Bottom Links */}
            <div className="border-t border-main border-1 flex flex-row items-center justify-center gap-4 p-2 underline pt-4">
              <Link
                to="/shipping"
                className="text-tiny uppercase text-main/80 hover:text-muted transition-colors duration-300"
              >
                Shipping
              </Link>
              <Link
                to="/returns"
                className="text-tiny uppercase text-main/80 hover:text-muted transition-colors duration-300"
              >
                Returns
              </Link>
              <Link
                to="/policy"
                className="text-tiny uppercase text-main/80 hover:text-muted transition-colors duration-300"
              >
                Policy
              </Link>
              <Link
                to="/terms"
                className="text-tiny uppercase text-main/80 hover:text-muted transition-colors duration-300"
              >
                Terms
              </Link>
            </div>
          </div>

          <aside className="order-1 lg:order-1 lg:col-span-5">
            <div className="sticky top-2 space-y-4">
              <div className="flex items-center justify-between px-0 p-4 border-b border-main rounded-none">
                <h2 className="text-base font-bold uppercase tracking-widest">
                  Order Summary ({totalItems})
                </h2>
                <Link
                  to="/cart"
                  className="group rounded-full p- transition-all duration-300"
                >
                  {/* <Pencil className="group-hover:scale-90 text-white transition-all duration-300" size={16} /> */}
                  <span className="underline text-main font-semibold text-button uppercase hover:text-muted">
                    Edit
                  </span>
                </Link>
              </div>

              <div className="max-h-[350px] overflow-y-auto pr-4  ">
                {cartItems.length > 0 &&
                  cartItems.map((items: any) => (
                    <CartItem key={items.id} item={items} isReadOnly={true} />
                  ))}
              </div>

              {/* Coupon Button */}
              <div className="flex flex-row items-center gap-4 ">
                <div className="relative flex-1 shadow">
                  <TicketPercent
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                    size={16}
                  />
                  <Input
                  disabled={true}
                    placeholder="Discount code or gift card"
                    className="pl-10 rounded-none border-muted/30 focus-visible:ring-main font-mono placeholder:font-bold placeholder:tracking-tight text-sm h-11"
                  />
                </div>

                <div className="w-1/3 ">
                  <PrimaryButton
                    name="Apply"
                    isDisabled={true}
                    onClick={() => {}}
                  />
                </div>
              </div>
              {/* Trust Badges or Help Section */}
              <div className="flex flex-col space-y-2 px-4 py-4 border border-dashed border-main bg-muted/10 text-center">
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

              <div className="bg-yellow-100/20 p-3 rounded-md mt-4 border-2 border-main shadow-lg">
                <div className="flex gap-2 items-start">
                  <InfoIcon className="w-4 h-4 shrink-0" />
                  <p className="text-sm text-main leading-snug">
                    <strong>Currency Note:</strong> We are currently only
                    accepting payments in
                    <strong> NPR (Rs.)</strong>. The total has been converted
                    automatically to ensure smooth local payment processing.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
