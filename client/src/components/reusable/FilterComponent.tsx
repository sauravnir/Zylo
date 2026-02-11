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
  4: <Grid3X3 />,
  6: <Rows4 />,
};

export const ItemFilters = () => {
  const { filters, setFilters, resetFilters } = useProducts();
  return (
    <div className="w-full flex flex-row items-center justify-center gap-8 md:gap-3 md:justify-between md:border-b md:border-t border-main pt-2 pb-2">
      {/* 1. Availability Filter */}
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex gap-2 md:gap- 8">
          {["all", "In Stock", "Sold Out"].map((status) => (
            <button
              key={status}
              onClick={() => setFilters({ ...filters, availability: status })}
              className={`text-tiny uppercase pr-2 tracking-widest transition-all ${
                filters.availability === status
                  ? "text-main underline underline-offset-4"
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
            <SelectTrigger className="h-auto border-0 bg-transparent text-main/60 px-0 rounded-none shadow-none text-[10px] uppercase tracking-[0.2em] focus:ring-0 hover:text-main transition-colors gap-2">
              <span className="text-main/70 italic lowercase pr-1">sort:</span>
              <SelectValue placeholder="Featured" />
            </SelectTrigger>

            <SelectContent className="bg-background border-main/10 rounded-none shadow-2xl p-0">
              {["default", "a-z", "z-a", "price-low", "price-high"].map(
                (opt) => (
                  <SelectItem
                    key={opt}
                    value={opt}
                    className="text-[10px] uppercase tracking-widest focus:bg-main/5 py-3 cursor-pointer"
                  >
                    {opt}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-row items-center gap-10">
        {/* Grid Cols Filter */}
        <div className="hidden md:flex items-center gap-4">
          {[3, 4, 6].map((num) => (
            <button
              key={num}
              onClick={() => setFilters({ ...filters, gridCols: num })}
              className={`transition-all duration-300 ${
                filters.gridCols === num
                  ? "text-main scale-110"
                  : "text-main/30 hover:text-main/60"
              }`}
            >
              {gridIcons[num]}
            </button>
          ))}
        </div>
        {/* Reset filters */}
        <div className="flex flex-row">
          <button
            onClick={resetFilters}
            className="group hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
          >
            <span className=" text-main/40 group-hover:text-main transition-colors">
              Clear
            </span>
            <X
              size={16}
              className="text-main/60 group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
          <button
            onClick={resetFilters}
            className="md:hidden text-tiny uppercase text-main/40 tracking-widest transition-all"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};
