import { createContext, useContext, useState, useMemo } from "react";
import type { ProductCardProps } from "@/reusable/CardComponent";
import { useParams } from "react-router-dom";
import { process } from "zod/v4/core";
// Defining the filter functionality
interface Filters {
  availability: string;
  sort: string;
  gridCols: number;
}

// Defining the global context type
interface ProductContextType {
  globalProducts: ProductCardProps[];
  searchTerm: string;
  setSearchItem: (term: string) => void;
  filteredProducts: ProductCardProps[]; // Filtering for the grid
  searchSuggestions : ProductCardProps[]; // Filtering for the search dropdown
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

// Creating a product context object
const ProductContext = createContext<ProductContextType | undefined>(undefined);
// Creating a context provider. This context provider broadcasts the overall data throughout the site
export const ProductProvider = ({  children,data,}: {  children: React.ReactNode;  data: ProductCardProps[];}) => {
  // Item search state
  const [searchTerm, setSearchItem] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  // Creating additional filter options object. Setting the initial filter value
  const [filters, setFilters] = useState<Filters>({
    availability: "all",
    sort: "default",
    gridCols: 4,
  });



  // Product search and filtering logics
  const {searchSuggestions , filteredProducts} = useMemo(() => {
    // Lowercasing the user's input 
    const lowerCaseItem = searchTerm.trim().toLowerCase();
    // Setting empty object for the searchbar result
    let suggestionResult: ProductCardProps[] = [];
   
   
    // Searching items dropdown logic
    if ( lowerCaseItem !== "") {
      suggestionResult = data.filter(
        (product) =>{
          const title = product.title.toLowerCase();
          const category = product.category.toLowerCase();
          // Checking for the exact match for categories
          const isExactCategory = category === lowerCaseItem;
          const isTitleMatch = title.includes(lowerCaseItem);
          const isColorMatch = product.colors?.some((color)=>color.name.toLowerCase()=== lowerCaseItem);
          const isAvailabilityMatch = product.availability.toLowerCase().includes(lowerCaseItem);
          return isExactCategory || isTitleMatch || isAvailabilityMatch || isColorMatch
        }
      );
      
    }

    // Empty array for storing the page results
    let pageResult :ProductCardProps[] = [];
// If the user is searching then populating the search result to empty array
    if(lowerCaseItem !== ""){
      pageResult = [...suggestionResult];
    }
    // Filtering the page by category if no search is active
    else if (activeCategory !== "all" && activeCategory !== "shop-all" && activeCategory !=="basic" && activeCategory !=="new" ) {
      pageResult = data.filter((p) => {
        const productCat = p.category?.trim().toLowerCase();
        const activeCat = activeCategory.trim().toLowerCase();
        return productCat === activeCat;
      });
    } 
    else {
      // If nothing then showing all the objects
      pageResult = [...data];
    }
// Availability Filters logic
    if (filters.availability !== "all") {
      pageResult = pageResult.filter((p) => {
        if (filters.availability === "In Stock")
          return (
            p.availability === "In Stock" || p.availability == "Limited Release"
          );
        if (filters.availability === "Sold Out")
          return p.availability === "Sold Out";
        return true;
      });
    }
    //Storing the result in a new obj to stop mutating the original value
    const sortedResult = [...pageResult]
    // Dropdown filters logic
    if (filters.sort === "price-low") {
      sortedResult.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      sortedResult.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "a-z") {
      sortedResult.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sort === "z-a") {
      sortedResult.sort((a, b) => b.title.localeCompare(a.title));
    }
     return {filteredProducts:sortedResult, searchSuggestions:suggestionResult};
    } , [searchTerm, data, filters, activeCategory])

  // Resetting all the filters
  const resetFilters = () => {
    setFilters({
      ...filters,
      availability: "all",
      sort: "default",
      gridCols: 4,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        globalProducts: data,
        searchTerm,
        setSearchItem,
        filteredProducts,
        filters,
        setFilters,
        resetFilters,
        activeCategory,
        setActiveCategory,
        searchSuggestions
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error();
  return context;
};
