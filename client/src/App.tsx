import React, { useState , useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import './index.css'
import HomePage from './pages/Home';
import { ProductPage } from './pages/Products';
import { CustomLoader } from './reusable/CustomLoader';
// Scrolling the page on top while new page navigate
const ScrolltoTop = () =>{
  const location = useLocation();

  useEffect(()=>{
    const element = document.documentElement || document.body;
    element.scrollTop = 0;
  },[location])

  return null;
}

// 

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

  return (
    <>
     {showLoader && <CustomLoader onFinish={handleLoaderFinish} />}
        <HashRouter>
          <ScrolltoTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:slug" element ={<ProductPage />} />
          </Routes>
        </HashRouter>
      
    </>
  );
}


export default App
