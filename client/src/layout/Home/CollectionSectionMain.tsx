import React from "react";
import { motion } from "motion/react";
import { LinkDown } from "@/reusable/ButtonComponent";
import { parentVariants } from "@/objects/Animations";
import ProductCard from "@/reusable/CardComponent";
import { PRODUCTS_LIST } from "@/objects/Objects";

import { Carousel, CarouselContent , CarouselNext , CarouselPrevious , CarouselItem } from "@/components/ui/carousel";
export function CollectionSectionMain() {
  return (
    <div className="relative md:px-20 py-40 bg-background border-2 border-b">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <LinkDown id="collectioncard" />
        </motion.div>
      </div>

      <div className="flex flex-col text-center">
        <h1 className="font-body text-main text-h2 uppercase">Basics</h1>
      </div>

      <motion.div
        // variants={parentVariants}
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
        id="collectioncard"
        className="w-full md:px-4 mt-40"
      >
        <Carousel
        opts={{
            align:"start",
            loop:false,
        }}
        className="w-full relative"
        >
            
          <CarouselContent className="-ml-4">
            {PRODUCTS_LIST.map((items) => (

            <CarouselItem key={items.id} className=" md:p-4 lg:p-8 basis-[85%] md:basis-1/2 lg:basis-1/3">
                    <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Change the object according to the collection. Using MainCard Object Currently for Testing Purposes.   */}
                <ProductCard key={items.id} {...items} />
              </motion.div>
            </CarouselItem>
              
            ))}
          </CarouselContent>
          <div className="flex justify-center items-center mt-8 md:mt-4">
      <div className="relative flex gap-2">
        <CarouselPrevious className="rounded-none w-10 h-10 text-muted hover:text-white hover:bg-primary transition-colors duration-400" />
        <CarouselNext className="rounded-none w-10 h-10 text-muted hover:text-white hover:bg-primary transition-colors duration-400" />
      </div>
    </div>
        </Carousel>
      </motion.div>
    </div>
  );
}
