import { useProducts } from "@/context/ProductContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3X3, LayoutGrid, Rows4, X } from "lucide-react";

const gridIcons: Record<number, React.ReactNode> = {
  3: <LayoutGrid />,
  4: <Grid3X3/>,
  6: <Rows4 />
};

export const ItemFilters = () => {
  const { filters, setFilters , resetFilters } = useProducts();
  return (
    <div className="w-full flex flex-row items-center justify-center gap-3 md:justify-between border-b border-t border-main pt-2 pb-2">
      {/* 1. Availability Filter */}
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex gap-8">
          {["all", "In Stock", "Sold Out"].map((status) => (
            <button
              key={status}
              onClick={() => setFilters({ ...filters, availability: status })}
              className={`text-tiny uppercase tracking-widest transition-all ${
                filters.availability === status
                  ? "text-main "
                  : "text-muted hover:text-main"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        {/* Sorting Dropdown */}
        <div className="flex flex-col min-w-[100px]">
          <Select
            value={filters.sort}
            onValueChange={(value) => setFilters({ ...filters, sort: value })}
          >
            <SelectTrigger className="h-auto border-0 bg-transparent text-muted px-0 rounded-none shadow-none text-tiny uppercase tracking-widest focus:ring-0 transition-colors">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            <SelectContent className="bg-card border-muted/20 rounded-none shadow-xl">
              <SelectItem
                value="default"
                className="text-tiny uppercase tracking-widest focus:bg-muted/10"
              >
                Featured
              </SelectItem>
              <SelectItem
                value="a-z"
                className="text-tiny uppercase tracking-widest focus:bg-muted/10"
              >
                Alphabetically, A-Z
              </SelectItem>
              <SelectItem
                value="z-a"
                className="text-tiny uppercase tracking-widest focus:bg-muted/10"
              >
                Alphabetically, Z-A
              </SelectItem>
              <SelectItem
                value="price-low"
                className="text-tiny uppercase tracking-widest focus:bg-muted/10"
              >
                Price: Low to High
              </SelectItem>
              <SelectItem
                value="price-high"
                className="text-tiny uppercase tracking-widest focus:bg-muted/10"
              >
                Price: High to Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      
      <div className="flex flex-row items-center gap-10">
        
          {/* Grid Cols Filter */}
        <div className="hidden md:flex flex-col space-y-3 items-end">
          <div className="flex rounded-sm border border-main overflow-hidden">
            {[3,4,6].map((num) => (
              <button
                key={num}
                onClick={() => setFilters({ ...filters, gridCols: num })}
                className={`px-2 py-1 transition-colors border-r border-main ${
                  filters.gridCols === num
                    ? "text-main/70 bg-background "
                    : "bg-transparent text-muted/70 hover:bg-muted/10 border-r"
                } `}
              >
                <div className=" scale-90">{gridIcons[num]}</div>
              </button>
            ))}
          </div>
        </div>
        {/* Reset filters */}
        <div className="flex flex-row">
            <button
            onClick={resetFilters}
            className="hidden md:block text-tiny uppercase text-muted tracking-widest transition-all hover:text-main"
            >
              clear all
            </button>
            <button
            onClick={resetFilters}
            className="md:hidden text-tiny uppercase text-main tracking-widest transition-all"
            >
              <X size={18} strokeWidth={3}/>
            </button>
        </div>
      </div>
    </div>
  );
};
