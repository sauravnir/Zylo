import {useEffect} from "react";
import {NavigationBar} from "@/reusable/Navigation";
import { Footer } from "@/reusable/Footer";
import { ProductMain } from "@/layout/Product/ProductMain";
import { PRODUCTS_LIST } from "@/objects/Objects";
import { useNavigate, useParams } from "react-router-dom";

export function ProductPage (){
    const navigate = useNavigate();
    // Grabbing the slug / id from the url using useParams
    const {slug} = useParams();
    // Checking if the slug matched any records in my database
    const productStore = PRODUCTS_LIST.find((item)=>item.slug === slug);
    // Error handling if slug is not found

    useEffect(()=>{
        if (!productStore){
        navigate('/404Error');
    }
    },[productStore , navigate])
    
    if (!productStore) {
        return null; 
    }
    
    return (
        <div className="min-h-screen">
            <NavigationBar />
            <ProductMain {...productStore}/> 
            <Footer />
        </div>
    )
}