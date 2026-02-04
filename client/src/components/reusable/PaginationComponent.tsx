import { Pagination } from "@mui/material";
import {Stack} from "@mui/material"

interface ProductPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({ totalPages, currentPage, onPageChange }: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    onPageChange(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center w-full mt-20 mb-10">
      <Stack spacing={2}>
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handleChange} 
          shape="rounded" // or "circular"
          variant="outlined"
          size="large"
          // Customizing the look to match Zylo's minimal vibe
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '0px', // Square corners like your cards
              fontFamily: 'inherit',
              fontSize: '11px',
              textTransform: 'uppercase',
              borderColor: 'rgba(0,0,0,0.1)',
            },
            '& .Mui-selected': {
              backgroundColor: 'black !important',
              color: 'white',
              borderColor: 'black',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: 'rgba(0,0,0,0.05)',
            }
          }}
        />
      </Stack>
    </div>
  );
}