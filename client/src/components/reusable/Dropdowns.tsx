import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "@/store/slices/currencySlice";
import { motion } from "motion/react";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { itemVariants, parentVariants } from "@/objects/Animations";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cta, menuItems } from "@/objects/Objects";
import { Link, NavLink, useLocation } from "react-router-dom";


// Dropdown for currency selection
export const DownCurrencyMenu = ({ item }: { item: any }) => {
  const [open, isOpen] = useState(false);

  // Handling the currency from the redux store.
  const { activeCurrency, symbol } = useSelector(
    (state: RootState) => state.currency,
  );
  const dispatch = useDispatch();
  const location = useLocation()

  // Loading the currency from the LocalStorage if the user naviogates to other page except checkout
  useEffect(()=>{
    // Only working if the user is not in CheckoutPage
    if (location.pathname !== "/checkout"){
      const savedCurr = localStorage.getItem("original_price_details");
      if(savedCurr){
        const decoded = atob(savedCurr);
        const parsedData = JSON.parse(decodeURIComponent(decoded));
        dispatch(setCurrency({
          title: parsedData.title,
          code: parsedData.code , 
          symbol:parsedData.symbol
        }))
      }
      localStorage.removeItem("original_price_details")
    }
  },[location.pathname])

  // Handling the currency change when the user selects any currency
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

  // Creating the sorted list for the currency to prioritize the selected currency to the top of the dropdown
  const sortedCurr = [...item.children].sort((a,b)=>{
    if(a.code === activeCurrency) return -1;
    if(b.code === activeCurrency) return 1;
    return 0;
  })
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
        className="w-auto mt-6 p-2 border bg-background max-h-[350px] md:max-h-[250px]"
        align="end"
      >
        <motion.div initial="hidden" animate="visible">
          <DropdownMenuLabel className="text-tiny text-main font-bold uppercase">
            {item.title}
          </DropdownMenuLabel>

          {sortedCurr?.map((child: any) => {
            const isActive = activeCurrency === child.code;
            return (
              
                <DropdownMenuItem
                  key={child.code}
                  onClick={() => handleCurrencySelection(child)}
                  className={`flex text-muted hover:text-main items-center gap-1 mt-1 cursor-pointer active:text-main
                   ${isActive ? "text-main font-medium" : ""}
                  `}
                >
                  {isActive && (
                    <div className="h-1 w-1 rounded-full bg-main mr-1" />
                  )}
                  <span className="text-menu font-body">{child.title}</span>
                  <span className="text-menu uppercase">
                    ({child.code} {child.symbol})
                  </span>
                </DropdownMenuItem>
              
            );
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

        <SheetContent
          side="left"
          className="bg-background flex flex-col h-full py-4"
        >
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
              <motion.div key={item.title} variants={itemVariants} className="">
                <Link to={item.link} >
                  <span className="text-muted hover:text-main text-menu font-extrabold uppercase">
                    {item.title === "Shop" ? (
                      <DownMenu key={item.title} item={item} />
                    ) : (
                      item.title
                    )}
                  </span>
                </Link>
                {/* <Separator className="mt-4 bg-main" /> */}
              </motion.div>
            ))}
          </motion.div>

          {/* Footer*/}
          <SheetFooter>
            <motion.div className="flex flex-row justify-between  py-4 px-4 ">
              {/* Mapping through the CTA object and rendering Pricing Menu Component */}
              {cta.map(
                (item: any) =>
                  item.children && (
                    <DownCurrencyMenu key={item.title} item={item} />
                  ),
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

// Dropdown menu for MENU ITEM / S / Shop Dropdown
export const DownMenu = ({ item }: { item: any }) => {
  const [open, isOpen] = useState(false);
  return (
    //OnOpenChange Returns Boolean and flips the truthy value
    <DropdownMenu open={open} onOpenChange={isOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-product-title text-muted font-bold hover:text-main uppercase">
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
        className="w-[200px] md:w-auto mt-6 p-2 py-4 border  shadow-lg bg-background h-auto overflow-y-hidden"
        align="start"
      >
        
          <DropdownMenuLabel className="text-tiny text-main font-bold uppercase">
            {item.title}
          </DropdownMenuLabel>

          {item.children.map((child: any) => (
            <motion.div  key={child.title}>
              <DropdownMenuItem className="p-0">
                <NavLink
                  to={child.link}
                  className={({ isActive }) =>
                    `flex text-main hover:text-muted transition-colors duration-300 items-center gap-1 mt-1 cursor-pointer w-full p-2
           ${isActive ? "text-main font-bold" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="h-1 w-1 rounded-full bg-main" />
                      )}
                      <span className="text-menu font-body">{child.title}</span>
                    </>
                  )}
                </NavLink>
              </DropdownMenuItem>
            </motion.div>
          ))}
     
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
