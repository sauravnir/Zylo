import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import type { ProductCardProps } from "./CardComponent";
import { X, ChevronLeft, ChevronRight, Plus, Minus, Dot } from "lucide-react";
import { PaymentButton, PrimaryButton } from "./ButtonComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// Importing Custom cursor
import { Cursor } from "./Cursor";
import { Price } from "./Price";
// Importing Redux Toolkits essentials
import { addItem, setCartOpen, setIsUploading } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";

// Scattering the two defined props and all the details from the ProductCardProps Component.
interface ProductModalProps extends ProductCardProps {
  isOpenModal: boolean;
  isSetOpenModal: (open: boolean) => void;
  closeModal: () => void;
}
// Modal Component of product cards
export function ProductModal({
  isOpenModal,
  isSetOpenModal,
  closeModal,
  ...props
}: ProductModalProps) {
  return (
    <Dialog open={isOpenModal} onOpenChange={isSetOpenModal}>
      <DialogContent className="max-w-4xl p-0 border-none rounded-none md:h-[85vh] max-h-[85vh] md:max-h-[700px] overflow-y-auto md:overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Quick View: {props.title || "Product"}</DialogTitle>
          <DialogDescription>
            View product details and add {props.title} to your cart.
          </DialogDescription>
        </DialogHeader>

        <div className="absolute right-2 top-2 md:right-4 md:top-4 z-50 group">
          <button
            onClick={() => isSetOpenModal(false)}
            className="h-8 w-8 flex items-center justify-center bg-background backdrop-blur-sm text-muted hover:text-main transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="py-4 md:p-0 w-full h-full">
          <ProductDetail
            props={props}
            closeModal={closeModal}
            viewMode={"modal"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Type casting the required parameters
// Adding the viewMode to toggle between the page and modal
// Destructuring all the objects inside ProductCardProps
interface ProductDetailProps {
  viewMode: "modal" | "page";
  props: ProductCardProps;
  closeModal: () => void;
}

// Details Component of the Products
export const ProductDetail = ({
  props,
  viewMode,
  closeModal,
}: ProductDetailProps) => {
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
  // const [error, setError] = useState(false);
  // Handling the increment and decrement of the Quantity button
  const [num, setNum] = useState(1);
  const increment = () => setNum((prev) => prev + 1);
  const decrement = () => setNum((prev) => (prev > 1 ? prev - 1 : 1));

  // Splitting the string into an array of the Description and ProductCare field
  const descriptionPoints = props.description
    .split(".")
    .filter((dot) => dot.trim().length > 0);
  const productCarePoints = props.productCare
    .split(".")
    .filter((dot) => dot.trim().length > 0);

  // Storing the colors and sizes in a state to render in the front
  //Setting the default size to the first size index
  const [productSize, setProductSize] = useState(props.sizes[0] || "");
  const [productColor, setProductColor] = useState(
    props.colors ? props.colors[0].name : "",
  );

  // Handling the IMAGE ZOOMING Func
  const [clicked, isClicked] = useState(false);
  // Handling the the zoom function
  const [isZoomed, setIsZoomed] = useState(false);

  // Handling the custom cursor
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // initializing the useDispatch() function
  const dispatch = useDispatch();

  // Handling the clicking of the button asynchronously
  // Adding items to the store using useDispatch
  const addCartItems = async () => {
    dispatch(setIsUploading(true));
    // Making the adding to cart async buy adding a fake delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Dispatching the product after the timer
    dispatch(addItem({ product: props, size: productSize, itemQuantity: num }));

    dispatch(setIsUploading(false));

    // Closing the modal when the add to cart items is clicked
    closeModal();

    // Slide the cart open
    dispatch(setCartOpen(true));
  };
  return (
    <div
      className={`flex flex-col md:flex-row w-full h-full ${viewMode === "page" ? "border-b border-main pb-10 mt-4" : "p-6"}`}
    >
      <div
        className={`w-full flex flex-col items-center bg-background group border-b md:border-b-0 
    ${viewMode === "modal" ? "justify-center" : "justify-start py-4 md:py-10"}`}
      >
        {/* Image Section */}
        <div
          className={`relative w-full overflow-hidden  ${
            viewMode === "modal"
              ? "max-w-[290px] md:max-w-[350px] aspect-[2/3]"
              : "max-w-[360px] md:max-w-[500px] aspect-[2/3] cursor-none"
          }`}
          // Zoom image in the page
          onClick={() => viewMode === "page" && isClicked(true)}
          // Hide default cursor on Modal
          onMouseMove={(e) => {
            if (viewMode === "page") {
              setMousePos({ x: e.clientX, y: e.clientY });
            }
          }}
          onMouseEnter={() => viewMode === "page" && setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Custom Cursor Overlaying the Div */}
          <AnimatePresence>
            {isHovering && viewMode === "page" && (
              <Cursor x={mousePos.x} y={mousePos.y} />
            )}
          </AnimatePresence>

          {/* Images */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currSlide}
              src={modalImage[currSlide]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full object-cover"
              
            />
          </AnimatePresence>

          {/* 3. MODAL NAVIGATION */}
          {viewMode === "modal" && modalImage.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from bubbling to the parent div
                  prevSlide();
                }}
                className="group absolute left-2 top-1/2 -translate-y-1/2 z-10 text-primary bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 active:scale-105"
              >
                <ChevronLeft
                  size={14}
                  className="hover:text-muted active:text-main active:-translate-x-2 transition-all duration-300"
                />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from bubbling to the parent div
                  nextSlide();
                }}
                className="group absolute right-2 top-1/2 -translate-y-1/2 z-10 text-primary bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 active:scale-105"
              >
                <ChevronRight
                  size={14}
                  className="hover:text-muted active:text-main active:translate-x-2 transition-all duration-300"
                />
              </button>
            </>
          )}
        </div>

        {/* Dots Carousel Navigation */}
        {modalImage.length > 1 && (
          <div
            className={`${viewMode === "page" && "block md:hidden"} mt-8 flex gap-1.5 mb-4`}
          >
            {modalImage.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currSlide === index ? "w-4 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        )}

        {/* Displaying Image Navigation at the bottom of the Carousel in Product Page */}
        {viewMode === "page" && modalImage.length > 1 && (
          <div className="hidden md:flex mt-4 flex-wrap gap-2">
            {modalImage.map((image, index) => {
              const isActive = currSlide === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrSlide(index)}
                  className={`relative w-14 h-16 overflow-hidden transition-all duration-300
            ${isActive ? "ring-1 ring-offset-1 ring-main" : ""}`}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    // onError={() => setError(true)}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`w-full md:max-w-xl flex flex-col my-auto ${viewMode === "modal" ? "p-4" : "pt-8 md:p-8"} md:overflow-y-auto`}
      >
        <div className="space-y-8 flex-1">
          {/* Title & Price */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-main uppercase text-modal-title tracking-[0.15em] leading-tight">
              {props.title}
            </h1>
            <div className="text-base tracking-[0.1em]  text-main/50 font-semibold transition-colors ">
              <Price amount={props.price} />
            </div>
          </div>

          {/* Conditionally rendering the description , product care and colors in Product Page */}
          {viewMode === "page" && (
            <div className="flex flex-col space-y-6 border-t border-1 border-main">
              <Accordion type="single" collapsible>
                <AccordionItem value={props.description}>
                  <AccordionTrigger className="text-muted text-nav uppercase tracking-widest font-medium">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className=" ">
                    <ul className="flex flex-col gap-1">
                      {descriptionPoints.map((item) => (
                        <li
                          key={item}
                          className="flex text-muted text-base items-center gap-1 "
                        >
                          <Dot />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value={props.productCare}>
                  <AccordionTrigger className="text-muted text-nav uppercase tracking-widest font-medium">
                    Product Care
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-1">
                      {productCarePoints.map((item) => (
                        <li
                          key={item}
                          className="flex text-muted text-base items-center gap-1"
                        >
                          <Dot />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="space-y-4">
                <div className="text-main text-menu uppercase font-medium">
                  Colors:{" "}
                  <span className="text-muted ml-1">{productColor}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {props.colors?.map((color) => {
                    const isActive = productColor === color.name;

                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setProductColor(color.name)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-8 h-8 rounded-full transition-all duration-300 relative shadow-md
            ${
              isActive
                ? "ring-1 ring-offset-2 ring-main " // Selected: Ring + Scale
                : "ring-1 ring-offset-2 ring-muted/50 hover:ring-main" // Unselected: Subtle border
            }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="text-main text-menu uppercase font-medium">
              Size: <span className="text-muted ml-1">{productSize}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {props.sizes.map((size) => {
                // Check if this specific button is the selected one
                const isActive = productSize === size;
                return (
                  <button
                    key={size}
                    type="button" // Prevents accidental form submission
                    onClick={() => setProductSize(size)}
                    className={`w-10 h-10 border  text-nav uppercase transition-all duration-300 flex items-center justify-center
            ${
              isActive
                ? "bg-main text-white border-main shadow-sm"
                : "border-main text-muted hover:text-white hover:bg-main "
            }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-4 ">
            <div className="text-main text-menu uppercase tracking-widest font-medium">
              Quantity:
            </div>
            <div className="flex items-center border border-main w-fit">
              <button
                onClick={decrement}
                className={`w-10 h-10 flex items-center justify-center ${num === 1 && `cursor-not-allowed bg-muted/50 hover:bg-muted/50`} text-muted hover:text-white transition-all duration-300 hover:bg-main border-r border-main`}
              >
                <Minus size={16} />
              </button>
              <div className="text-muted w-12 flex items-center justify-center text-sm tabular-nums">
                {num}
              </div>
              <button
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center transition-all duration-300 text-muted hover:text-white hover:bg-main border-l border-main"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Implementing Redux Function to add the product value to the redux store */}
          {/* Action Buttons */}
          <div className={` space-y-3 `}>
            <PrimaryButton
              isDisabled={props.availability === "Sold Out"}
              name={
                props.availability === "Sold Out"
                  ? props.availability
                  : "Add to cart"
              }
              onClick={addCartItems}
            />
            {/* <PaymentButton
              isDisabled={true}
              name="Pay with E-sewa"
            /> */}
          </div>

          {/* Optional Text  */}
          <div className="flex flex-col md:flex-row justify-center space-y-2 p-0 ">
            {viewMode === "modal" && (
              <div className="text-center">
                <Link to={`/products/${props.slug}`}>
                  <span className="text-muted transition-all duration-400 hover:text-main text-xs uppercase underline  ">
                    View Details
                  </span>
                </Link>
              </div>
            )}

            {/* Optional Close Button */}
          </div>
        </div>
      </div>

      {/* Zooming of the Image when clicked */}
      {viewMode === "page" && (
        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background backdrop-blur-md cursor-zoom-out"
            >
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[120]">
                {/* Previous Button */}
                {modalImage.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="group p-2 rounded-full text-primary bg-background transition-colors duration-300 hover:scale-105"
                  >
                    <ChevronLeft
                      size={24}
                      className="group-hover:-translate-x-2 transition-translate duration-300"
                    />
                  </button>
                )}

                {/* Close Button */}
                <button
                  className="flex items-center justify-center text-main hover:rotate-90 rounded-full bg-background w-14 h-14  transition-transform duration-300"
                  onClick={() => isClicked(false)}
                >
                  <Plus size={32} className="rotate-45" />
                </button>

                {/* Next Button */}
                {modalImage.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }} // Fixed to nextSlide
                    className="group p-2 rounded-full text-primary bg-background transition-colors duration-300 hover:scale-105"
                  >
                    <ChevronRight
                      size={24}
                      className="group-hover:translate-x-2 transition-translate duration-300"
                    />
                  </button>
                )}
              </div>

              {/* Fullscreen Image / Zoomed Image */}
              <motion.img
                key={currSlide}
                src={modalImage[currSlide]}
                initial={{ scale: 0.9, opacity: 0 }}
                // Handling the zooming functionality
                animate={{
                  opacity: 1,
                  x: isZoomed ? undefined : 0,
                  y: isZoomed ? undefined : 0,
                  scale: isZoomed ? 1.9 : 1,
                  cursor: isZoomed ? "zoom-out" : "zoom-in",
                }}
                drag={isZoomed}
                dragConstraints={{
                  left: -100,
                  right: 300,
                  top: -400,
                  bottom: 400,
                }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                exit={{ scale: 1, opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-[90vw] max-h-[99vh] object-contain "
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
