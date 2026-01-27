import React, { useState } from "react";
import Logo from "../assets/logo/Logo.svg";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";

import { Menu, Search, User, X, ChevronDown, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { menuItems, cta } from "@/objects/Objects";
import { parentVariants, itemVariants } from "@/objects/Animations";
import { CartSheet } from "./Cart";

import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "@/store/slices/currencySlice";
import type { RootState } from "@/store/store";

// Mobile menu sheet
const MobileMenuSheet = () => {
  return (
    <div className="h-full">
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={20} className="text-muted" />
        </SheetTrigger>

        <SheetContent side="left" className="bg-card flex flex-col h-full py-4">
          {/* Header */}
          <div className="flex items-center justify-start py-6 px-2">
            <SheetClose>
              <X size={24} className="text-muted hover:text-main" />
            </SheetClose>
          </div>

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
                  item.children && <DownMenuCTA key={item.title} item={item} />,
              )}

              {/* Accesing the item directly */}
              <Link to={cta[2].link}>
                <span className="flex items-center gap-2 text-muted hover:text-main text-menu uppercase">
                  <User size={20} />
                  {cta[2].title}
                </span>
              </Link>
            </motion.div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Currency selection component
const DownMenuCTA = ({ item }: { item: any }) => {
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
        <button className="flex gap-1 items-center text-menu uppercase text-muted hover:text-main uppercase">
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
              <motion.div variants={itemVariants}>
              <DropdownMenuItem
                key={child.code}
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

// Dropdown menu for MENU ITEM / S
const DownMenu = ({ item }: { item: any }) => {
  const [open, isOpen] = useState(false);
  return (
    //OnOpenChange Returns Boolean and flips the truthy value
    <DropdownMenu open={open} onOpenChange={isOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-menu text-muted hover:text-main uppercase">
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

// Search Bar Dropdown
const DownSearch = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <button className="hidden md:block text-muted uppercase text-menu hover:text-main outline-none">
            {title}
          </button>
          <Search size={24} className="md:hidden lg:hidden text-muted" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={20}
        className="w-screen rounded-none border-x-0 border-b border-t-0 bg-card py-8 mt-1"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="flex flex-row items-center justify-between px-6 md:px-12"
        >
          <div className="flex items-center gap-4 flex-1">
            <Search className="text-muted shrink-0" size={20} />
            <Input
              autoFocus
              className=" text-h3 uppercase placeholder:text-muted/50 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full p-0 h-auto"
              placeholder="Search here"
            />
          </div>
          {/* Close Button */}
          <button onClick={() => setOpen(false)} className="ml-8 shrink-0">
            <X
              size={20}
              className="text-muted hover:text-main transition-colors"
            />
          </button>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function NavigationBar() {
  return (
    <div className="fixed w-full z-50">
      <div className="grid grid-cols-3 items-center h-20 bg-background border px-4 md:px-14">
        {/* Logo Component */}
        <div className="hidden md:flex justify-start">
          <Link to="/">
            <img src={Logo} alt="Zylo" className="h-20 w-auto hover:opacity-80" />
          </Link>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex justify-center items-center font-body text-menu text-muted gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="uppercase hover:text-main transition-colors duration-400 ease-in-out"
            >
              {item.title === "Shop" ? (
                <DownMenu key={item.title} item={item} />
              ) : (
                item.title
              )}
            </Link>
          ))}
        </div>

        {/* CTA Items */}
        <div className="hidden md:flex justify-end items-center font-body text-menu text-muted gap-8">
          {cta.map((item) => {
            // 1. Handle "Cart"
            if (item.title === "Cart") {
              return <CartSheet key="cart-sheet" />;
            }

            // 2. Handle Search
            if (item.title === "Search") {
              return <DownSearch key="search-cta" title={item.title} />;
            }

            // 3. Currency Selction Dropdowm
            if (item.children) {
              return <DownMenuCTA key={item.title} item={item} />;
            }

            // 4. Handle Plain Text Links
            return (
              <span
                key={item.title}
                className="uppercase cursor-pointer hover:text-main transition-colors duration-400 ease-in-out"
              >
                {item.title}
              </span>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden lg:hidden col-span-3 grid grid-cols-3 items-center w-full">
          {/* Left - Menu Button */}
          <div className="flex justify-start">
            <MobileMenuSheet />
          </div>
          {/* Center - Logo */}
          <div className="flex justify-center">
            <Link to="/">
              <img src={Logo} alt="Zylo" className="h-20 w-auto hover:opacity-80 " />
            </Link>
          </div>

          {/* Right - Search & Cart */}
          <div className="flex justify-end items-center gap-6">
            <DownSearch title={""} />
            <div className="h-full">
              <CartSheet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutNav() {
  return (
    <div className="fixed w-full z-50 sticky top-0">
      <div className="grid grid-cols-3 items-center h-24 bg-background border px-4 md:px-14">
        {/* Left empty side */}
        <div className="flex justify-center" />

        {/* Center Logo */}
        <div className="flex justify-center">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <img src={Logo} alt="Zylo" className="h-24 w-auto" />
          </Link>
        </div>
        {/* Shopping cart */}
        <div className="flex justify-end md:justify-center lg:justify-center items-center">
          <Link to="/cart">
            <div className="w-14 h-14 bg-neutral-100 hover:bg-neutral-300 rounded-full flex items-center justify-center ">
              <ShoppingCart size={20} className="text-main/70" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
