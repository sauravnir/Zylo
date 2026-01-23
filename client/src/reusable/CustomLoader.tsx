import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export const CustomLoader = () => {
  const [loading, setLoading] = useState(100); // for text fill
  const [open, setOpen] = useState(true); // loader visibility

  // Animate the loader
  useEffect(() => {
    setTimeout(() => setLoading(70), 400);
    setTimeout(() => setLoading(40), 1400);
    setTimeout(() => setLoading(0), 2400);
  }, []);


  // Handle exit after loader finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false); 
    }, 4000); 

    return () => clearTimeout(timer);
  }, []); 

  // Render loader if open
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary pointer-events-none">
      <h1
        className="loader-font-class font-logo text-display tracking-wide font-bold p-2"
        style={{ backgroundPosition: `${loading}% 0%` }}
      >
        zylo
      </h1>
    </div>
  );
};
