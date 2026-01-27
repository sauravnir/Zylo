import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Footer } from "@/reusable/Footer";
import {NavigationBar} from "@/reusable/Navigation";
import { CartItem } from "@/reusable/Cart";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { ShoppingCart } from "lucide-react";
import { PrimaryButton } from "@/reusable/ButtonComponent";
import { Price } from "@/reusable/Price";
import { totalCheckoutAmount } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import {setIsUploading, addNote, clearCart } from "@/store/slices/cartSlice";
import { CircularProgress } from "@mui/material";

export default function CartPage() {
  const storeValue = useSelector((state: RootState) => state.cart.items);
  const checkoutAmount = useSelector(totalCheckoutAmount);
  const totalItem = useSelector((state: RootState) => state.cart.totalItems);
  const globalNote = useSelector((state: RootState) => state.cart.orderNote);
  
  const dispatch = useDispatch();
  // Handling the OPEN NOTE inside the CART
  const [localNote, setLocalNote] = useState(globalNote);
  const [noteCart, setNoteCart] = useState(false);

  //   Saving the note automatically
  useEffect(() => {
    if (!noteCart && localNote !== undefined) {
      dispatch(addNote({ note: localNote }));
      setNoteCart(false);
    }
  }, [noteCart]);
  // Clear cart functionality
  const [cleared, setCleared] = useState(false);
  const handleClearCart = async () => {
    setCleared(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    dispatch(clearCart());
    setCleared(false);
  };

  const navigate = useNavigate();
//   Handling checkout functionality
const handleCheckout = async () => {
    dispatch(setIsUploading(true));
    await new Promise((resolve)=>setTimeout(resolve , 800));
    dispatch(setIsUploading(false));
    navigate('/checkout');
}

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      {/* Main Body Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-20 py-32 md:py-40">
        <h1 className="text-center text-h3 text-main uppercase font-medium tracking-widest mb-12 pb-6">
          {totalItem > 0 && `CART (${totalItem})`}
        </h1>
        {storeValue.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 flex flex-col gap-2">
              {storeValue.map((item) => (
                <CartItem
                  key={`${item.slug}-${item.productSize}`}
                  item={item}
                  isReadOnly={false}
                />
              ))}
              {/* Clear Cart Button */}
              <div className="flex items-end justify-end">
                 <button
                onClick={handleClearCart}
                disabled={cleared}
                className={`flex items-center flex gap-2 text-menu tracking-wide underline underline-offset-4 transition-all ${
                  cleared
                    ? "text-muted/50 cursor-not-allowed"
                    : "text-muted hover:text-main"
                }`}
              >
                {cleared && (
                    <CircularProgress size={16} thickness={5} sx={{ color: "inherit" }} />
                )}
                <span >{cleared ? "Clearing the cart..." : "Clear Cart"}</span>
              </button>
              </div>
              
            </div>

            {/* Right Side  */}
            <aside className="lg:col-span-5 bg-muted/10 p-8 sticky top-32">
              <h2 className="text-menu uppercase tracking-widest text-main mb-8 font-bold">
                Order Summary
              </h2>

              <div className="space-y-2 border-b border-gray-100 pb-0 mb-6">
                <div className="flex justify-between items-center border-black/5 ">
                  <span className="font-medium text-main/45 text-product-title uppercase">
                    Subtotal
                  </span>
                  <span className="font-medium text-main/45 text-product-title">
                    <Price amount={checkoutAmount} />
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "backIn" }}
                  className="mt-2 relative"
                >
                  <div className="flex flex-col gap-4">
                    <AnimatePresence>
                      {noteCart && (
                        <motion.div
                          layout
                          initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            marginBottom: 10,
                          }}
                          exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                          transition={{
                            height: {
                              duration: 0.4,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            },
                            opacity: { duration: 0.25, delay: 0.1 },
                          }}
                          className="overflow-hidden flex flex-col gap-3"
                        >
                          <textarea
                            autoFocus
                            value={localNote}
                            onChange={(e) => setLocalNote(e.target.value)}
                            placeholder="How can we help you ?"
                            className="w-full bg-transparent p-3 text-muted text-sm outline-none resize-none border border-muted/30 rounded-sm h-24 focus:border-main transition-colors duration-300"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <button
                  className="flex w-full border-b pb-4"
                  onClick={() => setNoteCart(!noteCart)}
                >
                  <span className="font-medium text-product-title  tracking-normal text-main/75 hover:text-main/50 hover:underline underline-offset-4 transition-colors duration-300">
                    {noteCart ? "Close order note" : "Add order note"}
                  </span>
                </button>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-main uppercase font-bold tracking-widest">
                  Total
                </span>
                <span className="text-main uppercase tracking-wide font-semibold">
                  <Price amount={checkoutAmount} />
                </span>
              </div>

              <PrimaryButton
                isDisabled={false}
                name="Proceed to Checkout"
                onClick={handleCheckout}
              />
              <div className="flex flex-row items-center justify-center pt-4">
                <span className="text-main/45 text-menu text-center underline leading-tight tracking-normal">
                  Taxes and shipping calculated at checkout
                </span>
              </div>
            </aside>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={32} className="text-main/40" />
            </div>
            <h3 className="text-main text-menu uppercase mb-6">
              Your cart is empty
            </h3>
            <Link to="/">
              <Button
                variant="ghost"
                className="rounded-none text-main text-button underline underline-offset-4"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
