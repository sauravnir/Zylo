import React from "react";
import LogoWhite from "@//assets/logo/LogoWhite.svg";
import HeroVideo from "@/assets/videos/HeroVideo.mp4";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="relative h-[80vh] md:h-[750px] w-full overflow-hidden bg-background">
  <motion.div
    // initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
    // whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    // viewport={{ once: true }}
    // transition={{ duration: 0.5, delay: 4, ease: "linear" }}
    className="absolute inset-0"
  >
    <video 
      src={HeroVideo} 
      autoPlay 
      loop 
      muted 
      playsInline 
     
      className="w-full h-full bg-primary object-cover"
    />
    <div className="absolute inset-0 bg-black/60" />
  </motion.div>
{/* Hero Zylo Logo */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.8 }}
    className="absolute inset-0 z-10 flex items-center justify-center p-6"
  >
    <img
      src={LogoWhite}
      alt="LogoWhite"
      className="w-48 md:w-72 h-auto object-contain"
    />
  </motion.div>

</div>
  );
}
