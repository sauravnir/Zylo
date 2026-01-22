import react from "react";
import { LinkDown } from "@/reusable/ButtonComponent";
import { motion } from "motion/react";
import ProductCard from "@/reusable/CardComponent";
import { PRODUCTS_LIST } from "@/objects/Objects";
import { parentVariants } from "@/objects/Animations";

export function HomeMain() {
  return (
    <div className="relative px-8 md:px-20 py-40 bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <LinkDown id="card" />
        </motion.div>
      </div>

      <div className="flex flex-col text-center">
        <h1 className="font-body text-main text-h2 uppercase">NEW</h1>
      </div>

      <motion.div variants={parentVariants} initial="hidden" whileInView={"visible"} viewport={{once:true}} id="card" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-10 mt-40">
        {PRODUCTS_LIST.map((items) => (
          <motion.div
            key={items.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProductCard
              title={items.title}
              category={items.category}
              price={items.price}
              primaryImage={items.primaryImage}
              images={items.images}
              description={items.description}
              productCare={items.productCare}
              colors={items.colors}
              sizes={items.sizes}
              availability={items.availability}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
