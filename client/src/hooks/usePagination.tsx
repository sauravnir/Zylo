import { useState, useEffect, useMemo } from "react";


interface UsePaginationResult<T> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentItems: T[];
  totalPages: number;
}

export function usePagination<T>(items: T[], itemsPerPage: number = 8): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 if the item list changes (like a new search or filter)
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
  } as const;
}