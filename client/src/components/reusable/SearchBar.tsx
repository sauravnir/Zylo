import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { useProducts } from "@/context/ProductContext";
import { Search, X, Dot } from "lucide-react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./CardComponent";
import { PrimaryButton } from "./ButtonComponent";
import { useSearchParams, useNavigate } from "react-router-dom";

// Search bar dropdown component
export const DownSearch = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);
  const { searchTerm, setSearchItem, searchSuggestions ,setActiveCategory} = useProducts();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //  Sending the search items in the url to maintain state
  const handleSearch = (e: any) => {
    const value = e.target.value;

    setSearchItem(value);
    // Setting the url to q: searchTerm i.e the search input
    setSearchParams({ q: value }, { replace: true });
  };

  // Handle View ALl Products key enter
  const goToSearch = () => {
    if (searchTerm.trim()) {
      // .trim removes extra white spaces
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
// Handling category items clicking

const handleCategoryClick =(category:any) => {
  setSearchItem("");
  setActiveCategory(category.toLowerCase())
  navigate(`/collections/${category.toLowerCase().replace(/\s+/g, '-')}`)
  
} 

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchItem(query);
    }
  }, [searchParams]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <button className="hidden md:block text-muted uppercase text-product-title hover:text-main outline-none">
            {title}
          </button>
          <Search size={24} className="md:hidden lg:hidden text-muted" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={22}
        className="w-screen rounded-none bg-background py-6 mt-1 shadow-2xl "
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="flex flex-row items-center justify-between px-6 md:px-12 "
        >
          <div className="flex items-center gap-4 flex-1">
            <Search className="text-muted shrink-0" size={24} />
            <Input
              type="text"
              autoFocus
              className="shadow-none text-base md:text-product-title uppercase placeholder:text-main/50 border-none bg-background focus-visible:ring-0 focus-visible:ring-offset-0 w-full  h-auto"
              placeholder="Search here"
              value={searchTerm}
              onChange={handleSearch}
              //   Handling enter press functionality if user presses enter
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goToSearch();
                }
              }}
            />
          </div>
          {/* Close Button */}
          <button onClick={() => setOpen(false)} className="ml-8 shrink-0">
            <X
              size={24}
              className="text-muted hover:text-main transition-colors"
            />
          </button>
        </motion.div>

        {/* Search Component */}
        {searchTerm.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-background z-50 shadow-2xl">
            {searchSuggestions.length > 0 ? (
              <div className="md:grid-cols-[0.5fr_2.5fr] min-h-[300px] px-6">
                <div className="p-4">
                  <Tabs
                    defaultValue="products"
                    className=" w-full overflow-y-auto"
                  >
                    <TabsList className="mb-4 bg-transparent gap-4 p-0 h-auto">
                      <TabsTrigger
                        value="products"
                        className="
                          px-6 py-2 bg-transparent text-gray-400 border-none shadow-none transition-all
                          data-[state=active]:text-primary 
                          data-[state=active]:underline 
                          data-[state=active]:underline-offset-8 
                          data-[state=active]:bg-transparent
                          hover:text-primary
                        "
                      >
                        Products
                      </TabsTrigger>

                      <TabsTrigger
                        value="collections"
                        className="
                          px-6 py-2 bg-transparent text-gray-400 border-none shadow-none transition-all
                          data-[state=active]:text-primary 
                          data-[state=active]:underline 
                          data-[state=active]:underline-offset-8 
                          data-[state=active]:bg-transparent
                          hover:text-primary
                        "
                      >
                        Categories
                      </TabsTrigger>
                    </TabsList>

                    {/* Product tabs */}
                    <TabsContent value="products" className="mt-2">
                      <div className="flex flex-col h-[250px] md:h-[380px] overflow-x-hidden md:grid md:grid-cols-6 lg:grid-cols-6 gap-6 mt-4 ">
                        {/* Only displaying a maximum of 5 cards in the search bar */}
                        {searchSuggestions.slice(0, 6).map((product) => (
                          // Re-using the Product card component to display the products
                          // using the conditional isSearchContent to conditionally remove the render of add to cart popup button at the bottom-right
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: 0.1,
                              ease: "easeIn",
                            }}
                            className="w-full border-b border-gray-50 pb-4 md:border-none md:pb-0"
                          >
                            <ProductCard {...product} isSearchContent={true} />
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex justify-center items-center border-t pt-2">
                        {/* View All Results Button */}
                        <div className="md:w-1/3">
                          <PrimaryButton
                            isDisabled={false}
                            onClick={goToSearch}
                            name="View all results"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Collection Tabs */}
                    <TabsContent value="collections">
                      <div className="flex flex-col items-start ">
                        {searchSuggestions
                          // Filtering out the duplicate items and only displaying 
                          .filter(
                            (item, index, self) =>
                              index ===
                              self.findIndex(
                                (t) => t.category === item.category,
                              ),
                          ).map((item) => (
                            <motion.div
                              key={item.id} 
                              initial={{ opacity: 0, y: -5 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: 0.2,
                                ease: "easeIn",
                              }}
                              className="mt-2"
                            >
                             <button
                            onClick={()=>handleCategoryClick(item.category)}
                             >
                                <span className="flex items-center text-main hover:text-muted uppercase text-base hover:underline">
                                  <Dot /> {item.category}
                                </span>
                              
                             </button>
                             
                              
                            </motion.div>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ) : (
              <div className="p-20 text-center flex flex-col items-center justify-center">
                <h1 className="text-base uppercase tracking-widest text-main font-bold">
                  No results found
                </h1>
              </div>
            )}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
