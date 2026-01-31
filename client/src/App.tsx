import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/Home";
import { ProductPage } from "./pages/Products";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { CustomLoader } from "./reusable/CustomLoader";
import { type AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import { fetchLiveRates } from "./store/slices/currencySlice";
import { OrderConfirmation } from "./pages/orderSuccess";
import { Toaster } from "sonner";
import { SearchPage } from "./pages/SearchPage";
import Collections from "./pages/Collections";
import { Error404 } from "./pages/404Error";
import { Shipping } from "./pages/Shipping";
import { Returns } from "./pages/Return";
// Scrolling the page on top while new page navigate
const ScrolltoTop = () => {
  const location = useLocation();
 
  useEffect(() => {
    const element = document.documentElement || document.body;
    element.scrollTop = 0;
  }, [location]);

  return null;
};

function App() {
  // Handling the Custom loader. Applying only display once logic
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("zylo-loaded");
    }
    return false;
  });

  const handleLoaderFinish = () => {
    sessionStorage.setItem("zylo-loaded", "true");
    setShowLoader(false);
  };

  // Setting up dispatch function from the store
  const dispatch = useDispatch<AppDispatch>();
  // Fetching the currencies when page load
  useEffect(() => {
    dispatch(fetchLiveRates());
  }, [dispatch]);
  return (
    <>
      {showLoader && <CustomLoader onFinish={handleLoaderFinish} />}
      <Toaster richColors position="top-center"/>
      <HashRouter >
        <ScrolltoTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<OrderConfirmation />} />
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/collections/:category" element={<Collections />}/>
          <Route path="/shipping" element={<Shipping />}/>
          <Route path="/returns" element={<Returns />}/>
          {/* Catching all the unknown urls and navigating to 404Error page */}
         <Route path="*" element={<Error404 />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
