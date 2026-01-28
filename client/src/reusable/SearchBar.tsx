import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { useProducts } from "@/context/ProductContext";
import { Search, X } from "lucide-react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./CardComponent";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./ButtonComponent";

// Search bar dropdown component
export const DownSearch = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);
  const { searchTerm, setSearchItem, filteredProducts } = useProducts();
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <button className="hidden md:block text-muted uppercase text-menu hover:text-main outline-none">
            {title}
          </button>
          <Search size={24} className="md:hidden lg:hidden text-muted" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={20}
        className="w-screen rounded-none bg-card py-8 mt-1 "
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="flex flex-row items-center justify-between px-6 md:px-12"
        >
          <div className="flex items-center gap-4 flex-1">
            <Search className="text-muted shrink-0" size={20} />
            <Input
              type="text"
              autoFocus
              className="text-h3 uppercase placeholder:text-muted/50 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full p-0 h-auto"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
          {/* Close Button */}
          <button onClick={() => setOpen(false)} className="ml-8 shrink-0">
            <X
              size={20}
              className="text-muted hover:text-main transition-colors"
            />
          </button>
        </motion.div>

        {/* Search Component */}
        {searchTerm.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-card z-50 shadow-2xl">
            {filteredProducts.length > 0 ? (
              <div className="flex flex-col md:grid-cols-[0.5fr_2.5fr] min-h-[300px] px-6">
                <div className="p-4">
                  <Tabs
                    defaultValue="products"
                    className=" w-full md:max-h-[450px] lg:max-h-[450px] overflow-y-auto"
                  >
                    <TabsList className="mb-4 bg-transparent  gap-4 p-0 h-auto">
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
                        Collections
                      </TabsTrigger>
                    </TabsList>

                    {/* Product tabs */}
                    <TabsContent value="products">
                      <div className="grid grid-cols-5 gap-6 mt-4 ">
                        {/* Only displaying a maximum of 4 cards in the search bar */}
                        {filteredProducts.slice(0, 5).map((product) => (
                          // Re-using the Product card component to display the products
                          // using the conditional isSearchContent to conditionally render the add to cart popup button at the bottom-left
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.3,
                              ease: "easeIn",
                            }}
                          >
                            <ProductCard {...product} isSearchContent={true} />
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex justify-center items-center border-t py-6">
                        {/* View All Results Button */}
                        <div className="md:w-1/3">
                          <PrimaryButton
                            isDisabled={false}
                            onClick={() => {}}
                            name="View all results"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Collection Tabs */}
                    <TabsContent value="collections">
                      <div className="grid grid-cols-4 gap-5 mt-4">
                        {filteredProducts.slice(0, 4).map((item) => (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.3,
                              ease: "easeIn",
                            }}
                          >
                            <Link
                              to="#"
                              className=" border-r border-muted px-2"
                            >
                              <span
                                key={item.id}
                                className="text-main hover:text-muted uppercase text-base  hover:underline"
                              >
                                {item.category}
                              </span>
                            </Link>
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
                  No results could be found.
                </h1>
                <h3 className="text-main text-menu uppercase mt-4">
                  Please search other items.
                </h3>
              </div>
            )}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
