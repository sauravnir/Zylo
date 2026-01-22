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

interface PrimaryButtonProps {
    name: string , 
    isDisabled : boolean , 
    
}

export const PrimaryButton = ({name , isDisabled}:PrimaryButtonProps) => {
    return (
        <Button
            variant={"default"}
            className="relative overflow-hidden rounded-none p-0 group border border-primary w-full"
            asChild
            size={"lg"}
            disabled ={isDisabled}
        >
             <motion.button
        initial="rest"
        whileHover="hover"
        animate="rest"
        className=" flex items-center justify-center "
      >
        <span className="relative z-10 text-background text-button uppercase  transition-colors duration-300 group-hover:text-primary group-active:text-muted">{name}</span>
        <motion.div
          variants={{
            rest: { x: "-100%" },
            hover: { x: "0%" },
          }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className="absolute inset-0 bg-background z-0 flex items-center justify-center text-primary"
        />
      </motion.button>
        </Button>
    )
}


interface PaymentButtonProps {
    name:string , 
    isDisabled : boolean, 
}

export const PaymentButton = ({name , isDisabled}:PaymentButtonProps) => {
    return (
        <Button
            variant={"default"}
            className="relative overflow-hidden rounded-none p-0 group border border-accent w-full bg-secondary/90 hover:bg-secondary"
            disabled ={isDisabled}
            size={"lg"}
        >
             <span className="text-button uppercase text-background ">{name}</span>
        </Button>
    )
}