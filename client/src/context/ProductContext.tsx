import { createContext, useContext, useState, useMemo } from "react";
import type { ProductCardProps } from "@/reusable/CardComponent";

// Defining the filter functionality
interface Filters{
    availability : string ,
    sort : string,
    gridCols : number;
}

// Defining the global context type
interface ProductContextType {
  globalProducts: ProductCardProps[];
  searchTerm: string;
  setSearchItem: (term: string) => void;
  filteredProducts: ProductCardProps[];
  filters : Filters;
  setFilters : React.Dispatch<React.SetStateAction<Filters>>
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

    // Creating additional filter options object. Setting the initial filter value
    const [filters , setFilters ]= useState<Filters>({
        availability: "all",
        sort:"default",
        gridCols:4
    })

  // Items search logic. Automatically filter the items based on the search term
  const filteredProducts = useMemo(() => {
    // First checking if the searched item is empty or not 
    if(!searchTerm || searchTerm.trim() ===""){
        return [];
    }
    // Storing the data in a const
    let result = [...data];
    // Searching items logic
    if (searchTerm.trim()) {
      const lowerCaseItem = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseItem) ||
          product.category.toLowerCase().includes(lowerCaseItem) ||
          product.availability.toLowerCase().includes(lowerCaseItem)
      );
    }
    // Availability Filter Logic
    if (filters.availability !== "all") {
      result = result.filter((p) => {p.availability === filters.availability});
    }

    // Sorting Logic
    if (filters.sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "a-z"){
        result.sort((a,b)=>a.title.localeCompare(b.title))
    }else if (filters.sort === "z-a"){
        result.sort((a,b)=>b.title.localeCompare(a.title))
    };

    return result;
  }, [searchTerm, data , filters]);

  return (
    <ProductContext.Provider value={{globalProducts : data , searchTerm , setSearchItem , filteredProducts , filters , setFilters}}>
        {children}
    </ProductContext.Provider>
  );
};


export const useProducts =  () => {
    const context = useContext(ProductContext)

    if(!context) throw new Error;
    return context;
}
