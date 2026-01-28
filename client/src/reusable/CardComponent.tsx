import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { itemVariants } from "@/objects/Animations";
import {ProductModal} from "./ModalComponent";
import { Link } from "react-router-dom";
import { Price } from "./Price";

// Type casting all the object data and passing as a prop
export interface ProductCardProps {
  id:string,
  title: string;
  category: string;
  price: number;
  primaryImage: string;
  images: string[];
  description: string;
  productCare: string;
  colors?: {name:string,hex:string}[];
  sizes: string[];
  availability: string;
  slug:string;

}
// Product Card Display Component 
export function ProductCard({isSearchContent , ...props}:ProductCardProps & {isSearchContent?:boolean}) {
  // Handle Image Hover
  const hoverImage = props.images && props.images.length > 1 ? props.images[1] : props.primaryImage;
  const [currImage , setCurrImage] = useState(props.primaryImage);
  const [Error , setError] = useState(false);
// Handling the modal open prop
const [isOpenModal , setIsOpenModal] = useState(false);

  return (
    <motion.div
    variants={itemVariants}
    className="w-full"
>
    <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className={`cursor-pointer ${isSearchContent ? "flex items-center gap-4 md:block" : ""}`}
    >
        <Card className={`border-none bg-transparent shadow-none rounded-none overflow-hidden ${
            isSearchContent ? "w-20 h-24 md:w-full md:h-auto" : "w-full"
        }`}>
            <CardContent className={`p-0 relative ${isSearchContent ? "h-full md:aspect-[3/4]" : "aspect-[3/4]"}`}>
                {/* Routing to Products Page */}
                <Link to={!isSearchContent ? `/products/${props.slug}` : "#"}>
                    {/* Desktop Image Section */}
                    <img
                        src={Error ? props.primaryImage : currImage}
                        alt={props.title}
                        className="w-full h-full object-cover hidden md:block"
                        onMouseEnter={() => setCurrImage(hoverImage)}
                        onMouseLeave={() => setCurrImage(props.primaryImage)}
                        onError={() => setError(true)}
                    />

                    {/* Mobile Image Section */}
                    <div className="block md:hidden h-full"> 
                        <img src={props.primaryImage} alt={props.title} className="w-full h-full object-cover"/>
                    </div>
                </Link>
                
                {/* Desktop Add to Cart */}
                {props.availability !== "Sold Out" && !isSearchContent && (
                    <motion.div
                        variants={{
                            rest: { opacity: 0, y: 10 },
                            hover: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                        className="hidden md:block absolute bottom-2 right-2 z-20 p-2 group"
                    >
                        <Button variant="ghost" className="w-8 h-8 bg-card rounded-none" onClick={(e)=>{e.stopPropagation(); setIsOpenModal(true)}}>
                            <Plus className="text-main transition-transform duration-300 ease-in-out group-hover:rotate-90" />
                        </Button>
                    </motion.div>
                )}

                {/* Mobile Add to Cart - Hidden if isSearchContent is true to save space */}
                {props.availability !== "Sold Out" && !isSearchContent && (
                    <div className="md:hidden absolute bottom-2 right-2 z-20 p-2">
                        <Button variant="ghost" className="w-8 h-8 bg-card rounded-none" onClick={(e)=>{e.stopPropagation(); setIsOpenModal(true)}}>
                            <Plus className="text-main" />
                        </Button>
                    </div>
                )}

                {/* Items Availability Badge */}
                {props.availability === "Sold Out" && (
                    <div className="absolute top-1 left-1">
                        <span className="bg-muted text-white text-[8px] md:text-tiny uppercase px-1 md:px-2 py-1 font-medium tracking-widest">
                            {props.availability}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Product Details - Adjusted for Mobile Search Layout */}
        <div className={`flex flex-col gap-1 mt-2 ${
            isSearchContent 
            ? "items-start text-left justify-start p-0 md:items-center md:text-center md:p-4" 
            : "items-center text-center justify-center p-4"
        }`}>
            <h1 className={`font-body text-main uppercase ${
                isSearchContent ? "text-[10px] md:text-product-title line-clamp-1" : "text-product-title"
            }`}>
                {props.title}
            </h1>
            <span className={`text-muted uppercase ${
                isSearchContent ? "text-[10px] md:text-product-title" : "text-product-title"
            }`}>
                <Price amount={props.price} />
            </span>
        </div>
    </motion.div>

    <ProductModal isOpenModal={isOpenModal} isSetOpenModal={setIsOpenModal} {...props}/>
</motion.div>
  );
}

export default ProductCard;
