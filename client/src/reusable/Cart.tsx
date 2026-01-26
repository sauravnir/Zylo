import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@mui/material";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { PrimaryButton } from "./ButtonComponent";
import { CircularProgress } from "@mui/material";
// Importing the redux components

import type { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  setCartOpen,
  totalCheckoutAmount,
  addNote,
} from "@/store/slices/cartSlice";

import { motion, AnimatePresence } from "motion/react";

import { Price } from "./Price";

export const CartSheet = () => {
  const dispatch = useDispatch();
  const storeValue = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const isCartOpen = useSelector((state: RootState) => state.cart.cartOpen);
  const checkoutAmount = useSelector(totalCheckoutAmount);
  const globalNote = useSelector((state: RootState) => state.cart.orderNote);
  const { rate, symbol } = useSelector((state: RootState) => state.currency);
  // Handling the cart Open Logic
  const handleCartOpen = (open: boolean) => {
    dispatch(setCartOpen(open));
  };
  // Handling the OPEN NOTE inside the CART
  const [localNote, setLocalNote] = useState(globalNote);
  const [noteCart, setNoteCart] = useState(false);

  const handleOrderNote = () => {
    dispatch(addNote({ note: localNote }));
    setNoteCart(false);
  };
  // Saving the note automatically
  useEffect(() => {
    if (!noteCart && localNote !== undefined) {
      handleOrderNote();
    }
  }, [noteCart]);

  // Converting the checkout amount as per the currency selected

  const convertedCheckout = (checkoutAmount * rate).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Handling the async loading of the remove button
  const [removed, setRemoved] = useState(false);
  const handleRemoveItem = async ({
    slug,
    size,
  }: {
    slug: string;
    size: string;
  }) => {
    setRemoved(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(removeItem({ slug, size }));
    setRemoved(false);
  };

  // Handling the Hydration Error. The server tries to render a blank cart but the client is finding items in LocalStorage which causes a data mismatch.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet open={isCartOpen} onOpenChange={handleCartOpen}>
      <SheetTrigger asChild>
        <Badge
          badgeContent={totalItems}
          showZero
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            "& .MuiBadge-badge": {
              backgroundColor: "#ededed",
              color: "#575757",
              fontSize: "10px",
              minWidth: "18px",
              height: "18px",
              position: "absolute",
              "@media (min-width: 640px)": {
                position: "relative",
                transform: "none",
                top: "auto",
                right: "auto",
                marginLeft: "6px",
              },
            },
          }}
          className="p-2 cursor-pointer transition-all duration-300 hover:opacity-70"
        >
          {/* Mobile Icon */}
          <ShoppingCart size={24} className="text-muted sm:hidden" />

          {/* Desktop Text */}
          <span className="hidden sm:block text-muted uppercase text-menu tracking-widest leading-none">
            Cart
          </span>
        </Badge>
      </SheetTrigger>
      <SheetContent className="py-8 px-0 bg-card " side="right">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between px-4">
            <span className="text-base text-main uppercase font-medium tracking-widest">
              Cart
            </span>
            <SheetClose className="flex items-center">
              <button>
                <X size={20} className="text-muted hover:text-main" />
              </button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Separator className="w-full mt-6" />

        <SheetDescription className="h-full flex flex-col ">
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto pr-2 gap-6 px-8 py-4 flex flex-col">
            {storeValue.length > 0 ? (
              storeValue.map((item) => (
                <div
                  key={`${item.slug}-${item.productSize}`}
                  className="flex flex-row gap-6 border-b border-gray-100 pb-6"
                >
                  <div className="relative h-36 w-24 flex-shrink-0 overflow-hidden bg-[#f9f9f9]">
                    <img
                      src={item.primaryImage}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1 pr-8 md:pr-8">
                    <div className="flex justify-between ">
                      <div className="w=full flex flex-col gap-1 ">
                        <h3 className="text-main text-product-title uppercase font-medium">
                          {item.title}{" "}
                          <span className="text-muted font-bold lowercase">
                            {" "}
                            x {item.itemCartQuantity}
                          </span>
                        </h3>
                        <div className="mt-2 text-base tracking-widest font-medium text-muted ">
                          <Price amount={item.price} />
                        </div>
                        <span className="text-tiny font-medium text-muted">
                          Size: {item.productSize}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-start md:justify-end md:mt-2">
                      <button
                        onClick={() =>
                          handleRemoveItem({
                            slug: item.slug,
                            size: item.productSize,
                          })
                        }
                        disabled={removed}
                        className={`
      flex items-center gap-2 
      text-tiny tracking-wide underline underline-offset-4 transition-all duration-200
      ${
        removed
          ? "text-muted/50 cursor-not-allowed"
          : "text-muted hover:text-main cursor-pointer"
      }
    `}
                      >
                        {removed && (
                          <span className="animate-in fade-in zoom-in duration-300">
                            <CircularProgress
                              size={14}
                              thickness={5}
                              sx={{ color: "inherit" }} 
                            />
                          </span>
                        )}
                        <span>{removed ? "Removing..." : "Remove"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-4">
                <div className="w-16 h-16 bg-main/30 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart size={32} className="text-card" />
                </div>
                <h3 className="text-main text-menu uppercase">
                  Your cart is empty
                </h3>
              </div>
            )}
          </div>

          {/* The Checkout Action */}
          {storeValue.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "backIn" }}
              className="mt-auto pt-6 pb-8 px-8  border-t relative"
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
                        marginBottom: 16,
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
                        placeholder="How can we help you?"
                        className="w-full bg-card p-3 text-muted text-sm outline-none resize-none border border-muted/30 rounded-sm h-24 focus:border-main transition-colors duration-300"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  className="flex w-32"
                  onClick={() => setNoteCart(!noteCart)}
                >
                  <span className="mb-4 font-medium text-product-title tracking-normal text-main/75 hover:text-main/50 transition-colors duration-300">
                    {noteCart ? "Close note" : "Add order note"}
                  </span>
                </button>

                {/* Subtotal Row */}
                <div className="flex justify-between items-center border-black/5 ">
                  <span className="font-medium text-main/45 text-product-title uppercase">
                    Subtotal
                  </span>
                  <span className="font-medium text-main/45 text-product-title">
                    {symbol} {convertedCheckout}
                  </span>
                </div>

                <PrimaryButton
                  isDisabled={false}
                  name={`Checkout — ${symbol} ${convertedCheckout}`}
                  onClick={() => console.log("Proceeding to checkout...")}
                />

                <span className="text-main/45 text-xs text-center leading-tight tracking-normal">
                  Taxes and shipping calculated at checkout
                </span>
              </div>
            </motion.div>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
