import { Footer } from "@/components/reusable/Footer";
import { NavigationBar } from "@/components/reusable/Navigation";
import { Link } from "react-router-dom";

export function Error404() {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="w-full flex flex-col items-center justify-center py-72 bg-background px-4">
      <h1 className="text-main text-display-spaced uppercase font-bold tracking-widest">404</h1>
      <p className="text-main/80 text-paragraph tracking-normal uppercase mt-2">
        The page you are looking for does not exist.
      </p>
      <Link 
        to="/collections/shop-all" 
        className=" mt-6 text-base tracking-wide uppercase font-bold border-b-2 border-main pb-1 hover:text-muted transition-all"
      >
        Continue Shopping
      </Link>
    </div>
    <Footer />
    </div>
  );
}