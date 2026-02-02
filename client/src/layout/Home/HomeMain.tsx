import { LinkDown } from "@/components/reusable/ButtonComponent";
import { motion } from "motion/react";
import ProductCard from "@/components/reusable/CardComponent";
import { PRODUCTS_LIST } from "@/objects/Objects";

export function HomeMain() {
// Mapping the products list global object to diplay the new items
// The items will be rendered from the last index to first so that last items in the object will get displayd in first 
const newItems = PRODUCTS_LIST.slice(-15).reverse();

  return (
    <div className="relative px-1 md:px-20 py-20 md:py-40 bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <LinkDown id="homecard" />
        </motion.div>
      </div>

      <div className="flex flex-col text-center">
        <h1 className="font-body text-main text-h2 uppercase">NEW</h1>
      </div>
      <motion.div  initial="hidden" whileInView={"visible"} viewport={{once:true}} id="homecard" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4 md:gap-y-10 md:gap-x-10 mt-20 md:mt-40">
        {newItems.map((items) => (
          <motion.div
            key={items.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          > 
          {/* Rendering the product card - NEW CARD */}
            <ProductCard
              key={items.id}
              {...items}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
