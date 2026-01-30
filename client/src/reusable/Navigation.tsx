import Logo from "../assets/logo/Logo.svg";
import { Link } from "react-router-dom";
import {  ShoppingCart } from "lucide-react";
import { menuItems, cta } from "@/objects/Objects";
import { CartSheet } from "./Cart";
import { DownSearch } from "./SearchBar";
import {DownCurrencyMenu} from "./Dropdowns"
import { MobileMenuSheet } from "./Dropdowns";
import { DownMenu } from "./Dropdowns";

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
              return <DownCurrencyMenu key={item.title} item={item} />;
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

// Checkout page navigation bar 
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
