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
import { ShoppingCart, X, Minus, Plus } from "lucide-react";

// Importing the redux components

import type { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/store/slices/cartSlice";

export const CartSheet = () => {

  const dispatch = useDispatch() 
  const storeValue = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  // Handling the Quantity selection
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Badge
          badgeContent={totalItems}
          showZero
          // Customizing the badge
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#ededed",
              color: "#575757",
              fontSize: "12px",
              minWidth: "20px",
              height: "20px",
            },
          }}
          className="p-2 cursor-pointer transition-all duration-300 hover:opacity-70"
        >
          {/* Mobile Icon */}
          <ShoppingCart size={16} className="text-muted sm:hidden " />
          {/* Desktop Text */}
          <span className="hidden sm:block text-muted uppercase text-menu tracking-widest">
            Cart
          </span>
        </Badge>
      </SheetTrigger>
      <SheetContent className="py-8 bg-card" side="right">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="text-base text-muted uppercase font-medium">
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

        <SheetDescription className="h-full">
          <div className="mt-8 flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
            {storeValue.length > 0 ? (
              storeValue.map((item) => (
                <div
                  key={`${item.slug}-${item.productSize}`}
                  className="flex flex-row gap-4 border-b border-gray-100 pb-6"
                >
                  {/* 1. Image Thumbnail */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-secondary">
                    <img
                      src={item.primaryImage}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* 2. Item Details */}
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between text-sm">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-medium text-main uppercase tracking-tight leading-none">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted font-light uppercase tracking-widest">
                          Size: {item.productSize}
                        </p>
                      </div>
                      <p className="font-medium text-main">${item.price}</p>
                    </div>

                    {/* 3. Footer: Qty and Remove Action */}
                    <div className="flex items-end justify-between text-xs uppercase tracking-tighter">
                      <p className="text-muted border px-2 py-1 rounded-sm">
                        Qty: {item.quantity}
                      </p>

                      <button
                        onClick={() =>
                          dispatch(removeItem({slug : item.slug }))
                        }
                        className="text-muted hover:text-red-500 transition-colors underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-[50vh] flex-col items-center justify-center space-y-2">
                <span className="font-body text-muted text-menu uppercase tracking-widest">
                  Your cart is empty
                </span>
              </div>
            )}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
