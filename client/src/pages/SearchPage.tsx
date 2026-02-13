import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { NavigationBar } from "@/components/reusable/Navigation";
import { Footer } from "@/components/reusable/Footer";
import ProductCard from "@/components/reusable/CardComponent";
import { Input } from "@/components/ui/input";
import { ItemFilters } from "@/components/reusable/FilterComponent";
import { motion } from "motion/react";
import { itemVariants, parentVariants } from "@/objects/Animations";
import { ProductPagination } from "@/components/reusable/PaginationComponent";
import { usePagination } from "@/hooks/usePagination";

export const SearchPage = () => {
  // Fetching the search result from the url
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  // Getting the searching function from global context
  const { filteredProducts, setSearchItem, searchTerm, filters, resetFilters , setActiveCategory } =
    useProducts();
  const [localSearch, setLocalSearch] = useState("");
  // Handling the blank page search button click
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchItem(localSearch);
      setSearchParams({ q: localSearch });
    }
  };

  // Loading the search items on page load
  useEffect(() => {
    setActiveCategory("all");
    if (queryFromUrl) {
      setLocalSearch(queryFromUrl);
    }
    // Only rendering the details if the search doenot matches the url query.
    if(searchTerm !== queryFromUrl){
      setSearchItem(queryFromUrl);
    }

  }, [queryFromUrl]);


  // Handling the pagination functionality
  // Calling the usePagination hook and passing the filteredProducts and page number. In the actual products render map , replacing to currentItems as well. 
  const { currentItems, currentPage, setCurrentPage, totalPages } = usePagination(filteredProducts, 16); // 16 items per page 

  return (
    // Setting the key re-renders the page after every search fetching
    <div className="min-h-screen " >  
      <NavigationBar />

      <main className="flex-grow flex flex-col bg-background">
        {/*  This stays regardless of filter results */}
        {searchTerm !== "" && (
          <div className="w-full px-4 md:px-20 pt-40 pb-10">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h1 className="text-h3 text-main uppercase text-center">
                search
              </h1>
              <p className="text-muted text-base">
                <span className="uppercase font-bold">
                  {filteredProducts.length}
                </span>{" "}
                results from{" "}
                <span className="uppercase font-bold">"{queryFromUrl}"</span>
              </p>
            </div>

            <div className="mx-auto flex pt-12 md:px-24">
              <ItemFilters />
            </div>
          </div>
        )}

        <div className="flex-grow">
          {searchTerm === "" ? (
            <div className=" max-w-sm mx-auto pt-60 pb-40 px-4 text-center">
             <h1 className="text-paragraph text-center text-main font-bold uppercase tracking-widest">
                No items match your filters.
              </h1>
                <p className="text-muted text-sm mt-2">
                  Try searching for exising category items.
                </p>
              <Input
                type="text"
                autoFocus
                className="mt-12 h-auto border-0 border-b border-muted/30 bg-transparent px-0 pb-4 pt-0 text-2xl md:text-2xl uppercase tracking-tighter shadow-none rounded-none placeholder:text-muted/40 focus-visible:ring-0 focus-visible:border-main transition-colors duration-300"
                placeholder="Search here..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto pb-40 px-4"
            >
              <motion.div
                variants={itemVariants}
                className={`max-w-6xl mx-auto border-r border-l border-main border-1 grid grid-cols-2 lg:grid-cols-${filters.gridCols} gap-y-10 gap-x-10`}
              >
                {currentItems.map((allProd) => (
                  <ProductCard
                    key={allProd.id}
                    {...allProd}
                    isSearchContent={false}
                  />
                ))}
              </motion.div>
                <ProductPagination 
  totalPages={totalPages} 
  currentPage={currentPage} 
  onPageChange={setCurrentPage} 
/>

            </motion.div>
          ) : (
            <div className="max-w-7xl mx-auto py-20 px-4 text-center">
              <div className="py-20 border border-dashed border-muted/20 rounded-lg">
                <h2 className="text-main uppercase font-bold tracking-widest">
                  No items match your filters.
                </h2>
                <p className="text-muted text-sm mt-2">
                  Try adjusting your availability or sorting options.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 text-[11px] uppercase font-bold border-b-2 border-main pb-1 hover:text-muted transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
