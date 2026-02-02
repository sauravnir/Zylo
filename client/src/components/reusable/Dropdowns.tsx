import { useState } from "react";
import { DropdownMenu , DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "@/store/slices/currencySlice";
import {motion} from "motion/react"
import { ChevronDown, Menu, User, X } from "lucide-react";
import { itemVariants, parentVariants } from "@/objects/Animations";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cta, menuItems } from "@/objects/Objects";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

// Dropdown for currency selection
export const DownCurrencyMenu = ({ item }: { item: any }) => {
  const [open, isOpen] = useState(false);

  // Handling the currency from the redux store.
  const { activeCurrency, symbol } = useSelector(
    (state: RootState) => state.currency,
  );
  const dispatch = useDispatch();
  const handleCurrencySelection = (child: any) => {
    dispatch(
      setCurrency({
        title: child.title,
        code: child.code,
        symbol: child.symbol,
      }),
    );
    isOpen(false);
  };
  return (
    //OnOpenChange Returns Boolean and flips the truthy value
    <DropdownMenu open={open} onOpenChange={isOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-1 items-center text-product-title text-muted hover:text-main uppercase">
          <span>{activeCurrency}</span>
          <span>({symbol})</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown size={14} />
          </motion.span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-auto mt-6 p-2 border bg-card max-h-[350px] md:max-h-[250px]"
        align="end"
      >
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          <DropdownMenuLabel className="text-tiny text-muted/60 font-normal uppercase">
            {item.title}
          </DropdownMenuLabel>

          {item.children.map((child: any) => {
            const isActive = activeCurrency === child.code;
            return (
              <motion.div  key={child.code} variants={itemVariants}>
              <DropdownMenuItem
               
                onClick={() => handleCurrencySelection(child)}
                className={`flex text-muted hover:text-main items-center gap-1 mt-1 cursor-pointer active:text-main
                   ${isActive ? "text-main font-medium" :""}
                  `}
              >
                {isActive && <div className="h-1 w-1 rounded-full bg-main mr-1"/>}
                <span className="text-menu font-body">{child.title}</span>
                <span className="text-menu uppercase">
                  ({child.code} {child.symbol})
                </span>
                
              </DropdownMenuItem>
            </motion.div>
            )
          })}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Mobile Sheet Component
export const MobileMenuSheet = () => {
  return (
    <div className="h-full">
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={20} className="text-muted" />
        </SheetTrigger>

        <SheetContent side="left" className="bg-card flex flex-col h-full py-4">
          {/* Header */}
          <SheetTitle>
            <div className="flex items-center justify-start py-6 px-2">
            <SheetClose>
              <X size={24} className="text-muted hover:text-main" />
            </SheetClose>
          </div>
          </SheetTitle>
          
          {/* Menu  */}
          <motion.div
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col gap-6 mt-14 px-4"
          >
            {/* Mapping the menu items */}
            {menuItems.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <Link to={item.link}>
                  <span className="text-muted hover:text-main text-menu uppercase">
                    {item.title === "Shop" ? (
                      <DownMenu key={item.title} item={item} />
                    ) : (
                      item.title
                    )}
                  </span>
                </Link>
                <Separator className="mt-4" />
              </motion.div>
            ))}
          </motion.div>

          {/* Footer*/}
          <SheetFooter>
            <motion.div className="flex flex-row justify-between  py-4 px-4 ">
              {/* Mapping through the CTA object and rendering Pricing Menu Component */}
              {cta.map(
                (item: any) =>
                  item.children && <DownCurrencyMenu key={item.title} item={item} />,
              )}

              {/* Accesing the item directly */}
              <Link to={cta[2].link}>
                <span className="flex items-center gap-2 text-muted hover:text-main text-menu uppercase">
                  <User size={20} />
                  Login
                </span>
              </Link>
            </motion.div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Dropdown menu for MENU ITEM / S
export const DownMenu = ({ item }: { item: any }) => {
  const [open, isOpen] = useState(false);
  return (
    //OnOpenChange Returns Boolean and flips the truthy value
    <DropdownMenu open={open} onOpenChange={isOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-product-title text-muted hover:text-main uppercase">
          {item.title}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown size={14} />
          </motion.span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[200px] md:w-auto mt-6 p-2 py-4 border bg-card h-auto overflow-y-hidden"
        align="start"
      >
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          <DropdownMenuLabel className="text-tiny text-muted/60 font-normal uppercase">
            {item.title}
          </DropdownMenuLabel>

          {item.children.map((child: any) => (
            <motion.div variants={itemVariants}>
              <DropdownMenuItem
                key={child.title}
                className="flex text-muted hover:text-main items-center gap-1 mt-1 cursor-pointer"
              >
                <Link to={child.link}>
                  <span className="text-menu font-body">{child.title}</span>
                </Link>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};