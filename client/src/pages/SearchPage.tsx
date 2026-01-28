import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { NavigationBar } from "@/reusable/Navigation";
import { Footer } from "@/reusable/Footer";
import ProductCard from "@/reusable/CardComponent";
import { Input } from "@/components/ui/input";
import { ItemFilters } from "@/reusable/FilterComponent";
import { motion } from "motion/react";
import { itemVariants, parentVariants } from "@/objects/Animations";

export const SearchPage = () => {
  // Fetching the search result from the url
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  // Getting the searching function from global context
  const { filteredProducts, setSearchItem, searchTerm, filters } =
    useProducts();
  const [localSearch, setLocalSearch] = useState("");
  // Handling the blank page search
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchItem(localSearch);
      setSearchParams({ q: localSearch });
    }
  };

  // Loading the search items on page load
  useEffect(() => {
    if (queryFromUrl) {
      setSearchItem(queryFromUrl);
    }
  }, [queryFromUrl, setSearchItem]);

  return (
    <div className="min-h-screen flex flex-col ">
      <NavigationBar />

      {/* We use flex-grow so this middle section takes up all available space */}
      <main className="flex-grow flex flex-col">
        {filteredProducts.length > 0 ? (
          <div className="w-full px-4 md:px-20 py-40 ">
            <div className="flex flex-col  items-center  justify-center space-y-2 ">
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

            {/* Filters Section */}
            <div className="flex w-full py-4 pt-10">
              <ItemFilters />
            </div>

            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto py-20 px-4"
            >
              <motion.div
                variants={itemVariants}
                className={`grid grid-cols-2 lg:grid-cols-${filters.gridCols} gap-y-10 gap-x-10 `}
              >
                {filteredProducts.map((allProd) => (
                  <ProductCard
                    key={allProd.id}
                    {...allProd}
                    isSearchContent={false}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        ) : (
          //   If there are no items found then rendering this.
          <div className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 py-72">
            <div className="text-center w-full">
              <h1 className="text-paragraph text-main font-bold uppercase tracking-widest">
                No results found.
              </h1>
              <p className="text-muted tracking-wide  text-base mt-4">
                {searchTerm === "" &&  "Search our collection."}
                {searchTerm !== "" && (
                  <p className="text-main mt-2">
                    We couldn't find anything for "{queryFromUrl}"
                  </p>
                )}
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
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
