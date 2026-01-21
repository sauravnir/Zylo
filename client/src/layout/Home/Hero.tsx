import React from "react"
import Logo from "@/assets/logo/Logo.png"
export default function Hero (){
    return(
        <div className="relative overflow-hidden bg-background">
            <div className="h-[600px] flex items-center justify-center mx-auto pt-20">
    {/* <img src={Logo} alt="Logo" className="max-w-full h-auto" /> */}
            <h1 className="font-logo text-display">zylo</h1>
  </div>
        </div>
    )
}