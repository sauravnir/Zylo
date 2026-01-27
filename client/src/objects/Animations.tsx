// Creating List / Card entrace animations 
import type { Variants } from "motion/react";
export const parentVariants: Variants = {
  // For Parent Container
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // delay between items
      delayChildren: 0.3, // delay before first item
    },
  },
};

export const itemVariants: Variants = {
  //For Each Item
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};