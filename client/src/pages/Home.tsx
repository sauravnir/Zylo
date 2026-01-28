import {NavigationBar} from "../reusable/Navigation";
import Hero from "@/layout/Home/Hero";
import { HomeMain } from "@/layout/Home/HomeMain";
import { CollectionHero } from "@/layout/Home/CollectionSectionHero";
import { CollectionSectionMain } from "@/layout/Home/CollectionSectionMain";
import { About } from "@/layout/Home/About";
import { Footer } from "@/reusable/Footer";
export default function HomePage(){
    return (
       <div className="min-h-screen">
        {/* <CustomLoader /> */}
        <NavigationBar />
        <Hero />
        <HomeMain />
        <CollectionHero />
        <CollectionSectionMain />
        <About />
        <Footer/>
       </div>
    )
}