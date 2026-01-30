import { ProductCard, type ProductCardProps } from "@/reusable/CardComponent";
import { ProductDetail } from "@/reusable/ModalComponent";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";

import { parentVariants } from "@/objects/Animations";
import { PRODUCTS_LIST } from "@/objects/Objects";

export function ProductMain({
  urlParam,
  ...props
}: ProductCardProps & { urlParam: any }) {
  // Accessing the current product
  const currentProduct = PRODUCTS_LIST.find((item) => item.slug === urlParam);
  
    // Filtering the collections and categories
  const relatedProducts = PRODUCTS_LIST.filter((item) => {
   // If the current product doesn't exist, don't filter anything
    if (!currentProduct) return false;
   // Exclude the product currently being viewed
    if (item.slug === urlParam) return false;

    //Checking for the same category
    const sameCategory = item.category === currentProduct.category;
    // Checking for same collection
    const sameCollection =
      currentProduct.collection &&
      item.collection === currentProduct.collection;
    return sameCategory || sameCollection;
  })


// Sorting the filters so that collection comes in first and then category  
    const sortRelatedProducts = relatedProducts.sort((a,b)=>{
        if(a.collection === currentProduct?.collection && b.collection !== currentProduct?.collection){
            return -1;
        }
        return 0;
    })
  return (
    <div className="relative px-4 md:px-20 py-20 bg-background ">
      {currentProduct ? (
        <div>
          <ProductDetail props={props} viewMode="page" />

          {/* Related products content */}
          <div className="w-full flex flex-col space-y-12 py-20">
            <div className="text-center">
              <h1 className="text-main text-h3 uppercase tracking-normal">
                Related Products
              </h1>
            </div>

            <motion.div
              variants={parentVariants}
              initial="hidden"
              whileInView={"visible"}
              viewport={{ once: true }}
              id="collectioncard"
              className="w-full md:px-4 mt-40"
            >
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full relative"
              >
                <CarouselContent className="-ml-2">
                  {sortRelatedProducts.length > 0 ? (
                    sortRelatedProducts.map((items) => (
                      <CarouselItem
                        key={items.id}
                        className=" md:p-4 lg:p-8 basis-[85%] md:basis-1/4 lg:basis-1/4"
                      >
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <ProductCard key={items.id} {...items} />
                        </motion.div>
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="p-20 text-center flex flex-col items-center justify-center">
                      <h1 className="text-base uppercase tracking-widest text-main font-bold">
                        No results found
                      </h1>
                    </div>
                  )}
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
        </div>
      ) : (
        <div className="p-20 text-center flex flex-col items-center justify-center">
          <h1 className="text-base uppercase tracking-widest text-main font-bold">
            No results found
          </h1>
        </div>
      )}
    </div>
  );
}
