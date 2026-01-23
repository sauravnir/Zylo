import React, { useState , useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import './index.css'
import HomePage from './pages/Home';
import { ProductPage } from './pages/Products';

// Scrolling the page on top while new page navigate

const ScrolltoTop = () =>{
  const location = useLocation();

  useEffect(()=>{
    const element = document.documentElement || document.body;
    element.scrollTop = 0;
  },[location])

  return null;
}

function App() {
  return (
    <>
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
