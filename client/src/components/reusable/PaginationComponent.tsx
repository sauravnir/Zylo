import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function ProductPagination({totalPages}:{totalPages:number}){
    const [currentPage , setCurrentPage] = useState(1);
    return (
        <Pagination>
            <PaginationContent>

            {/* Previous button */}
                <PaginationItem>
                    <PaginationPrevious
                    href="#"
                    onClick={(e)=> {
                        e.preventDefault();
                        if(currentPage > 1) setCurrentPage(currentPage -1);
                    }}
                    
                    />
                </PaginationItem>

                        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          // Simple logic: only show current, one before, and one after
          if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
            return (
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  className="rounded-none border-muted/20"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return null;
        })}

<PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}