
import type { ProductCardProps } from "@/reusable/CardComponent"
import { ProductDetail } from "@/reusable/ModalComponent"
export function ProductMain({...props}:ProductCardProps){
    return (
        <div className="relative px-4 md:px-20 py-20 bg-background ">
            <ProductDetail props={props} viewMode="page" />        
        </div>
    )
}

