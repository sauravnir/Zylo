import { motion } from "motion/react";

export function CollectionHero (){
    return (
<div className="relative h-[80vh] md:h-[750px] w-full overflow-hidden bg-primary">
 <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.8 }}
    className="absolute inset-0 z-10 flex items-center justify-center p-6"
  >
    <span className="text-white text-[200px] font-logo">
      Basics
    </span>
    {/* <img
      src={LogoWhite}
      alt="LogoWhite"
      className="w-48 md:w-72 h-auto object-contain"
    /> */}
  </motion.div>
</div>
    )
}