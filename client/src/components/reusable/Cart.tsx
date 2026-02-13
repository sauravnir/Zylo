import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@mui/material";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { PrimaryButton } from "./ButtonComponent";

import { useNavigate } from "react-router-dom";
// Importing the redux components

import type { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  setCartOpen,
  totalCheckoutAmount,
  addNote,
  updateQuantity,
  setIsUploading,
} from "@/store/slices/cartSlice";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Price } from "./Price";

// Overall Cart Sheet Drawer
export const CartSheet = () => {
  // Getting the cart url
  const location = useLocation();
  const isOnCartPage = location.pathname === "/cart";
  const dispatch = useDispatch();
  const storeValue = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const isCartOpen = useSelector((state: RootState) => state.cart.cartOpen);
  const checkoutAmount = useSelector(totalCheckoutAmount);
  const globalNote = useSelector((state: RootState) => state.cart.orderNote);
  const { rate, symbol  } = useSelector((state: RootState) => state.currency);


  // Handling the cart Open Logic : Opening the cart except the cartpage
  const handleCartOpen = (open: boolean) => {
    if ( isOnCartPage){
      dispatch(setCartOpen(false))
    } else {

      dispatch(setCartOpen(open));
    }
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

  // Handle the Checkout Clicking button. Set loading time and then navigate to the checkout page.
  const navigate = useNavigate();
  const handleCheckout = async () => {
    dispatch(setIsUploading(true));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(setIsUploading(false));
    dispatch(setCartOpen(false));
    setNoteCart(!noteCart);
    navigate("/checkout");
  };

  // Handling the Hydration Error. The server tries to render a blank cart but the client is finding items in LocalStorage which causes a data mismatch.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Sheet open={!isOnCartPage && isCartOpen} onOpenChange={handleCartOpen}>
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
            cursor: "pointer",
            "& .MuiBadge-badge": {
              backgroundColor: "#ededed",
              color: "#575757",
              fontSize: "12px",
              minWidth: "15px",
              height: "15px",
              transition: "all 0.3s ease",
              "@media (min-width: 640px)": {
                position: "relative",
                transform: "none",
                marginLeft: "6px",
              },
            },

            "&:hover .MuiBadge-badge": {
              backgroundColor: "#000",
              color: "#fff",
            },
          }}
          className="group transition-all duration-300"
        >
          <ShoppingCart
            size={24}
            className="text-muted sm:hidden transition-colors duration-300 group-hover:text-main"
          />

          <span className="hidden sm:block text-muted uppercase text-product-title tracking-widest leading-none transition-colors duration-300 group-hover:text-main">
            Cart
          </span>
        </Badge>
      </SheetTrigger>
      <SheetContent
        className="py-8 px-0 bg-background "
        side="right"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between px-4 ">
            <span className="flex text-base text-main gap-2 uppercase font-medium tracking-widest">
              Cart <span>({totalItems})</span>
            </span>
            <SheetClose className="flex items-center">
              <X size={20} className="text-muted hover:text-main" />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Separator className="w-full mt-6 shadow border-main" />

        <div className="h-full flex flex-col ">
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto pr-2 mx-auto gap-8 px-0 py-4 flex flex-col">
            {storeValue.length > 0 ? (
              storeValue.map((item:any , index) => (
                <CartItem key={`${item.id}-${index}`} item={item} isReadOnly={false} />
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-4">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart size={32} className="text-main/40" />
                </div>
                <h3 className="text-main text-menu uppercase mb-6">
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
              className="mt-auto pt-6 pb-8 px-8 z-20 shadow-lg  border-t border-main relative bg-muted/15 "
            >
              <div className="flex flex-col gap-4 pb-2">
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
                        value={localNote}
                        onChange={(e) => setLocalNote(e.target.value)}
                        placeholder="How can we help you?"
                        className="w-full bg-card p-3  text-main/70 placeholder:text-main/70 text-sm outline-none resize-none border border-main rounded-sm h-24 focus:border-main transition-colors duration-300"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  className="flex items-center justify-start w-44"
                  onClick={() => setNoteCart(!noteCart)}
                >
                  <span className="mb-4 flex items-center gap-2 font-medium uppercase underline underline-offset-4 text-product-title tracking-normal text-main/75 hover:text-main/50 transition-colors duration-300">
                    {noteCart ? "Close order note" : "Add order note"} <Plus size={18} className={`transition-transform duration-300 ease-in-out ${noteCart ? "rotate-45":"rotate-0"}`}/>
                  </span>
                </button>

                 {/* Subtotal Row */}
                <div className="flex justify-between items-center border-black/5 ">
                  <span className="font-medium text-main/75 text-product-title uppercase">
                    Subtotal
                  </span>
                  <span className="font-medium text-main/75 text-product-title">
                    {symbol} {convertedCheckout}
                  </span>
                </div>
                {/* Linking To Checkout Page */}

                <PrimaryButton
                  isDisabled={false}
                  name={`Checkout —  ${symbol} ${convertedCheckout}`}
                  onClick={handleCheckout}
                  type="button"
                />

                <span className="text-main/60 text-base text-center leading-tight tracking-tight underline">
                  Taxes and shipping calculated at checkout
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Individual cart Items
export const CartItem = ({
  item,
  isReadOnly,
}: {
  item: any;
  isReadOnly: boolean;
}) => {
  const dispatch = useDispatch();

  const [incDelay, setIncDelay] = useState(false);
  const [decDelay, setDecDelay] = useState(false);

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

  // Size increment function
  const handleIncrement = async () => {
    setIncDelay(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    dispatch(
      updateQuantity({ slug: item.slug, size: item.productSize, type: "add" }),
    );
    setIncDelay(false);
  };
  // Size decrement function
  const handleDecrement = async () => {
    setDecDelay(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    dispatch(
      updateQuantity({ slug: item.slug, size: item.productSize, type: "sub" }),
    );
    setDecDelay(false);
  };
  return (
    <div
      key={`${item.slug}-${item.productSize}`}
      className="flex flex-row gap-2 md:gap-14 border-b border-main py-8 first:pt-0 last:border-0"
    >
      <div className="relative aspect-[1/1] w-32 flex-shrink-0 overflow-hidden rounded-md bg-[#f9f9f9]">
        <img
          src={item.primaryImage}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Item remove button */}
        {isReadOnly === false && (
          <button
            onClick={() =>
              handleRemoveItem({ slug: item.slug, size: item.productSize })
            }
            disabled={removed}
            className={`absolute top-0 right-0 z-10 flex  items-center justify-center 
      w-6 h-6 rounded-full backdrop-blur-sm transition-all  ${
        removed
          ? " text-muted/50 cursor-not-allowed"
          : " text-main active:scale-90 hover:rotate-90 transition-transform duration-300"
      }`}
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center py-1">
        <div className="flex flex-col gap-1.5">
          {/* Title & Quantity Display */}
          <h3 className="text-main text-product-title tracking-wide uppercase font-semibold">
            {item.title}{" "}
            {isReadOnly && (
              <span className="font-bold">x {item.itemCartQuantity}</span>
            )}
          </h3>

          {/* Price */}
          <div className="text-sm tracking-wide font-medium text-neutral-700 mt-1">
            <Price amount={item.price} />
          </div>

          {/* Size */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-main font-medium">
              Size: <span className="text-neutral-600 font-bold underline">{item.productSize}</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-main font-medium">
              Color:{" "}
              <span className="text-neutral-600 font-bold underline">{item.productColor}</span>
            </span>
          </div>
        </div>

        {/* Conditinally rendering these items  */}
        {isReadOnly === false && (
          <div className="flex items-center gap-4 mt-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-main w-fit">
              <button
                onClick={handleDecrement}
                disabled={item.itemCartQuantity < 1 || decDelay}
                className={`w-8 h-8 flex items-center justify-center text-main ${item.itemCartQuantity == 1 && `cursor-not-allowed bg-muted/50 hover:bg-muted/50`} hover:text-white transition-all hover:bg-main border-r border-main`}
              >
                <Minus size={14} />
              </button>
              <div className="text-main w-10 flex items-center justify-center text-sm tabular-nums font-medium">
                {item.itemCartQuantity}
              </div>
              <button
                onClick={handleIncrement}
                disabled={incDelay}
                className="w-8 h-8 flex items-center justify-center text-main hover:text-white transition-all hover:bg-main border-l border-main "
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Remove Button for Desktop */}
            {/* <button
              onClick={() =>
                handleRemoveItem({ slug: item.slug, size: item.productSize })
              }
              disabled={removed}
              className={`hidden md:flex items-center gap-2 text-tiny tracking-wide underline underline-offset-4 transition-all ${
                removed
                  ? "text-muted/50 cursor-not-allowed"
                  : "text-muted hover:text-main"
              }`}
            >
              {removed && (
                <CircularProgress
                  size={12}
                  thickness={5}
                  sx={{ color: "inherit" }}
                />
              )}
              <span>{removed ? "Removing..." : "Remove"}</span>
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};
