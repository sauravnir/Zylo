import React from "react";
import Logo from "../assets/logo/Logo.png"
import NavigationBar from "../reusable/Navigation";
import Hero from "@/layout/Home/Hero";
import { HomeMain } from "@/layout/Home/HomeMain";
export default function HomePage(){
    return (
       <div className="min-h-screen">
        <NavigationBar />
        <Hero />
        <HomeMain />
       </div>
    )
}