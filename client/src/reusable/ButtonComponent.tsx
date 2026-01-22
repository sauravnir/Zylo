import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface ScrollButtonProps {
  id: string;
  offset?: number;
}

export const LinkDown = ({ id, offset = 0 }: ScrollButtonProps) => {
  const scrollToSection = () => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <Button
      variant="outline"
      className="relative overflow-hidden rounded-full w-14 h-14 p-0 group border-muted "
      asChild
      onClick={scrollToSection}
    >
      <motion.button
        initial="rest"
        whileHover="hover"
        
        animate="rest"
        className=" flex items-center justify-center shadow-xl"
      >
        <ChevronDown
          strokeWidth={1.5}
          className="relative z-10 text-muted transition-colors duration-300 group-hover:text-white group-active:text-muted"
        />
        <motion.div
          variants={{
            rest: { y: "-100%" },
            hover: { y: "0%" },
            click:{y:"0%"}
          }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="absolute inset-0 bg-primary z-0 flex items-center justify-center"
        />
      </motion.button>
    </Button>
  );
};

