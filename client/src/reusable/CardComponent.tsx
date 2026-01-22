import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { itemVariants } from "@/objects/Animations";

interface ColorOption {
  name: string;
  hex: string;
}

interface ProductCardProps {
  title: string;
  category: string;
  price: number;
  primaryImage: string;
  images: string[];
  description: string;
  productCare: string;
  colors?: ColorOption[];
  sizes: string[];
  availability: string;
}

export function ProductCard({
  title,
  category,
  price,
  primaryImage,
  images,
  description,
  productCare,
  colors,
  sizes,
  availability,
}: ProductCardProps) {
  // Handle Image Hover
  const hoverImage = images && images.length > 1 ? images[1] : primaryImage;
  const [currImage , setCurrImage] = useState(primaryImage);
  const [Error , setError] = useState(false);

  return (
    <motion.div
        variants={itemVariants}
        className="w-full"
    >
         <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        onMouseEnter={() => setCurrImage(hoverImage)}
        onMouseLeave={() => setCurrImage(primaryImage)}
        className="cursor-pointer"
      >
        <Card className="border-none bg-transparent shadow-none rounded-none overflow-hidden ">
          <CardContent className="p-0 relative aspect-[3/4]">
            
            {/* Desktop Image Section */}
            <img
              src={Error ? primaryImage : currImage}
              alt={title}
              className="w-full h-full object-cover hidden md:block"
              onError={() => setError(true)}
            />

            {/* Mobile Image Section */}
            <div className="block md:hidden h-full"> 
              <img src={primaryImage} alt={title} className="w-full h-full object-cover"/>
            </div>

            {/* Desktop Add to Cart (Animated via Hover Variant) */}
            {availability !== "Sold Out" && (
              <motion.div
                variants={{
                  rest: { opacity: 0, y: 10 },
                  hover: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="hidden md:block absolute bottom-2 right-2 z-20 p-2 group"
              >
                <Button variant="ghost" className="w-8 h-8 bg-card rounded-none">
                  <Plus className="text-main transition-transform duration-300 ease-in-out group-hover:rotate-90" />
                </Button>
              </motion.div>
            )}

            {/* Mobile Add to Cart (Always visible) */}
            {availability !== "Sold Out" && (
              <div className="md:hidden absolute bottom-2 right-2 z-20 p-2">
                <Button variant="ghost" className="w-8 h-8 bg-card rounded-none">
                  <Plus className="text-main" />
                </Button>
              </div>
            )}

            {/* Sold Out Badge */}
            {availability === "Sold Out" && (
              <div className="absolute top-4 left-4">
                <span className="bg-muted text-white text-[10px] uppercase px-2 py-1 font-medium tracking-widest">
                  {availability}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Details */}
        <div className="flex flex-col items-center text-center justify-center gap-4 p-4 mt-2">
          <h1 className="font-body text-main uppercase text-product-title ">
            {title}
          </h1>
          <span className="text-muted uppercase text-product-title ">
            Rs.{price}
          </span>
        </div>
      </motion.div>
    </motion.div>
   
  );
}

export default ProductCard;
