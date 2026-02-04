import { useParams, useNavigate , Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { motion } from "motion/react";
// import { PRODUCTS_LIST } from "@/objects/Objects";
import { NavigationBar } from "@/components/reusable/Navigation";
import { Footer } from "@/components/reusable/Footer";
import { ItemFilters } from "@/components/reusable/FilterComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { itemVariants, parentVariants } from "@/objects/Animations";
import ProductCard from "@/components/reusable/CardComponent";
import { Input } from "@/components/ui/input";
import { ProductPagination } from "@/components/reusable/PaginationComponent";
import { usePagination } from "@/hooks/usePagination";

export default function Collections() {
  const { category } = useParams();
  const [categorySearch, setCategorySearch] = useState("");
  const navigate = useNavigate();
  
  const { filteredProducts, filters, resetFilters, setActiveCategory } =useProducts();
  // Updating the url automatically according to the filter
  useEffect(() => {
    if (category) {
      setActiveCategory(category.toLowerCase());
    }
    return () => setActiveCategory("all"); //fallback
  }, [category, setActiveCategory]);

  // Resetting all the initial filters so the user starts fresh
  useEffect(() => {
    resetFilters();
  }, [category]);

  // Handling the enter keystroke of the category search button navigate to the category url
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && categorySearch.trim() !== "") {
      navigate(
        `/collections/${categorySearch.toLowerCase().replace(/\s+/g, "-")}`,
      );
    //   Resetting the url name to empty sting after navigation
      setCategorySearch("");
    }
  };

  // Handling the pagination
  const { currentItems, currentPage, setCurrentPage, totalPages } = usePagination(filteredProducts, 18);   //items per page

  return (
    <div className="min-h-screen" key={category}>
      <NavigationBar />

      
        <div className="relative h-[80vh]  md:h-[650px] w-full overflow-hidden bg-background">
          <motion.div
            initial={{ opacity: 0, y: 10, zoom: 0.5, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, zoom: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0, ease: "linear" }}
            className="absolute inset-0 mt-20"
          >
             {/* <img
              src={PRODUCTS_LIST[14].primaryImage}
              alt="Collection Page"
              className="w-full h-full object-cover"
            /> */}
            <div className="absolute inset-0 bg-black" /> 
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute inset-0 z-10 flex items-center justify-center p-6"
          >
            <h1 className="text-display font-logo text-white  text-center">
              {category}
            </h1>
          </motion.div>

          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute inset-0 z-20 flex items-start justify-start pt-24 px-8"
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="text-white font-bold uppercase text-[12px] tracking-wider">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white font-bold uppercase text-[12px] tracking-wider" />
                <BreadcrumbItem className="text-white font-bold uppercase text-[12px] tracking-wider">
                 <Link to="/collections/shop-all">Shop</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white font-bold uppercase text-[12px] tracking-wider" />
                <BreadcrumbItem className="text-white font-bold uppercase text-[12px] tracking-wider">
                  <BreadcrumbLink>{category}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>
        </div>
        <div className=" mx-auto flex pt-2 border-t bg-background px-24">
          <ItemFilters />
        </div>
      

      {filteredProducts.length > 0 ? (
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          className="w-full pb-40 px-4 py-20 bg-background"
        >
          <motion.div
            variants={itemVariants}
            className={`max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-${filters.gridCols} gap-y-10 gap-x-10 border-l border-r border-main`}
          >
            {currentItems.map((items) => (
              <ProductCard key={items.id} {...items} isSearchContent={false} />
            ))}
            {/* <ProductPagination totalPages={2}/> */}
          </motion.div>
{/* Pagination Component */}
            <ProductPagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage} 
            />
        </motion.div>
      ) : (
        <div className=" max-w-sm mx-auto py-60 px-4 text-center">
          <h1 className="text-paragraph text-main font-bold uppercase tracking-widest">
            No items match your filters.
          </h1>
          <p className="text-muted text-sm mt-2">
            Try searching for exising category items.
          </p>
          <Input
            type="text"
            autoFocus
            className="mt-12 h-auto border-0 border-b border-muted/30 bg-transparent px-0 pb-4 pt-0 text-2xl md:text-2xl uppercase tracking-tighter shadow-none rounded-none placeholder:text-muted/40 focus-visible:ring-0 focus-visible:border-main transition-colors duration-300"
            placeholder="Search for collections..."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            onKeyDown={handleEnter}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
