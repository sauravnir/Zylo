import { createContext, useContext, useState, useMemo } from "react";
import type { ProductCardProps } from "@/reusable/CardComponent";

// Defining the global context type
interface ProductContextType {
  globalProducts: ProductCardProps[];
  searchTerm: string;
  setSearchItem: (term: string) => void;
  filteredProducts: ProductCardProps[];
}

// Creating a product context object
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Creating a context provider. This context provider broadcasts the overall data throughout the site
export const ProductProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ProductCardProps[];
}) => {
  // Item search state
  const [searchTerm, setSearchItem] = useState("");
  // Items Filtering logic. Automatically filter the items based on the search term
  const filteredProducts = useMemo(() => {
    // Starting with an empty list if not searching
    if (!searchTerm.trim()) return [];
    const lowerCaseItem = searchTerm.toLowerCase();
    // Searching the products
    return data.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseItem) ||
        product.category.toLowerCase().includes(lowerCaseItem) ||
        product.sizes?.some((size) => size.toLowerCase() === lowerCaseItem) ||
        product.colors?.some((color) =>
          color.name.toLowerCase().includes(lowerCaseItem),
        ),
    );
  }, [searchTerm, data]);

  return (
    <ProductContext.Provider value={{globalProducts : data , searchTerm , setSearchItem , filteredProducts}}>
        {children}
    </ProductContext.Provider>
  );
};


export const useProducts =  () => {
    const context = useContext(ProductContext)

    if(!context) throw new Error("Khai k error aayo");
    return context;
}
