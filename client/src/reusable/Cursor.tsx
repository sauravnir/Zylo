import { motion } from "motion/react";
import {Plus} from "lucide-react"

interface CursorProps {
  x: number;
  y: number;
}
export const Cursor = ({ x, y }: CursorProps) => {
  return (
    <motion.div
      className="hidden md:flex lg:flex fixed top-0 left-0 pointer-events-none z-[100] items-center justify-center bg-white text-black rounded-full w-8 h-8 shadow-lg"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
       initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          x: x, 
          y: y, 
          scale: 1, 
          opacity: 1 
        }}
      exit={{ scale: 0, opacity: 0 }}
       transition={{ type: "spring", stiffness: 1500, damping: 50, mass: 0.1 }}
    >
    <Plus size={20}/>
    </motion.div>
  );
};
