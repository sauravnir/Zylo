import React from "react";
import {motion} from "motion/react"
import { PRODUCTS_LIST } from "@/objects/Objects";

export function About() {
  return (
<div className="relative overflow-hidden bg-background py-20 md:py-40 px-4 border-b border-main">
  <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-6 md:gap-8">
    
    {/* Image Side */}
    <motion.div
    initial={{opacity:0}}
    whileInView={{opacity:100 }}
    viewport={{once:true}}
    transition={{duration:0.5 , delay:0.4 , ease:"easeIn"}}
    >
        <div className="flex flex-col h-full  md:space-y-0 md:h-[750px]">
      <img
        src={PRODUCTS_LIST[0].primaryImage}
        alt="Image Upper"
        className="w-full h-64 md:h-1/2 object-cover "
      />
      <img
        src={PRODUCTS_LIST[3].primaryImage}
        alt="Image Lower"
        className="w-full h-64 md:h-1/2 object-cover "
      />
    </div>
    </motion.div>
    

    {/* Text Side */}
    <motion.div
    initial={{opacity:0}}
    whileInView={{opacity:100 }}
    viewport={{once:true}}
    transition={{duration:0.5 , delay:0.5 , ease:"easeIn"}}
    className="flex flex-col space-y-4 md:space-y-6 p-4 md:p-20 items-start justify-center"
    >
        
      <span className="font-body text-main text-modal-title uppercase font-bold tracking-widest">
        About
      </span>
      <p className="text-muted text-paragraph text-sm md:text-base ">
        Zylo is an exploration of form, weight, and silhouette. We operate at the intersection of industrial design and contemporary luxury, stripping away the excess to reveal the structural architecture of the garment. Every piece is engineered with a focus on textile integrity—creating a permanent uniform for the modern minimalist. <br></br><br></br>
        Our process is defined by the pursuit of the "perfect heavy." From our signature 500GSM custom-milled knits to our modular technical outerwear, we prioritize the tactile over the temporary. We believe a garment should be a long-term asset, evolving with the wearer while maintaining its structural silhouette through years of utility. <br></br><br></br>
        In the world of Zylo, quality isn't an option; it's the foundation. We exist for the collective that values the silent details—the specific drop of a shoulder, the tension of a seam, and the gravity of premium cotton. We don't just build clothing; we construct the modern archive.
      </p>
    </motion.div>
    

  </div>
</div>

  );
}
