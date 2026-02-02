import {NavigationBar} from "@/components/reusable/Navigation";
import { Footer } from "@/components/reusable/Footer";
import { ProductMain } from "@/layout/Product/ProductMain";
import { PRODUCTS_LIST } from "@/objects/Objects";
import { useParams, Navigate } from "react-router-dom";

export function ProductPage (){

    // Grabbing the slug / id from the url using useParams
    const {slug} = useParams();
    // Checking if the slug matched any records in my database
    const productStore = PRODUCTS_LIST.find((item)=>item.slug === slug);
   
    // Handling error if there are not items that the user is searching or typing
    if (!productStore) {    
       return <Navigate to="404" replace />
  }
    
    return (
        <div className="min-h-screen">
            <NavigationBar />
            <ProductMain {...productStore} urlParam={slug} /> 
            <Footer />
        </div>
    )
}