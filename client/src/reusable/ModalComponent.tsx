import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "motion/react";
import type { ProductCardProps } from "./CardComponent";
import { X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { PaymentButton, PrimaryButton } from "./ButtonComponent";

// Scattering the two defined props and all the details from the ProductCardProps Component.
interface ProductModalProps extends ProductCardProps {
  isOpenModal: boolean;
  isSetOpenModal: (open: boolean) => void;
}

export default function ProductModal({
  isOpenModal,
  isSetOpenModal,
  ...props
}: ProductModalProps) {
  // Handling the carousel images in the modal
  const [currSlide, setCurrSlide] = useState(0);
  // Storing the images in a variable
  const modalImage =
    props.images?.length > 0 ? props.images : [props.primaryImage];
  // Reading the value of slide changes
  const nextSlide = () => {
    setCurrSlide((slide) => (slide + 1) % modalImage.length);
  };

  const prevSlide = () => {
    setCurrSlide(
      (slide) => (slide - 1 + modalImage.length) % modalImage.length,
    );
  };

  const [error, setError] = useState(false);

  // Handling the increment and decrement of the Quantity button
  const [num, setNum] = useState(1);
  const increment = () => setNum((prev) => prev + 1);
  const decrement = () => setNum((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <AlertDialog open={isOpenModal} onOpenChange={isSetOpenModal}>
      <AlertDialogContent className="max-w-4xl p-0 border-none rounded-none bg-card md:h-[85vh] max-h-[95vh] md:max-h-[700px] overflow-y-auto md:overflow-hidden">
        {/* Absolute Close Button */}
        <div className="absolute right-2 top-2 md:right-4 md:top-4 z-50 group">
          <AlertDialogCancel className="h-8 w-8 rounded-none border-none bg-card/80 backdrop-blur-sm p-0 text-muted hover:bg-transparent shadow-none group-hover:text-main">
            <X size={20} />
          </AlertDialogCancel>
        </div>

        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-card py-10 md:py-0 group border-b md:border-b-0 ">
            <div className="relative w-full max-w-[300px] md:max-w-[350px] aspect-[3/4] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currSlide}
                  src={error ? props.primaryImage : modalImage[currSlide]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-cover"
                  onError={() => setError(true)}
                />
              </AnimatePresence>

              {/* Arrows */}
              {modalImage.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-50 p-2  text-muted rounded-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 active:scale-105"
                  >
                    <ChevronLeft size={24} className="hover:text-background transition-colors duration-300"/>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-50 p-2  text-muted rounded-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 active:scale-105"
                  >
                    <ChevronRight size={24} className="hover:text-background transition-colors duration-300"/>
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {modalImage.length > 1 && (
              <div className="mt-4 flex gap-4 ">
                {modalImage.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currSlide === index ? "w-2 bg-main" : "w-2 bg-muted"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 flex flex-col p-6 md:p-10 md:overflow-y-auto">
            <div className="space-y-8 flex-1">
              {/* Title & Price */}
              <div className="space-y-2">
                <h1 className="text-main/80 uppercase  md:text-modal-title leading-tight">
                  {props.title}
                </h1>
                <span className="text-muted uppercase text-base tracking-widest block">
                  Rs. {props.price}
                </span>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="text-main text-xs uppercase tracking-widest font-medium">
                  Select Size:
                </div>
                <div className="flex flex-cols gap-3 w-full">
                  {props.sizes.map((size) => (
                    <button
                      key={size}
                      className="w-full h-12 border border-border text-muted text-xs uppercase transition-all hover:border-main hover:text-main"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-4">
                <div className="text-main text-xs uppercase tracking-widest font-medium">
                  Quantity:
                </div>
                <div className="flex items-center border border-border w-fit">
                  <button
                    onClick={decrement}
                    className="w-10 h-10 flex items-center justify-center text-muted hover:text-primary border-r border-border"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="text-muted w-12 flex items-center justify-center text-sm tabular-nums">
                    {num}
                  </div>
                  <button
                    onClick={increment}
                    className="w-10 h-10 flex items-center justify-center  text-muted hover:text-primary  border-l border-border"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3 pb-10 md:pb-0">
                <PrimaryButton
                  isDisabled={props.availability === "Sold Out"}
                  name={
                    props.availability === "Sold Out"
                      ? props.availability
                      : "Add to cart"
                  }
                />
                <PaymentButton isDisabled={false} name="Pay with E-sewa" />
              </div>

              {/* Optional Text  */}
              <div className="space-y-3">
                <Link to="/">
                  <span className="text-muted transition-all duration-400 hover:text-main text-xs uppercase underline  ">
                    View Details
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
