import React, { useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css'
import HomePage from './pages/Home';


function App() {
  return (
    <>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </HashRouter>
      
    </>
  );
}


export default App
